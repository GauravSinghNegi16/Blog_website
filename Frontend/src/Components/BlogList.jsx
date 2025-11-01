import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import BlogCard from './BlogCard';
import { useAppContext } from '../../Context/AppContext';

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const { blogs, input } = useAppContext();

    const filteredBlogs = () => {
        if (input === '') {
            return blogs
        }
        return blogs.filter((blogs) => blogs.title.toLowerCase().includes(input.toLowerCase())
            || blogs.category.toLowerCase().includes(input.toLowerCase())
        )
    }

    return (
        <div>
         <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 my-6 sm:my-8 md:my-10 relative px-2 overflow-x-auto scrollbar-hide">
  {blogCategories.map((elem) => (
    <div key={elem} className="flex-shrink-0">
      <button
        onClick={() => setMenu(elem)}
        className={`cursor-pointer text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 rounded-full transition-all duration-300
        ${menu === elem ? 'bg-primary text-white' : 'text-gray-500 hover:text-black'}`}
      >
        {elem}
      </button>
    </div>
  ))}
</div>


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {filteredBlogs()
                    .filter((blog) => menu === "All" || blog.category === menu)
                    .map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
            </div>

        </div>
    );
};

export default BlogList;
