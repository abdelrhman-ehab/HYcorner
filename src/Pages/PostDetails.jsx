import React, { useEffect, useState } from 'react'
import PostCardHeader from '../Components/PostCardHeader'
import PostCardBody from '../Components/PostCardBody'
import { useParams } from 'react-router-dom'
import { getPostsApi } from '../ApiRequests/ApiRequests';
import alternativePostCover from '../assets/postImageNotFound.png'
import alternativeUserImage from '../assets/userCoverNotFound.png'
import PostCardInteractionsInsights from '../Components/PostCardInteractionsInsights';
import PostCardInteractions from '../Components/PostCardInteractions';
import PostCardComments from '../Components/PostCardComments';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState()

  const getPost = async () => {
    const response = await getPostsApi(`https://linked-posts.routemisr.com/posts/${id}`)
    setPost(response.post)
  }

  useEffect(() => {
    getPost()
  }, [])

  return <>
    <div className='mt-7 w-md sm:w-lg md:w-lg lg:w-3xl mx-auto'>
      <div className='shadow-md rounded-md overflow-hidden bg-gray-100/10'>
        <PostCardHeader post={post}  alternativePostCover={alternativePostCover} commentDate={null} getAllPosts={getPost} commentHeader={null} />
        <PostCardBody post={post} alternativePostCover={alternativePostCover} />
        <PostCardInteractionsInsights post={post} />
        <PostCardInteractions post={post} toggleLike={null} setToggleLike={null} />
        <PostCardComments post={post} alternativeUserImage={alternativeUserImage} commentsLimit={post?.comments?.length} getAllPosts={getPost} />
      </div>
    </div>
  </>
}
