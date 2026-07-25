// @ts-nocheck
import React from 'react';

const CompanyLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Bearing Container */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
          
          {/* Middle Ring */}
          <div className="absolute inset-4 border-4 border-blue-400 rounded-full animate-spin duration-1000">
            {/* Bearing Balls */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
          
          {/* Inner Ring with Logo */}
          <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            {/* Company Logo - Replace with your actual logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LOGO</span>
            </div>
          </div>
          
          {/* Additional Rotating Elements */}
          <div className="absolute inset-2 border-2 border-dashed border-gray-300 rounded-full animate-spin duration-1500"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-700">Loading...</h3>
          <p className="text-gray-500 text-sm">Please wait while we prepare everything</p>
        </div>
      </div>
    </div>
  );
};

// Alternative Compact Version
const CompactLoader = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-20 h-20">
        {/* Outer Rotating Ring */}
        <div className="absolute inset-0 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin duration-1000"></div>
        
        {/* Middle Ring */}
        <div className="absolute inset-3 border-2 border-blue-400 border-b-transparent rounded-full animate-spin duration-750"></div>
        
        {/* Logo Center */}
        <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">L</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage Example Component
const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading ? (
        <CompanyLoader />
      ) : (
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our App</h1>
          <p className="text-gray-600">Your content has loaded successfully!</p>
          
          {/* Show compact loader example */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Compact Loader Example:</h2>
            <CompactLoader />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
export { CompanyLoader, CompactLoader };