'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { ArrowLeft, User, Mail, Phone, Users, Utensils } from 'lucide-react';
import Link from 'next/link';
import { EVENT_INFO } from '@/lib/constants';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
    .required('Phone number is required'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Please select a gender')
    .required('Gender is required'),
  foodPreference: Yup.string()
    .oneOf(['veg', 'non-veg'], 'Please select food preference')
    .required('Food preference is required')
});

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    try {
      const registrationData = {
        ...values,
        paymentStatus: 'pending',
        registrationDate: new Date(),
        amount: EVENT_INFO.amount
      };

      const docRef = await addDoc(collection(db, 'registrations'), registrationData);
      
      // Store registration ID in sessionStorage for payment flow
      sessionStorage.setItem('registrationId', docRef.id);
      sessionStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      toast.success('Registration data saved! Redirecting to payment...');
      router.push('/payment');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              Registration Form
            </CardTitle>
            <p className="text-white/80 text-center">
              Fill in your details to register for the reunion
            </p>
          </CardHeader>
          
          <CardContent>
            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                gender: '',
                foodPreference: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-400 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-400 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Field
                      as={Input}
                      id="phone"
                      name="phone"
                      placeholder="Enter 10-digit phone number"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-400 text-sm" />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Gender
                    </Label>
                    <RadioGroup
                      value={values.gender}
                      onValueChange={(value) => setFieldValue('gender', value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="text-white">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="text-white">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="text-white">Other</Label>
                      </div>
                    </RadioGroup>
                    <ErrorMessage name="gender" component="div" className="text-red-400 text-sm" />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white flex items-center gap-2">
                      <Utensils className="w-4 h-4" />
                      Food Preference
                    </Label>
                    <RadioGroup
                      value={values.foodPreference}
                      onValueChange={(value) => setFieldValue('foodPreference', value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="veg" id="veg" />
                        <Label htmlFor="veg" className="text-white">Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-veg" id="non-veg" />
                        <Label htmlFor="non-veg" className="text-white">Non-Vegetarian</Label>
                      </div>
                    </RadioGroup>
                    <ErrorMessage name="foodPreference" component="div" className="text-red-400 text-sm" />
                  </div>

                  <div className="flex justify-center">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'demo-key'}
                      onChange={setRecaptchaValue}
                      theme="dark"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !recaptchaValue}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3"
                  >
                    {isSubmitting ? 'Processing...' : `Proceed to Payment (₹${EVENT_INFO.amount})`}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}