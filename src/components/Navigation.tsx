import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  user: { type: 'college' | 'ngo'; name: string } | null;
  onLogout: () => void;
}

export function Navigation({ user, onLogout }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#4CAF50] p-2 rounded-lg">
              <Leaf className="text-white" size={24} />
            </div>
            <div>
              <div className="text-[#4CAF50]">FoodLink</div>
              <div className="text-xs text-gray-600">Campus to Caring Hands</div>
            </div>
          </Link>

          {user && (
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm transition-colors ${
                  isActive('/') ? 'text-[#4CAF50]' : 'text-gray-600 hover:text-[#4CAF50]'
                }`}
              >
                Home
              </Link>
              {user.type === 'college' && (
                <>
                  <Link
                    to="/post-food"
                    className={`text-sm transition-colors ${
                      isActive('/post-food') ? 'text-[#4CAF50]' : 'text-gray-600 hover:text-[#4CAF50]'
                    }`}
                  >
                    Post Food
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`text-sm transition-colors ${
                      isActive('/dashboard') ? 'text-[#4CAF50]' : 'text-gray-600 hover:text-[#4CAF50]'
                    }`}
                  >
                    Dashboard
                  </Link>
                </>
              )}
              {user.type === 'ngo' && (
                <Link
                  to="/dashboard"
                  className={`text-sm transition-colors ${
                    isActive('/dashboard') ? 'text-[#4CAF50]' : 'text-gray-600 hover:text-[#4CAF50]'
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <Link
                to="/contact"
                className={`text-sm transition-colors ${
                  isActive('/contact') ? 'text-[#4CAF50]' : 'text-gray-600 hover:text-[#4CAF50]'
                }`}
              >
                Contact
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
