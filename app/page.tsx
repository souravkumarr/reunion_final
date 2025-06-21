'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, DollarSign, Users, Music, Utensils, Gamepad2, PartyPopper, Clock, MessageCircle, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Heart, Share2, X, Download, Coffee } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BlessingShower from './components/BlessingShower';

interface FoodItems {
  lunch: {
    nonVeg: string[];
    veg: string[];
    common: string[];
  };
  snacks: string[];
  beverages: string[];
}

const foodItems: FoodItems = {
  lunch: {
    nonVeg: [
      'Chicken Masala'
    ],
    veg: [
      'Paneer Butter Masala'
    ],
    common: [
      'Veg Biriyani',
      'Raita',
      'Papad',
      'Gobi Chilli'
    ]
  },
  snacks: [
    'Spring Roll'
  ],
  beverages: [
    'Ice Cream',
    'Cold Drinks'
  ]
};

const activities = [
  { icon: Music, title: 'Individual/Group Performance', desc: 'Stand-up comedy, singing, dance' },
  { icon: Utensils, title: 'Fooding', desc: 'Delicious meals and snacks' },
  { icon: Gamepad2, title: 'Fun Games', desc: 'Interactive games and activities' },
  { icon: PartyPopper, title: 'DJ Party', desc: 'Groove to the beats and dance the day away with our professional DJ' }
];

// Memory Lane Photos - updated with new descriptions for the provided images
const memoryPhotos = [
  { id: 1, src: '/memories/1.jpeg', title: '10th Class Last Day', description: 'A memorable photo from our last day of 10th class.', category: 'Farewell' },
  { id: 2, src: '/memories/2.jpeg', title: 'Senior Section Entrance', description: 'The entrance to the senior section building.', category: 'Academic' },
  { id: 3, src: '/memories/3.jpeg', title: 'Ghibli Art Style Group Photo', description: 'A unique, artistic rendering of our group in Ghibli style.', category: 'Group' },
  { id: 4, src: '/memories/4.jpeg', title: 'Our First Meeting Place', description: 'The place where our journey together began.', category: 'Events' },
  { id: 5, src: '/memories/5.jpeg', title: 'Reunion Invitation', description: 'The official invitation for our grand reunion.', category: 'Reunion' },
  { id: 6, src: '/memories/6.jpeg', title: 'Combined Chemistry Class', description: 'A snapshot from one of our combined chemistry classes.', category: 'Academic' },
  { id: 7, src: '/memories/7.jpeg', title: 'COBRA Unit Trip', description: 'An adventurous trip to the 202 COBRA unit.', category: 'Trips' },
  { id: 8, src: '/memories/8.jpeg', title: 'Teachers\' Day Celebration', description: 'Celebrating and honoring our teachers.', category: 'Events' },
  { id: 9, src: '/memories/9.jpeg', title: '12th Class Group Pic', description: 'Our entire 12th class batch together for a group photo.', category: 'Graduation' },
  { id: 10, src: '/memories/10.jpeg', title: '10th Class Boys', description: 'The boys of 10th class, a classic click.', category: 'Group' },
];

