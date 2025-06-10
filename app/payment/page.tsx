'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { EVENT_INFO } from '@/lib/constants';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [registrationId, setRegistrationId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Get registration data from sessionStorage
    const storedData = sessionStorage.getItem('registrationData');
    const storedId = sessionStorage.getItem('registrationId');
    
    if (storedData && storedId) {
      setRegistrationData(JSON.parse(storedData));
      setRegistrationId(storedId);
    } else {
      toast.error('Registration data not found. Please register again.');
      router.push('/register');
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [router]);

  const handlePayment = async () => {
    if (!registrationData || !registrationId) {
      toast.error('Registration data not found');
      return;
    }

    setIsLoading(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'demo_key',
      amount: EVENT_INFO.amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Class of 2022 Reunion',
      description: '10th Batch Reunion Registration',
      image: '/favicon.ico', // Add your logo here
      handler: async function (response: any) {
        try {
          // Update payment status in Firestore
          await updateDoc(doc(db, 'registrations', registrationId), {
            paymentStatus: 'completed',
            paymentId: response.razorpay_payment_id,
            paymentDate: new Date()
          });

          // Store payment info for next step
          sessionStorage.setItem('paymentId', response.razorpay_payment_id);
          
          toast.success('Payment successful! Redirecting to photo upload...');
          router.push('/photo-upload');
        } catch (error) {
          console.error('Payment update error:', error);
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: registrationData.name,
        email: registrationData.email,
        contact: registrationData.phone
      },
      notes: {
        registration_id: registrationId,
        batch: '2022',
        event: 'reunion'
      },
      theme: {
        color: '#F97316'
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
          toast.info('Payment cancelled');
        }
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      toast.error('Payment gateway error. Please try again.');
      setIsLoading(false);
    }
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/register" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              Payment Details
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Registration Summary */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">Registration Summary</h3>
              <div className="space-y-2 text-white/80">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="text-white font-medium">{registrationData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-white font-medium">{registrationData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="text-white font-medium">{registrationData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Food Preference:</span>
                  <span className="text-white font-medium capitalize">{registrationData.foodPreference}</span>
                </div>
              </div>
            </div>

            {/* Payment Amount */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-6 border border-yellow-500/30">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Total Amount</h3>
                <div className="text-4xl font-bold text-yellow-400 mb-2">₹{EVENT_INFO.amount}</div>
                <p className="text-white/80">Includes dinner & return gift</p>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Secure Payment</h3>
              </div>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  SSL encrypted secure payment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Powered by Razorpay
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Multiple payment options available
                </li>
              </ul>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 text-lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {isLoading ? 'Processing...' : `Pay ₹${EVENT_INFO.amount} Now`}
            </Button>

            <p className="text-white/60 text-sm text-center">
              By proceeding, you agree to our terms and conditions. 
              Your payment is secure and protected.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}