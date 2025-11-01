import { Linkedin, Instagram, Twitter, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#4CAF50] p-2 rounded-lg">
              <Leaf className="text-white" size={20} />
            </div>
            <div>
              <div className="text-[#4CAF50]">FoodLink</div>
              <p className="text-xs text-gray-600">
                Turning food waste into hope, one meal at a time.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-600">
              Contact: support@foodlink.org
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#4CAF50] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#4CAF50] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#4CAF50] transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 FoodLink. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
