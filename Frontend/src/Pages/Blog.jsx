import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../Components/Navbar';
import Moment from 'moment';
import Footer from '../Components/Footer';
import Loader from '../Components/Loader';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');

  const fetchBlogData = async () => {
  try {
    const { data } = await axios.get(`/api/blog/${id}`);
    data.success ? setData(data.Blog) : toast.error(data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};


  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  const addComment = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/blog/add-comments', {
      blog: id, // ✅ backend expects this key
      name,
      content: commentText,
    });

    if (data.success) {
      toast.success(data.message);
      setName('');
      setCommentText('');
      fetchComments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};


  return data ? (
    <div className='relative'>
      <Navbar />
      <img
        src={assets.gradientBackground}
        alt=''
        className='absolute -z-10 -top-[50px] opacity-70'
      />

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
          {data.title}
        </h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          Michael Brown
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt='' className='rounded-3xl mb-5' />
        <div
          className='rich-text max-w-3xl mx-auto'
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-3'>Comments ({comments.length})</p>

          <div className='flex flex-col gap-4 mb-10'>
            {comments.length > 0 ? (
              comments.map((elem, index) => (
                <div
                  className='relative border border-primary/5 bg-primary/5 max-w-xl px-4 py-2 rounded text-gray-600'
                  key={index}
                >
                  <div className='flex items-center gap-2 mb-2'>
                    <img src={assets.user_icon} className='w-6' alt='' />
                    <p className='font-medium'>{elem.name}</p>
                  </div>
                  <p className='text-sm max-w-md ml-8'>{elem.content}</p>
                  <div className='absolute right-4 bottom-3 text-sm text-gray-400'>
                    {Moment(elem.createdAt).fromNow()}
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500 text-sm'>No comments yet.</p>
            )}
          </div>

          <div className='max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Add your comment</p>
            <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='w-full p-2 border border-gray-300 rounded outline-none'
              />
              <textarea
                placeholder='Comment'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                className='w-full p-2 border border-gray-300 rounded outline-none h-48'
              ></textarea>
              <button
                className='bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer'
                type='submit'
              >
                Submit
              </button>
            </form>
          </div>

          <div className='mx-auto my-24 max-w-3xl'>
            <p className='font-semibold my-4'>Share this article on social media</p>
            <div className='flex'>
              <img src={assets.facebook_icon} width={50} alt='' />
              <img src={assets.twitter_icon} width={50} alt='' />
              <img src={assets.googleplus_icon} width={50} alt='' />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
