export interface RegistrationData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  foodPreference: 'veg' | 'non-veg';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  photoUrl?: string;
  registrationDate: Date;
  amount: number;
}

export interface EventInfo {
  date: string;
  time: string;
  venue: string;
  amount: number;
  whatsappLink: string;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  type: 'veg' | 'non-veg';
  description: string;
}