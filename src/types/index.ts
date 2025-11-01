export interface College {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  email: string;
  kitchenCapacity: number;
}

export interface NGO {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  totalCapacity: number;
  currentFoodStock: number;
  contactInfo: string;
  studentsCount: number;
  staffCount: number;
}

export interface FoodPosting {
  id: string;
  collegeId: string;
  collegeName: string;
  description: string;
  packets: number;
  pickupAddress: string;
  freshnessHours: number;
  imageUrl?: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Match {
  ngo: NGO;
  distance: number;
  needScore: number;
}

export interface User {
  id: string;
  type: 'college' | 'ngo';
  name: string;
  email: string;
}
