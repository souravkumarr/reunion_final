'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ArrowLeft, Upload, Image as ImageIcon, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function PhotoUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [registrationId, setRegistrationId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const storedId = sessionStorage.getItem('registrationId');
    const paymentId = sessionStorage.getItem('paymentId');
    
    if (!storedId || !paymentId) {
      toast.error('Invalid access. Please complete the registration flow.');
      router.push('/register');
    } else {
      setRegistrationId(storedId);
    }
  }, [router]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
    setPreview('');
  };

  const handleUpload = async () => {
    if (!selectedFile || !registrationId) {
      toast.error('No file selected or registration ID missing');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const fileName = `reunion-photos/${registrationId}-${timestamp}-${selectedFile.name}`;
      const storageRef = ref(storage, fileName);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload file
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update registration document with photo URL
      await updateDoc(doc(db, 'registrations', registrationId), {
        photoUrl: downloadURL,
        photoUploadDate: new Date()
      });

      setUploadProgress(100);
      
      // Store photo URL for success page
      sessionStorage.setItem('photoUrl', downloadURL);
      
      toast.success('Photo uploaded successfully!');
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push('/success');
      }, 1000);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const skipUpload = () => {
    router.push('/success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/payment" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Payment
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              Upload Your Photo
            </CardTitle>
            <p className="text-white/80 text-center">
              Upload a photo to receive a personalized return gift at the reunion
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!selectedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-yellow-400 bg-yellow-400/10' 
                    : 'border-white/30 hover:border-white/50 bg-white/5'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="w-12 h-12 text-white/60" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-white">
                      {isDragActive ? 'Drop your photo here' : 'Drag & drop your photo here'}
                    </p>
                    <p className="text-white/60 mt-2">
                      or click to browse files
                    </p>
                  </div>
                  <div className="text-sm text-white/50">
                    <p>Supported formats: JPG, PNG, GIF</p>
                    <p>Maximum size: 5MB</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative bg-white/5 rounded-lg p-4 border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <ImageIcon className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{selectedFile.name}</p>
                      <p className="text-white/60 text-sm">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {preview && (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                    <p className="text-white font-medium mb-3">Preview:</p>
                    <div className="flex justify-center">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="max-w-full max-h-64 rounded-lg object-contain"
                      />
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/80 text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4">
              {selectedFile && !isUploading && (
                <Button
                  onClick={handleUpload}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              )}
              
              <Button
                onClick={skipUpload}
                variant="outline"
                className={`${selectedFile ? 'flex-1' : 'w-full'} border-white/30 text-white hover:bg-white/10`}
                disabled={isUploading}
              >
                Skip for Now
              </Button>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Why upload a photo?</h3>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Get a personalized return gift with your photo</li>
                <li>• Help us create a memorable photo collage</li>
                <li>• Share memories with your classmates</li>
                <li>• You can always upload later if you skip now</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}