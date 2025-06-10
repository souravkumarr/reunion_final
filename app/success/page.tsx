'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, Share2, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EVENT_INFO } from '@/lib/constants';

export default function SuccessPage() {
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [paymentId, setPaymentId] = useState<string>('');

  useEffect(() => {
    const storedData = sessionStorage.getItem('registrationData');
    const storedPaymentId = sessionStorage.getItem('paymentId');
    
    if (storedData && storedPaymentId) {
      setRegistrationData(JSON.parse(storedData));
      setPaymentId(storedPaymentId);
    }
  }, []);

  const shareText = `🎓 I'm attending the Class of 2022 Reunion! Join us on ${EVENT_INFO.date} at ${EVENT_INFO.venue}. Don't miss out on this amazing reunion! #ClassOf2022Reunion #Memories`;

  const handleShare = (platform: string) => {
    const url = window.location.origin;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we'll copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + url);
        alert('Text copied to clipboard! You can now paste it on Instagram.');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
    }
  };

  const generateTicket = () => {
    // Simple ticket generation - in a real app, you'd generate a proper PDF
    const ticketData = {
      name: registrationData?.name || 'N/A',
      event: 'Class of 2022 Reunion',
      date: EVENT_INFO.date,
      time: EVENT_INFO.time,
      venue: EVENT_INFO.venue,
      paymentId: paymentId,
      amount: EVENT_INFO.amount
    };

    const ticketText = `
🎓 CLASS OF 2022 REUNION TICKET 🎓

Name: ${ticketData.name}
Event: ${ticketData.event}
Date: ${ticketData.date}
Time: ${ticketData.time}
Venue: ${ticketData.venue}
Payment ID: ${ticketData.paymentId}
Amount Paid: ₹${ticketData.amount}

This is your entry pass to the reunion.
Please save this ticket and show it at the venue.

See you there! 🎉
    `;

    const blob = new Blob([ticketText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reunion-ticket-${ticketData.name.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              Registration Successful!
            </CardTitle>
            <p className="text-white/80 text-lg">
              Welcome to the Class of 2022 Reunion
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {registrationData && (
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Your Details</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-white/70">Name:</span>
                    <span className="text-white font-medium">{registrationData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Email:</span>
                    <span className="text-white font-medium">{registrationData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Phone:</span>
                    <span className="text-white font-medium">{registrationData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Food Preference:</span>
                    <span className="text-white font-medium capitalize">{registrationData.foodPreference}</span>
                  </div>
                  {paymentId && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Payment ID:</span>
                      <span className="text-white font-medium text-sm">{paymentId}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-6 border border-yellow-500/30">
              <h3 className="text-xl font-semibold text-white mb-2">Event Details</h3>
              <div className="space-y-2 text-white/80">
                <p><strong>Date:</strong> {EVENT_INFO.date}</p>
                <p><strong>Time:</strong> {EVENT_INFO.time}</p>
                <p><strong>Venue:</strong> {EVENT_INFO.venue}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={generateTicket}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Ticket
              </Button>

              <div className="space-y-3">
                <h3 className="text-white font-semibold flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share with Friends
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    onClick={() => handleShare('whatsapp')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  
                  <Button
                    onClick={() => handleShare('instagram')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                  
                  <Button
                    onClick={() => handleShare('facebook')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-2">Join Our WhatsApp Group</h3>
                <p className="text-white/80 text-sm mb-3">
                  Stay updated with the latest announcements and connect with your classmates
                </p>
                <Link href={EVENT_INFO.whatsappLink} target="_blank">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join WhatsApp Group
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <Link href="/">
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}