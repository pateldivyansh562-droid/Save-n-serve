import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Building2, Heart, Leaf } from 'lucide-react';

interface RegistrationPageProps {
  onRegister: (user: { type: 'college' | 'ngo'; name: string; email: string }) => void;
}

export function RegistrationPage({ onRegister }: RegistrationPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'college' | 'ngo'>('college');

  const handleCollegeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onRegister({
      type: 'college',
      name: formData.get('collegeName') as string,
      email: formData.get('email') as string,
    });
    navigate('/post-food');
  };

  const handleNGOSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onRegister({
      type: 'ngo',
      name: formData.get('ngoName') as string,
      email: formData.get('email') as string,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#4CAF50] p-4 rounded-full">
              <Leaf className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-[#4CAF50] mb-2">Welcome to FoodLink</h1>
          <p className="text-gray-600">Join us in turning food waste into hope</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration</CardTitle>
            <CardDescription>
              Create an account to start connecting and making a difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'college' | 'ngo')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="college" className="flex items-center gap-2">
                  <Building2 size={18} />
                  College
                </TabsTrigger>
                <TabsTrigger value="ngo" className="flex items-center gap-2">
                  <Heart size={18} />
                  NGO
                </TabsTrigger>
              </TabsList>

              <TabsContent value="college" className="mt-6">
                <form onSubmit={handleCollegeSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="collegeName">College Name</Label>
                      <Input
                        id="collegeName"
                        name="collegeName"
                        placeholder="Green Valley University"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@college.edu"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 University Blvd, Campus Town"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Auto-detect)</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="40.7128, -74.0060"
                        defaultValue="40.7128, -74.0060"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kitchenCapacity">Kitchen Capacity (meals/day)</Label>
                      <Input
                        id="kitchenCapacity"
                        name="kitchenCapacity"
                        type="number"
                        placeholder="500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                    Register College
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="ngo" className="mt-6">
                <form onSubmit={handleNGOSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ngoName">NGO Name</Label>
                      <Input
                        id="ngoName"
                        name="ngoName"
                        placeholder="Hope Kitchen"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ngoEmail">Email</Label>
                      <Input
                        id="ngoEmail"
                        name="email"
                        type="email"
                        placeholder="contact@ngo.org"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ngoAddress">Address</Label>
                    <Input
                      id="ngoAddress"
                      name="address"
                      placeholder="789 Care Street, Campus Town"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentsCount">Number of Students</Label>
                      <Input
                        id="studentsCount"
                        name="studentsCount"
                        type="number"
                        placeholder="180"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staffCount">Number of Staff</Label>
                      <Input
                        id="staffCount"
                        name="staffCount"
                        type="number"
                        placeholder="20"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentStock">Current Food Stock (meals)</Label>
                      <Input
                        id="currentStock"
                        name="currentStock"
                        type="number"
                        placeholder="50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Number</Label>
                      <Input
                        id="contactInfo"
                        name="contactInfo"
                        placeholder="+1-234-567-8901"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ngoPassword">Password</Label>
                    <Input
                      id="ngoPassword"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                    Register NGO
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[#4CAF50] hover:underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
