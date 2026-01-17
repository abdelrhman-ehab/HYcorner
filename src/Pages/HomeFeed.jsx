import React, { useContext, useEffect, useState } from 'react'
import { createPostApi, getPostsApi } from '../ApiRequests/ApiRequests';
import PostCard from '../Components/postCard';
import { FaImage } from "react-icons/fa";
import { Button } from '@heroui/react';
import { FaRegCircleXmark } from "react-icons/fa6";
import toastr from 'toastr';
import { Textarea } from "@heroui/input";

toastr.options = {
  "closeButton": false,
  "debug": true,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": true,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}



export default function HomeFeed() {

  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const [postBody, setPostBody] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [postImageUrl, setPostImageUrl] = useState(null)



  // create post function
  const createPost = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (!postBody && !postImage) {
      return
    }
    else {
      const formData = new FormData()
      if (postBody) {
        formData.append('body', postBody)
      }
      if (postImage) {
        formData.append('image', postImage)
      }

      const response = await createPostApi(formData)
      if (response.message) {

        await getAllPosts()

        // reset inputs
        setPostBody('')
        setPostImage(null)
        setPostImageUrl(null)
        setIsLoading(false)

        toastr["success"]("post added success")
      }
      else {
        toastr["error"](response)
      }
    }

  }

  // generate image url
  const generateImageUrl = (e) => {
    setPostImage(e.target.files[0])
    setPostImageUrl(URL.createObjectURL(e.target.files[0]))
    e.target.value = ''
  }


  // get all posts function
  const getAllPosts = async () => {
    const response = await getPostsApi('https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt')
    setPosts(response.posts)
  }

  useEffect(() => {
    getAllPosts()
  }, [])




  return <>

    <section className='px-2 md:px-15'>
      <form onSubmit={createPost} className=''>
        <div className='w-full min-w-[280px] max-w-[750px] mx-auto bg-gray-500/10 p-2 rounded-md'>
          <div className='relative'>
            <textarea value={postBody} onChange={(e) => { setPostBody(e.target.value); }} className="w-full rounded-lg mb-3 border p-2" rows={3} placeholder="what's in your mind"></textarea>
            {postImageUrl &&
              <div className='w-8 aspect-square rounded-md absolute bottom-5 left-2'>
                <img className='w-full' src={postImageUrl} alt="" />
                <FaRegCircleXmark onClick={() => { setPostImageUrl(null); setPostImage(null) }} className='absolute text-sm -top-1 -right-1 text-white cursor-pointer' title='remove image' />
              </div>
            }
          </div>
          <div className='flex items-center justify-between'>
            <label>
              <FaImage className='text-xl cursor-pointer' />
              <input onChange={generateImageUrl} type="file" className='hidden' />
            </label>
            <Button isLoading={isLoading} disabled={isLoading || postBody?.length < 2} type='submit' className='bg-gray-50 text-black font-medium'>post</Button>
          </div>
        </div>
      </form>

      <PostCard posts={posts} getAllPosts={getAllPosts} />
    </section>

  </>

}
