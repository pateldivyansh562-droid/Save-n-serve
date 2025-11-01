import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Package,
  Users,
  MapPin,
  TrendingUp,
  MessageSquare,
  Send,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';
import { mockDonationHistory, mockMessages } from '../lib/mockData';

interface DashboardPageProps {
  user: { type: 'college' | 'ngo'; name: string };
}

export function DashboardPage({ user }: DashboardPageProps) {
  const [showUPISuccess, setShowUPISuccess] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleUPIPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowUPISuccess(true);
    setTimeout(() => setShowUPISuccess(false), 3000);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: String(messages.length + 1),
        from: user.name,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: user.type,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white p-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[#4CAF50] mb-2">
            {user.type === 'college' ? 'College' : 'NGO'} Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Stats Cards */}
          {user.type === 'college' ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Food Donated</CardTitle>
                  <Package className="text-[#4CAF50]" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="mb-1">285 packets</div>
                  <p className="text-xs text-gray-600">+12% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">NGOs Served</CardTitle>
                  <Users className="text-[#4CAF50]" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="mb-1">8 NGOs</div>
                  <p className="text-xs text-gray-600">Across 5 locations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Impact</CardTitle>
                  <TrendingUp className="text-[#4CAF50]" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="mb-1">~450 people fed</div>
                  <p className="text-xs text-gray-600">This month</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Food Received</CardTitle>
                  <Package className="text-[#4CAF50]" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="mb-1">342 packets</div>
                  <p className="text-xs text-gray-600">+18% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Students Served</CardTitle>
                  <Users className="text-[#4CAF50]" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="mb-1">180 students</div>
                  <p className="text-xs text-gray-600">Daily average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Current Stock</CardTitle>
                  <TrendingUp className="text-[#4CAF50]" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="mb-1">50 meals</div>
                  <p className="text-xs text-gray-600">Need 150 more today</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Charts and Data */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Donation Activity</CardTitle>
                <CardDescription>
                  {user.type === 'college' ? 'Food donated' : 'Food received'} over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={mockDonationHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey={user.type === 'college' ? 'college' : 'ngo'}
                      fill="#4CAF50"
                      name="Food Packets"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-[#4CAF50]" size={20} />
                  {user.type === 'college' ? 'Recent Donation Locations' : 'Partner Colleges'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-gray-600">
                    <MapPin className="mx-auto mb-2 text-[#4CAF50]" size={32} />
                    <p>Interactive map showing connections</p>
                    <p className="text-sm mt-1">
                      {user.type === 'college' ? '8 NGOs' : '5 colleges'} in your network
                    </p>
                  </div>
                  {/* Mock map markers */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#4CAF50] rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-[#4CAF50] rounded-full border-2 border-white shadow-lg"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages and UPI */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="text-[#4CAF50]" size={20} />
                  Messages
                </CardTitle>
                <CardDescription>
                  {user.type === 'college'
                    ? 'Communication with NGOs'
                    : 'Request food from colleges'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg ${
                        msg.type === user.type ? 'bg-[#4CAF50] bg-opacity-10 ml-8' : 'bg-gray-100 mr-8'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs">{msg.from}</span>
                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder={
                      user.type === 'ngo'
                        ? 'e.g., We need 30 packets for 25 students'
                        : 'Type your message...'
                    }
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-[#4CAF50] hover:bg-[#45a049]"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="text-[#4CAF50]" size={20} />
                  UPI Payment (Mock)
                </CardTitle>
                <CardDescription>
                  Optional donation or transport cost
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showUPISuccess ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle2 className="text-[#4CAF50] mb-3" size={48} />
                    <h3 className="text-[#4CAF50] mb-1">Payment Successful!</h3>
                    <p className="text-sm text-gray-600">(Mock Transaction)</p>
                  </div>
                ) : (
                  <form onSubmit={handleUPIPayment} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="upiId" className="text-sm">
                        UPI ID
                      </label>
                      <Input
                        id="upiId"
                        name="upiId"
                        placeholder="yourname@upi"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="amount" className="text-sm">
                        Amount (₹)
                      </label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="100"
                        min="1"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                      Pay Now (Mock)
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      This is a mock payment interface. No real transaction will occur.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
