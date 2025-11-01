import React, { useRef } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../../Context/AppContext';

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value); // ✅ Now this reads the text input correctly
  };

  const onClear = () => {
    setInput('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="relative mx-8 sm:mx-16 xl:mx-24">
      <div className="text-center">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="" />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16">
          Your own <span className="text-primary">Blogging</span> <br /> platform
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-sm text-gray-500">
          This is your space to think out loud, to share what matters, and to write without filters.
          Whether it's one word or a thousand, your story starts right here.
        </p>

        {/* ✅ Ref moved to input, not form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded-lg overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
          />
          <button
            className="bg-primary text-white px-8 py-2 m-1.5 rounded-md hover:scale-105 transition-all cursor-pointer"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      <div className="text-center">
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-sm mt-5 py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-70"
      />
    </div>
  );
};

export default Header;
