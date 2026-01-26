import React, { useContext, useEffect, useState } from 'react'
import { createPostApi, getPostsApi } from '../ApiRequests/ApiRequests';
import PostCard from '../Components/PostCard';
import { FaImage } from "react-icons/fa";
import { Button } from '@heroui/react';
import { FaRegCircleXmark } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query'



export default function HomeFeed() {

  const [postBody, setPostBody] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [postImageUrl, setPostImageUrl] = useState(null)



  // create post function
  const createPost = async (e) => {
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

        await refetch()

        // reset inputs
        setPostBody('')
        setPostImage(null)
        setPostImageUrl(null)

        toast.success("post added success")
      }
      else {
        toast.error(response)
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
  const { data: posts, isFetching, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['getAllPosts'],
    queryFn: getPostsApi,
    select: (data) => data.data.posts,
    // refetchInterval:3000,
    retry: 2,
  })




  return <>

    <section className='px-2 md:px-15'>
      <form onSubmit={createPost} className=''>
        <div className='w-full min-w-[280px] max-w-[750px] mx-auto bg-gray-500/10 p-2 rounded-lg'>
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
            <Button disabled={isLoading || postBody?.length < 2} type='submit' className='bg-gray-50 text-black font-medium'>Post</Button>
          </div>
        </div>
      </form>

      {error?.message ? <p className='text-center mt-60 text-red-700 text-2xl'>{"" + error?.message}</p> :
        <PostCard posts={posts} getAllPosts={refetch} />}
    </section>

  </>

}
