export const EVENT_INFO = {
  date: 'June 29, 2025',
  time: '5:00 PM - 10:00 PM',
  venue: 'Y ZONE, Kalyan Pandam',
  amount: 1500,
  whatsappLink: 'https://chat.whatsapp.com/YOUR_GROUP_LINK_HERE'
};

export const FOOD_MENU = [
  {
    id: '1',
    name: 'Paneer Butter Masala',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    type: 'veg' as const,
    description: 'Rich and creamy paneer curry'
  },
  {
    id: '2',
    name: 'Chicken Biryani',
    image: 'https://images.pexels.com/photos/2474663/pexels-photo-2474663.jpeg',
    type: 'non-veg' as const,
    description: 'Aromatic basmati rice with tender chicken'
  },
  {
    id: '3',
    name: 'Dal Makhani',
    image: 'https://images.pexels.com/photos/2474664/pexels-photo-2474664.jpeg',
    type: 'veg' as const,
    description: 'Slow-cooked black lentils in rich gravy'
  },
  {
    id: '4',
    name: 'Mutton Curry',
    image: 'https://images.pexels.com/photos/2474665/pexels-photo-2474665.jpeg',
    type: 'non-veg' as const,
    description: 'Spicy and tender mutton curry'
  },
  {
    id: '5',
    name: 'Rajma Rice',
    image: 'https://images.pexels.com/photos/2474666/pexels-photo-2474666.jpeg',
    type: 'veg' as const,
    description: 'Red kidney beans with steamed rice'
  },
  {
    id: '6',
    name: 'Fish Fry',
    image: 'https://images.pexels.com/photos/2474667/pexels-photo-2474667.jpeg',
    type: 'non-veg' as const,
    description: 'Crispy fried fish with spices'
  }
];

export const EVENT_TIMELINE = [
  { time: '5:00 PM', event: 'Welcome & Registration' },
  { time: '5:30 PM', event: 'Photo Session & Networking' },
  { time: '6:30 PM', event: 'Memory Lane Presentation' },
  { time: '7:30 PM', event: 'Dinner Service' },
  { time: '8:30 PM', event: 'Games & Entertainment' },
  { time: '9:30 PM', event: 'Prize Distribution & Farewell' }
];