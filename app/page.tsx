'use client';

import Link from 'next/link';
import { Calendar, MapPin, Clock, Users, Utensils, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Countdown } from '@/components/ui/countdown';
import { FoodCarousel } from '@/components/ui/food-carousel';
import { EVENT_INFO, EVENT_TIMELINE } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="inline-block p-2 bg-white/10 rounded-full backdrop-blur-sm mb-4">
              <Users className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              🎓 Class of 2022
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6">
              10th Batch Reunion
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Relive the memories, reconnect with friends, and create new moments to cherish forever
            </p>
          </div>
          
          <Countdown targetDate={`${EVENT_INFO.date} ${EVENT_INFO.time.split(' - ')[0]}`} />
          
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3 text-lg">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Information */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Event Details</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{EVENT_INFO.date}</p>
                <p className="opacity-80">{EVENT_INFO.time}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  Venue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{EVENT_INFO.venue}</p>
                <p className="opacity-80">Kalyan, Maharashtra</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-yellow-400" />
                  Registration Fee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-400">₹{EVENT_INFO.amount}</p>
                <p className="opacity-80">Includes dinner & return gift</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Event Timeline</h2>
          
          <div className="space-y-6">
            {EVENT_TIMELINE.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1 border border-white/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{item.event}</h3>
                    <span className="text-yellow-400 font-medium">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Menu */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12 flex items-center justify-center gap-2">
            <Utensils className="w-8 h-8 text-yellow-400" />
            Food Menu
          </h2>
          
          <FoodCarousel />
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Dress Code</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-xl">👔 Boys</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Formal Attire</p>
                <p className="opacity-80 mt-2">Shirt, trousers, and formal shoes</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-xl">👗 Girls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">No Dress Code</p>
                <p className="opacity-80 mt-2">Wear whatever makes you comfortable!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Us?</h2>
          <p className="text-lg text-white/80 mb-8">
            Don't miss this opportunity to reconnect with your classmates and create new memories!
          </p>
          
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-12 py-4 text-xl">
              Register Now - ₹{EVENT_INFO.amount}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/20">
        <div className="max-w-4xl mx-auto text-center text-white/60">
          <p>&copy; 2024 Class of 2022 Reunion. Made with ❤️ for our amazing batch!</p>
        </div>
      </footer>
    </div>
  );
}