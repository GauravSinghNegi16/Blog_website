import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../Components/Admin/CommentTableItem'
import { useAppContext } from '../../../Context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('not approved')

  const { axios } = useAppContext()

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // ✅ get admin token stored at login
      const { data } = await axios.get('/api/admin/comments', {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send Bearer token
        },
      });

      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };


  useEffect(() => {
    fetchData()
  }, [])

  const filteredComments = comments.filter(comment =>
    filter === 'approved' ? comment.isApproved === true : comment.isApproved === false
  )

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1 className='text-xl font-semibold text-gray-700'>Comments</h1>
        <div className='flex gap-4'>
          <button
            onClick={() => setFilter('approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-sm ${filter === 'approved' ? 'text-primary' : 'text-gray-700'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('not approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-sm ${filter === 'not approved' ? 'text-primary' : 'text-gray-700'}`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hidden'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  index={index + 1}
                  comment={comment}
                  fetchData={fetchData}
                />
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center py-4 text-gray-400'>
                  No comments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
