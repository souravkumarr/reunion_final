'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Drumstick } from 'lucide-react';
import { FOOD_MENU } from '@/lib/constants';
import { Button } from './button';

export function FoodCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % FOOD_MENU.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + FOOD_MENU.length) % FOOD_MENU.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {FOOD_MENU.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <div className="relative h-64 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="flex items-center justify-center mb-2">
                      {item.type === 'veg' ? (
                        <Leaf className="w-5 h-5 text-green-400 mr-2" />
                      ) : (
                        <Drumstick className="w-5 h-5 text-red-400 mr-2" />
                      )}
                      <span className="text-sm uppercase tracking-wider">
                        {item.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      
      <div className="flex justify-center mt-4 gap-2">
        {FOOD_MENU.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}