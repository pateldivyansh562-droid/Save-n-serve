import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Loader2, MapPin, Users, Package, Award, CheckCircle2 } from 'lucide-react';
import { mockNGOs, calculateDistance } from '../lib/mockData';
import { Match, FoodPosting } from '../types';

interface NGOMatcherPageProps {
  foodPosting: FoodPosting | null;
}

export function NGOMatcherPage({ foodPosting }: NGOMatcherPageProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!foodPosting) {
      navigate('/post-food');
      return;
    }

    // Simulate loading/matching process
    setTimeout(() => {
      const collegeLocation = foodPosting.location;
      
      // Calculate matches within 5km
      const nearbyNGOs = mockNGOs
        .map((ngo) => {
          const distance = calculateDistance(
            collegeLocation.lat,
            collegeLocation.lng,
            ngo.location.lat,
            ngo.location.lng
          );
          const needScore = ngo.totalCapacity - ngo.currentFoodStock;
          
          return {
            ngo,
            distance,
            needScore,
          };
        })
        .filter((match) => match.distance <= 5)
        .sort((a, b) => b.needScore - a.needScore);

      setMatches(nearbyNGOs);
      setIsLoading(false);
    }, 2000);
  }, [foodPosting, navigate]);

  const handleSendFood = (match: Match) => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (!foodPosting) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="text-[#4CAF50] animate-spin mb-4" size={48} />
            <h2 className="text-[#4CAF50] mb-2">Searching for Nearby NGOs...</h2>
            <p className="text-gray-600 text-center">
              Our AI is analyzing locations and matching you with NGOs in need
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="text-[#4CAF50] mb-4" size={64} />
            <h2 className="text-[#4CAF50] mb-2">Food Sent Successfully!</h2>
            <p className="text-gray-600 text-center">
              Your donation will help feed those in need. Thank you!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const bestMatch = matches[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-blue-50 to-white p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[#4CAF50] mb-2">NGO Matching Results</h1>
          <p className="text-gray-600">
            Found {matches.length} NGO{matches.length !== 1 ? 's' : ''} within 5 km radius
          </p>
        </div>

        {matches.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4">
                No NGOs found within 5 km radius. Please try again later or expand your search area.
              </p>
              <Button onClick={() => navigate('/post-food')} className="bg-[#4CAF50] hover:bg-[#45a049]">
                Post New Food
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Map Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-[#4CAF50]" size={24} />
                  Location Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
                  <div className="relative z-10 text-center">
                    <MapPin className="text-[#4CAF50] mx-auto mb-2" size={32} />
                    <p className="text-gray-600">
                      🏫 Your College (Green Marker)
                    </p>
                    <p className="text-gray-600 mt-2">
                      🏠 {matches.length} NGO{matches.length !== 1 ? 's' : ''} Nearby (Orange Markers)
                    </p>
                  </div>
                  {/* Mock map pins */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  {matches.slice(0, 3).map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute"
                      style={{
                        top: `${30 + idx * 15}%`,
                        left: `${40 + idx * 10}%`,
                      }}
                    >
                      <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Best Match */}
            {bestMatch && (
              <Card className="border-2 border-[#4CAF50] bg-green-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="text-[#4CAF50]" size={24} />
                      Best Match
                    </CardTitle>
                    <Badge className="bg-[#4CAF50] hover:bg-[#45a049]">
                      Top Priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">{bestMatch.ngo.name}</h3>
                      <p className="text-sm text-gray-600">{bestMatch.ngo.address}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={16} className="text-[#4CAF50]" />
                          <span className="text-xs text-gray-600">Distance</span>
                        </div>
                        <p>{bestMatch.distance.toFixed(2)} km</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Users size={16} className="text-[#4CAF50]" />
                          <span className="text-xs text-gray-600">Beneficiaries</span>
                        </div>
                        <p>
                          {bestMatch.ngo.studentsCount + bestMatch.ngo.staffCount} people
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Package size={16} className="text-[#4CAF50]" />
                          <span className="text-xs text-gray-600">Need Score</span>
                        </div>
                        <p>{bestMatch.needScore} meals needed</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="mb-2">Donation Summary</h4>
                      <p className="text-gray-600">
                        Send <strong>{foodPosting.packets} food packets</strong> to{' '}
                        <strong>{bestMatch.ngo.name}</strong> —{' '}
                        <strong>{bestMatch.distance.toFixed(2)} km</strong> away
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Contact: {bestMatch.ngo.contactInfo}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleSendFood(bestMatch)}
                      className="w-full bg-[#4CAF50] hover:bg-[#45a049]"
                      size="lg"
                    >
                      Send Food to {bestMatch.ngo.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Other Matches */}
            {matches.length > 1 && (
              <div>
                <h2 className="text-[#4CAF50] mb-4">Other Nearby NGOs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.slice(1).map((match) => (
                    <Card key={match.ngo.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{match.ngo.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">{match.ngo.address}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-gray-600">Distance:</span>{' '}
                            <strong>{match.distance.toFixed(2)} km</strong>
                          </div>
                          <div>
                            <span className="text-gray-600">Need:</span>{' '}
                            <strong>{match.needScore} meals</strong>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleSendFood(match)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          Send Food Here
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
