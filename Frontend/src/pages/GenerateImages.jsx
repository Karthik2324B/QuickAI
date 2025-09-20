import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Markdown from 'react-markdown'
import { useAuth } from '@clerk/clerk-react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateImages = () => {
  const imageStyle = [
    'Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantacy style', '3D style', 'Portrait style', 'Realistic style'
  ]

  const [selectedStyle, setSelectedStyle] = useState('Realistic ')
  const [input, setInput] = useState('')
  const [publish, setPublish] = useState(false)

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
      setLoading(false)
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
          <Sparkles className='w-6 text-[#00AD25]' />
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm  font-medium'>Describe Your Image</p>
        <textarea onChange={(e) => setInput(e.target.value)} value={input} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm border border-gray-300 rounded-md' placeholder='Describe what you want to see in the image...' required />
        <p className='mt-4 text-sm font-medium'>Style</p>
        <div className='mt-3 flex flex-wrap gap-3 sm:max-w-9/11'>
          {imageStyle.map((item) => (
            <span onClick={() => setSelectedStyle(item)} key={item}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-green-50 text-green-700' : 'border-gray-300 text-gray-500'}`}>
              {item}</span>
          ))}
        </div>
        <div className='my-6 flex items-center gap-2'>
          <label className='relative cursor-pointer'>
            <input type='checkbox' onChange={(e) => setPublish(e.target.checked)} checked={publish} className='sr-only peer' />
            <div className='w-9 h-5 bg-slate-300 peer-checked:bg-green-500 rounded-full transition'>
            </div>
            <span className='absolute top-1 left-1 peer-checked:translate-x-4 w-3 h-3 bg-white rounded-full transition' ></span>
          </label>
          <p className='text-sm'>Make this image Public</p>
        </div>


        <button disabled={loading} className='w-full flex items-center justify-center gap-2 cursor-pointer rounded-lg text-sm bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 '>
          {
          loading ? 
          (<span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>) :
          (<Image className='w-5' />)
          }
          Generate Image
        </button>
      </form>
      {/* rightcol */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border  border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Image className='w-5 h-5 text-[#00AD25]' />
          <h1 className='text-xl font-semibold'>Generated Image </h1>
        </div>

        {!content?( <div className='flex flex-1 justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400 '>
            <Image className='w-9 h-9' />
            <p    >Enter a topic and click "Generate image" to get started </p>
          </div>
        </div>):(
          <div className='mt-3 h-full'>
            <img src={content} alt="image" className='w-full h-full' />
          </div>
        )}
       

      </div>
    </div>
  )
}

export default GenerateImages

