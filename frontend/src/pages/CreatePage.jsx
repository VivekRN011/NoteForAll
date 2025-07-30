import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
  const [title,setTitle]= useState('')
  const [content,setContent]= useState('')
  const [loading,setLoading]= useState(false)

  const navigate = useNavigate();

  const handleSubmit =  async (e)=>{
    e.preventDefault();

    if(!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    // Simulate API call

    try{
      await axios.post('http://localhost:5001/api/notes', {
        title,
        content
    })
      toast.success("Note created successfully");
      navigate('/');
    } catch (error) {
      console.error("Error creating note:", error);
      if (error.response.status === 429){
        toast.error("Slow down! You're creating notes too quickly.");
      }else{
        toast.error("Failed to create note. Please try again.");
      }

    } finally {
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className='container mx-auto px-4 py-8'>
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className='size-5'/>
             Back to Notes
        </Link>

        <div className='card bg-base-100'>
          <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create a New Note</h2>

              <form onSubmit={handleSubmit}>
                  <div className='form-control mb-4'>
                      <label className='label'>
                          <span className='label-text'>Title</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder='Note Title'
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className='input input-bordered' 
                        
                      />
                  </div>
                  <div className='form-control mb-4'>
                      <label className='label'>
                          <span className='label-text'>Content</span>
                      </label>
                      <textarea
                        type="text" 
                        placeholder='Write your note here...'
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className='textarea textarea-bordered h-32' 
                        
                      />
                  </div>
                  <div className="card-actions justify-end">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                          {loading ? "Creating..." : "Create Note"}
                        </button>
                  </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage