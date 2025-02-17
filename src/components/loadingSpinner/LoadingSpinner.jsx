const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-280px)]">
      <div className="w-20 h-20 border-8 border-t-8 border-gray-300 border-t-blue-600 rounded-full animate-spin ease-in-out duration-1000">
        <div className="absolute w-5 h-5 bg-blue-600 rounded-full animate-ping top-1/4 left-1/4"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