export default function Home() {
  const [currentFood, setCurrentFood] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const [showBlessings, setShowBlessings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Checking connection...');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [foodPreference, setFoodPreference] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    // Debug: Log environment variables
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const timer = setInterval(() => {
      setCurrentFood((prev) => (prev + 1) % foodItems.lunch.common.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % memoryPhotos.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('connection_test')
          .select('count')
          .limit(1);

        if (error) throw error;
        setConnectionStatus('Connected to database');
        console.log('Supabase connection test successful:', data);
      } catch (error) {
        console.error('Error:', error);
        setConnectionStatus('Database connection failed');
      }
    };

    checkConnection();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % memoryPhotos.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + memoryPhotos.length) % memoryPhotos.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleLike = (id: number) => {
    setLikedPhotos(prev => 
      prev.includes(id) ? prev.filter(photoId => photoId !== id) : [...prev, id]
    );
  };

  const handleShare = (photo: typeof memoryPhotos[0]) => {
    if (navigator.share) {
      navigator.share({
        title: photo.title,
        text: photo.description,
        url: window.location.href
      });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    console.log('Form state updated:', {
      fullName,
      email,
      phone,
      gender,
      foodPreference
    });
  }, [fullName, email, phone, gender, foodPreference]);

  useEffect(() => {
    console.log('Registration form visibility:', showRegistrationForm);
  }, [showRegistrationForm]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    console.log('=== REGISTRATION START ===');
    console.log('Time:', timestamp);
    console.log('Form Values:', {
      fullName,
      email,
      phone,
      gender,
      foodPreference
    });

    // Validate form data
    if (!fullName || !email || !phone || !gender || !foodPreference) {
      console.log('❌ Form validation failed - missing required fields');
      setRegistrationStatus('Please fill in all required fields');
      return;
    }

    try {
      // Split full name into first and last name
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Prepare registration data
      const registrationData = {
        first_name: firstName,
        last_name: lastName,
        email: email.trim(),
        phone: phone.trim(),
        gender: gender,
        food_preference: foodPreference,
        payment_status: 'pending',
        photo_uploaded: false,
        created_at: timestamp
      };

      console.log('📤 Sending to Supabase:', registrationData);

      // Insert registration data
      const { data, error } = await supabase
        .from('registrations')
        .insert([registrationData])
        .select();

      if (error) {
        console.error('❌ Supabase Error:', error);
        console.error('Error Details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        setRegistrationStatus(`Registration failed: ${error.message}`);
        return;
      }

      console.log('✅ Registration successful:', data);
      
      // Store registration data for payment page
      const paymentData = {
        name: fullName,
        email: email,
        phone: phone,
        foodPreference: foodPreference,
        registrationId: data[0].id
      };
      localStorage.setItem('registrationData', JSON.stringify(paymentData));

      // Reset form
      setShowRegistrationForm(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setGender('');
      setFoodPreference('');

      // Show success message
      setRegistrationStatus('Registration successful! Redirecting to payment...');
      
      // Redirect to payment page
      window.location.href = '/payment';

    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setRegistrationStatus(`Registration failed: ${(err as Error).message}`);
    }
    console.log('=== REGISTRATION END ===');
  };

  const testFormState = () => {
    console.log('Current form state:', {
      fullName,
      email,
      phone,
      gender,
      foodPreference,
      showRegistrationForm
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Connection Status Banner */}
      <div className="fixed top-0 left-0 right-0 bg-blue-100 p-2 text-center z-50">
        {connectionStatus}
      </div>

      <BlessingShower isActive={showBlessings} />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="cursor-pointer relative group"
            onMouseEnter={() => setShowBlessings(true)}
            onMouseLeave={() => setShowBlessings(false)}
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-1">
              Batch of 2022
            </h1>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </div>
          <div className="flex gap-4">
            <Link href="https://forms.gle/Ztqu8p3scw76GjRj6" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Register Now
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative pt-20 pb-16 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="/reunion-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 backdrop-blur-sm">
              🎓 10th Batch Reunion
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              Batch of 2022
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Reconnect with old friends, create new memories, and celebrate our journey together
            </p>
            <Link href="https://forms.gle/Ztqu8p3scw76GjRj6" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 shadow-2xl"
              >
                Join the Reunion
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Memory Lane Slideshow */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Memory Lane
            </h2>
            <p className="text-center text-gray-300 mb-12 text-lg">
              Reliving the golden moments of our school days
            </p>

            {/* Main Slideshow */}
            <div className="relative max-w-6xl mx-auto">
              <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 cursor-pointer"
                    onClick={toggleFullscreen}
                  >
                    <img
                      src={memoryPhotos[currentSlide].src}
                      alt={memoryPhotos[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
                    {/* Photo Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {memoryPhotos[currentSlide].title}
                        </h3>
                        <p className="text-gray-200 text-lg mb-4">
                          {memoryPhotos[currentSlide].description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20 z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20 z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {currentSlide + 1} / {memoryPhotos.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center mt-8 gap-2 overflow-x-auto pb-4">
                {memoryPhotos.map((photo, index) => (
                  <motion.button
                    key={photo.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentSlide 
                        ? 'border-purple-400 scale-110' 
                        : 'border-transparent hover:border-gray-400'
                    }`}
                    whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>

              {/* Auto-play Control */}
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoPlaying(!isAutoPlaying);
                  }}
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20"
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen View */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={toggleFullscreen}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={memoryPhotos[currentSlide].src}
                alt={memoryPhotos[currentSlide].title}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    const link = document.createElement('a');
                    link.href = memoryPhotos[currentSlide].src;
                    link.download = `memory-${memoryPhotos[currentSlide].id}.jpeg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
                >
                  <Download className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen();
                  }}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Info Card */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Event Details
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Date & Time</h3>
                        <p className="text-gray-600">June 29, 2025 | 10 AM - 8 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Venue</h3>
                        <p className="text-gray-600">Y ZONE, Kalyan Pandam</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Registration Fee</h3>
                        <p className="text-gray-600">₹600 per person</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Dress Code</h3>
                        <p className="text-gray-600">Boys: Formals | Girls: No dress code</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Stay Connected</h3>
                        <p className="text-gray-600">WhatsApp group for updates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What's Planned
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                        <activity.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                      <p className="text-gray-600 text-sm">{activity.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Food Menu */}
      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Food Menu</h2>
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Lunch Section */}
              <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Utensils className="w-6 h-6 mr-2 text-orange-500" />
                  Lunch
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Common Section */}
                  <div>
                    <h4 className="text-lg font-medium text-orange-600 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                      Common Items
                    </h4>
                    <div className="divide-y divide-gray-200 bg-white/50 rounded-lg">
                      {foodItems.lunch.common.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 hover:bg-white/50 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                              {item}
                            </h4>
                            <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Non-veg Section */}
                  <div>
                    <h4 className="text-lg font-medium text-red-600 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      Non-vegetarian
                    </h4>
                    <div className="divide-y divide-gray-200 bg-white/50 rounded-lg">
                      {foodItems.lunch.nonVeg.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 hover:bg-white/50 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                              {item}
                            </h4>
                            <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Veg Section */}
                  <div>
                    <h4 className="text-lg font-medium text-green-600 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Vegetarian
                    </h4>
                    <div className="divide-y divide-gray-200 bg-white/50 rounded-lg">
                      {foodItems.lunch.veg.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 hover:bg-white/50 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                              {item}
                            </h4>
                            <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Snacks Section */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PartyPopper className="w-6 h-6 mr-2 text-purple-500" />
                  Snacks for Evening
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {foodItems.snacks.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 hover:bg-white/50 transition-colors group bg-white/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                          {item}
                        </h4>
                        <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Beverages Section */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Coffee className="w-6 h-6 mr-2 text-blue-500" />
                  Beverages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {foodItems.beverages.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 hover:bg-white/50 transition-colors group bg-white/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item}
                        </h4>
                        <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Join Us for a Day of Celebration!</h2>
            <p className="text-xl mb-8">
              Let's make memories together in the daylight
            </p>
            <Link
              href="https://forms.gle/Ztqu8p3scw76GjRj6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Register Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© Batch of 2022 Reunion. All rights reserved.</p>
          <p className="text-gray-400">For any queries, contact the organizing committee</p>
        </div>
      </footer>
    </main>
  );
}