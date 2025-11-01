import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { UtensilsCrossed, Upload, MapPin } from 'lucide-react';
import { FoodPosting } from '../types';

interface FoodPostingPageProps {
  user: { name: string };
  onSubmit: (posting: Omit<FoodPosting, 'id' | 'timestamp'>) => void;
}

export function FoodPostingPage({ user, onSubmit }: FoodPostingPageProps) {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const posting: Omit<FoodPosting, 'id' | 'timestamp'> = {
      collegeId: 'college1',
      collegeName: user.name,
      description: formData.get('description') as string,
      packets: parseInt(formData.get('packets') as string),
      pickupAddress: formData.get('pickupAddress') as string,
      freshnessHours: parseInt(formData.get('freshnessHours') as string),
      imageUrl: imagePreview || 'https://images.unsplash.com/photo-1584968431010-89a8657e7c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBtZWFsfGVufDF8fHx8MTc2MTkwMDEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      location: { lat: 40.7128, lng: -74.0060 },
    };

    onSubmit(posting);
    navigate('/matcher');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-yellow-50 to-white p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#4CAF50] p-3 rounded-full">
              <UtensilsCrossed className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-[#4CAF50] mb-2">Post Available Food</h1>
          <p className="text-gray-600">Share surplus food and make a difference</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Food Details</CardTitle>
            <CardDescription>
              Provide information about the food you'd like to donate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Food Item Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="E.g., Fresh vegetarian meals with rice, dal, vegetables, and chapati"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="packets">Number of Food Packets</Label>
                  <Input
                    id="packets"
                    name="packets"
                    type="number"
                    placeholder="50"
                    min="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freshnessHours">Freshness Duration (hours)</Label>
                  <Input
                    id="freshnessHours"
                    name="freshnessHours"
                    type="number"
                    placeholder="4"
                    min="1"
                    max="24"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupAddress">
                  <MapPin className="inline mr-2" size={16} />
                  Pickup Address
                </Label>
                <Input
                  id="pickupAddress"
                  name="pickupAddress"
                  placeholder="Auto-filled from registration"
                  defaultValue="123 University Blvd, Campus Town"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Upload className="text-gray-400" size={20} />
                </div>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Note:</strong> Once you submit, our AI system will automatically
                  match you with the nearest NGO based on their current needs and proximity.
                </p>
              </div>

              <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                Submit & Find NGOs
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
