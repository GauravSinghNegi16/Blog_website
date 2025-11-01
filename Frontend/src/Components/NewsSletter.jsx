import React from 'react';

const NewsSletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-20 sm:my-28 md:my-32 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        Never Miss a Blog!
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-500/70 pb-6 sm:pb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      <form className="flex items-center justify-between w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter your email id"
          className="border border-gray-300 border-r-0 outline-none w-full px-4 text-sm sm:text-base text-gray-600 rounded-l-md h-12 sm:h-14"
        />
        <button
          type="submit"
          className="px-8 sm:px-10 md:px-12 h-12 sm:h-14 text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-r-md text-sm sm:text-base"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsSletter;
