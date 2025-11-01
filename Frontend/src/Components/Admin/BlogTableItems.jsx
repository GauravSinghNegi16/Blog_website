import React from 'react'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast';
import { useAppContext } from '../../../Context/AppContext';

const BlogTableItems = ({ blog, fetchData, index }) => {
  const { axios } = useAppContext();
  const { title, CreatedAt, isPublished } = blog
  const BlogDate = new Date(CreatedAt)

  const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?')
    if (!confirm) return;
    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id })
      if (data.success) {
        toast.success(data.message)
        await fetchData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggel-publish', { id: blog._id })
      if (data.success) {
        toast.success(data.message)
        await fetchData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${isPublished ? 'text-green-600' : 'text-orange-700'}`}>
          {isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>
      <td className='px-2 py-4 flex text-sm gap-3'>
        <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <img
          src={assets.cross_icon}
          className='w-8 hover:scale-110 transition-all cursor-pointer'
          alt='delete'
          onClick={deleteBlog}
        />
      </td>
    </tr>
  )
}

export default BlogTableItems
