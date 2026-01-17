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
import { Card, Skeleton } from "@heroui/react";

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
    <div className='px-2 md:px-15 mx-auto bg-transparent'>
      {post ?
        <div className='w-full min-w-[280px] max-w-[750px] mx-auto bg-gray-500/10 p-2 rounded-lg'>
          <PostCardHeader post={post} alternativePostCover={alternativePostCover} commentDate={null} getAllPosts={getPost} commentHeader={null} />
          <PostCardBody post={post} alternativePostCover={alternativePostCover} />
          <PostCardInteractionsInsights post={post} />
          <PostCardInteractions post={post} toggleLike={null} setToggleLike={null} />
          <PostCardComments post={post} alternativeUserImage={alternativeUserImage} commentsLimit={post?.comments?.length} getAllPosts={getPost} />
        </div>
        :
        <div className='w-full min-w-[280px] max-w-[750px] mx-auto bg-gray-500/10 p-2 rounded-lg space-y-3 mt-7'>
          <div className="w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-1/5 rounded-lg" />
              <Skeleton className="h-3 w-2/5 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <Card className="space-y-5 p-4 bg-transparent border-none" radius="lg">
              <Skeleton className="h-3 w-4/5 rounded-lg" />
              <Skeleton className="rounded-lg">
                <div className="h-70 rounded-lg bg-secondary" />
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-200" />
                </Skeleton>
                <div className='flex justify-between items-center my-5'>
                  <Skeleton className="w-1/6 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200" />
                  </Skeleton>
                  <Skeleton className="w-1/6 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200" />
                  </Skeleton>
                  <Skeleton className="w-1/6 rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-secondary-200" />
                  </Skeleton>
                </div>
                <Skeleton className="w-full rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-200" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-200" />
                </Skeleton>
              </div>
            </Card>
          </div>
        </div>
      }
    </div>
  </>
}
