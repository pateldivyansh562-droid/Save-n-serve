import { College, NGO } from '../types';

export const mockColleges: College[] = [
  {
    id: 'college1',
    name: 'Green Valley University',
    address: '123 University Blvd, Campus Town',
    location: { lat: 40.7128, lng: -74.0060 },
    email: 'admin@greenvalley.edu',
    kitchenCapacity: 500,
  },
  {
    id: 'college2',
    name: 'Metro Technical College',
    address: '456 College Ave, Metro City',
    location: { lat: 40.7580, lng: -73.9855 },
    email: 'contact@metrotech.edu',
    kitchenCapacity: 300,
  },
];

export const mockNGOs: NGO[] = [
  {
    id: 'ngo1',
    name: 'Hope Kitchen',
    address: '789 Care Street, Campus Town',
    location: { lat: 40.7158, lng: -74.0020 },
    totalCapacity: 200,
    currentFoodStock: 50,
    contactInfo: '+1-234-567-8901',
    studentsCount: 180,
    staffCount: 20,
  },
  {
    id: 'ngo2',
    name: 'Meal Bridge Foundation',
    address: '321 Help Road, Campus Town',
    location: { lat: 40.7098, lng: -74.0100 },
    totalCapacity: 150,
    currentFoodStock: 80,
    contactInfo: '+1-234-567-8902',
    studentsCount: 120,
    staffCount: 15,
  },
  {
    id: 'ngo3',
    name: 'Community Food Network',
    address: '555 Charity Lane, Campus Town',
    location: { lat: 40.7200, lng: -74.0030 },
    totalCapacity: 300,
    currentFoodStock: 100,
    contactInfo: '+1-234-567-8903',
    studentsCount: 250,
    staffCount: 30,
  },
  {
    id: 'ngo4',
    name: 'Serving Hearts NGO',
    address: '888 Kindness Ave, Metro City',
    location: { lat: 40.7600, lng: -73.9800 },
    totalCapacity: 100,
    currentFoodStock: 20,
    contactInfo: '+1-234-567-8904',
    studentsCount: 80,
    staffCount: 10,
  },
];

export const mockDonationHistory = [
  { date: 'Mon', college: 30, ngo: 28 },
  { date: 'Tue', college: 45, ngo: 42 },
  { date: 'Wed', college: 25, ngo: 25 },
  { date: 'Thu', college: 60, ngo: 58 },
  { date: 'Fri', college: 50, ngo: 48 },
  { date: 'Sat', college: 35, ngo: 33 },
  { date: 'Sun', college: 40, ngo: 38 },
];

export const mockMessages = [
  {
    id: '1',
    from: 'Hope Kitchen',
    message: 'We need 30 packets today for 25 students. Can you help?',
    timestamp: '10:30 AM',
    type: 'ngo' as const,
  },
  {
    id: '2',
    from: 'Green Valley University',
    message: 'Yes, we have 35 packets available. Will send them by 12 PM.',
    timestamp: '10:45 AM',
    type: 'college' as const,
  },
  {
    id: '3',
    from: 'Meal Bridge Foundation',
    message: 'Thank you for yesterday\'s donation! It helped 40 students.',
    timestamp: '9:15 AM',
    type: 'ngo' as const,
  },
];

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
