import { Eraser, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Markdown from 'react-markdown'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveBackground = () => {

  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()


  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', input)

      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
   
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='h-full flex flex-wrap items-start p-6 gap-4 text-slate-700 overflow-y-scroll '>
      {/* leftcol */}
      <form onSubmit={onSubmitHandler} className='w-full border border-gray-200 bg-white rounded-lg max-w-sm p-4'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
        <p className='mt-6 text-sm  font-medium'>Upload Image</p>
        <input onChange={(e) => setInput(e.target.files[0])} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300 rounded-md text-gray-600' required />
        <p className='text-xs text-gray-500 font-light mt-1'>Supports JPG PNG and other image formats</p>

        <button disabled={loading} className='w-full flex items-center justify-center gap-2 cursor-pointer rounded-lg text-sm bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 '>
          {
            loading ?
              (<span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>) :
              <Eraser className='w-5' />
          }
          Remove background
        </button>

      </form>
      {/* rightcol */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border  border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Eraser className='w-5 h-5 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Processed Image </h1>
        </div>

        {!content ?(<div className='flex flex-1 justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400 '>
            <Eraser className='w-9 h-9' />
            <p>Upload an image and click "Remove Background" to get started </p>
          </div>
        </div>):(
          <img src={content} alt="image" className='mt-3 w-full h-full'/>
        )}
        

      </div>
    </div>
  )
}

export default RemoveBackground
