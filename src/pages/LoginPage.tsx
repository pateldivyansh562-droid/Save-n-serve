import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Building2, Heart, Leaf } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: { type: 'college' | 'ngo'; name: string; email: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'college' | 'ngo'>('college');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>, type: 'college' | 'ngo') => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    // Mock login - use email prefix as name
    const name = email.split('@')[0];
    
    onLogin({
      type,
      name: type === 'college' ? 'Green Valley University' : 'Hope Kitchen',
      email,
    });
    
    if (type === 'college') {
      navigate('/post-food');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#4CAF50] p-4 rounded-full">
              <Leaf className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-[#4CAF50] mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to continue making a difference</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
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
                <form onSubmit={(e) => handleLogin(e, 'college')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="collegeEmail">Email</Label>
                    <Input
                      id="collegeEmail"
                      name="email"
                      type="email"
                      placeholder="admin@college.edu"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collegePassword">Password</Label>
                    <Input
                      id="collegePassword"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                    Login as College
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="ngo" className="mt-6">
                <form onSubmit={(e) => handleLogin(e, 'ngo')} className="space-y-4">
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
                    Login as NGO
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-[#4CAF50] hover:underline"
                >
                  Register here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
