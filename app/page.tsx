'use client'
// import Link from 'next/link';
import { FaRobot, FaTwitter, FaCog, FaChartLine, FaLock, FaComments, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="text-4xl mb-4">🤖</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Twitter Automation Bot</h1>
        <p className="text-gray-400 mb-8">
          Automate your Twitter engagement with AI-powered responses using Gemini API
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center" onClick={handleClick}>
          {loading ? 'Starting...' : 'Get Started'}
        </Button>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#111827] p-8 rounded-xl">
          <div className="text-blue-500 mb-4">
            <FaComments size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Automated Replies</h3>
          <p className="text-gray-400">
            Generate thoughtful and engaging replies to tweets using the advanced Gemini API
          </p>
        </div>

        <div className="bg-[#111827] p-8 rounded-xl">
          <div className="text-blue-500 mb-4">
            <FaCog size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Processing</h3>
          <p className="text-gray-400">
            Process tweets based on engagement metrics and generate replies for high-impact content
          </p>
        </div>

        <div className="bg-[#111827] p-8 rounded-xl">
          <div className="text-blue-500 mb-4">
            <FaLock size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Sign-In</h3>
          <p className="text-gray-400">
            Automated and secure sign-in process using stored cookies and credentials
          </p>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-[#111827] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTwitter className="text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <p className="text-gray-400 text-sm">Link your Twitter account securely</p>
          </div>
          <div className="text-center">
            <div className="bg-[#111827] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCog className="text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Configure</h3>
            <p className="text-gray-400 text-sm">Set your engagement preferences</p>
          </div>
          <div className="text-center">
            <div className="bg-[#111827] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRobot className="text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Engage</h3>
            <p className="text-gray-400 text-sm">Bot starts monitoring and responding</p>
          </div>
          <div className="text-center">
            <div className="bg-[#111827] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartLine className="text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Grow</h3>
            <p className="text-gray-400 text-sm">Watch your engagement increase</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-2xl mr-2">🤖</span>
            <span className="font-semibold">Twitter Automation Bot</span>
          </div>
          <div className="flex space-x-6">
            <a href="https://x.com/Arsh1d_101" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-white cursor-pointer" />
            </a>
            <a href="https://github.com/bhatarshid" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-400 hover:text-white cursor-pointer" />
            </a>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm py-4">
          © 2024 Twitter Automation Bot. All rights reserved.
        </div>
      </footer>
    </div>
  );
}