import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full w-16 h-16 border-4 border-t-white border-primary'></div>
    </div>
  )
}

export default Loader