import axios from 'axios'
import { Button } from "@heroui/button";
import React, { useEffect, useState } from 'react'
import PostCardHeader from '../Components/PostCardHeader'
import PostCardBody from '../Components/PostCardBody'
import PostCardInteractionsInsights from '../Components/PostCardInteractionsInsights'
import PostCardInteractions from '../Components/PostCardInteractions'
import PostCardComments from '../Components/PostCardComments'
import alternativePostCover from '../assets/postImageNotFound.png'
import alternativeUserImage from '../assets/userCoverNotFound.png'
import { Card, Skeleton } from "@heroui/react";
import { Link } from 'react-router-dom';
import { FaUserEdit } from "react-icons/fa";

export default function Profile() {
  const [toggleLike, setToggleLike] = useState("")
  const [numberOfPosts, setNumberOfPosts] = useState(0)
  const [userData, setUserData] = useState(null)
  const [userPosts, setUserPosts] = useState(null)
  const getUserData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile-data`, { headers: { 'token': localStorage.getItem('socialAppToken') } })
    setUserData(data.user)
  }
  const getUserPosts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${userData?._id}/posts`, { headers: { 'token': localStorage.getItem('socialAppToken') } })
    setUserPosts(data.posts)
    setNumberOfPosts(data.posts.length)
  }

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    if (userData?._id) {
      getUserPosts()
    }
  }, [userData])


  const formatedDate = new Date(userData?.dateOfBirth)
  const dateOfBirth = formatedDate.toLocaleDateString()

  const formatedDate2 = new Date(userData?.createdAt)
  const createdAt = formatedDate2.toLocaleDateString()



  return <>
    <section className='px-2 md:px-15 mx-auto bg-transparent min-h-vh'>
      {/* user data */}
      <div className='w-full min-w-[280px] max-w-[750px] mx-auto p-4 rounded-lg bg-gray-500/10'>
        {userData ?
          <div className="profileHeader">
            <div className='w-17 object-cover aspect-square border mx-auto rounded-full overflow-hidden mb-1'>
              <img src={userData?.photo} className='w-full' alt="" />
            </div>
            <p className='text-lg block dark:text-white font-medium w-fit mx-auto mb-3'>HI, {userData?.name}</p>
            <div className="text-md block dark:text-white font-medium space-y-1">
              <p>E-Mail: <Link to={`https://mail.google.com/mail/?view=cm&fs=1&to=${userData?.email}`} className='dark:text-blue-700 font-normal'>{userData?.email}</Link></p>
              <p>Profile createdAt: <span className='dark:text-white/50 space-x-2 font-normal'>{createdAt}</span></p>
              <p>Date Of Birth: <span className='dark:text-white/50 space-x-2 font-normal'>{dateOfBirth}</span></p>
              <p>Posts: <span className='dark:text-white/50 space-x-2 font-normal'>{numberOfPosts}</span></p>
              <Button className='bg-blue-800 w-full text-md font-medium mt-1' size='md' variant='solid'>Edit Profile <FaUserEdit className='text-white' /></Button>
            </div>
          </div>
          :
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
            <div className='space-y-3'>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-200" />
              </Skeleton>
              <Skeleton className="w-1/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-200" />
              </Skeleton>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-200" />
              </Skeleton>
            </div>
          </div>

        }
      </div>
      {/* user posts */}
      {userPosts ?
        <div className={`w-full min-w-[280px] max-w-[750px] mx-auto rounded-lg bg-gray-500/10 mt-7 flex flex-col gap-5 ${userPosts.length > 0 ? 'p-2' : 'p-0'} `}>
          {[...userPosts].reverse().map(post =>
            <div key={post._id} className='shadow-md rounded-md overflow-hidden'>

              {/* post header */}
              <PostCardHeader getAllPosts={getUserPosts} post={post} alternativeUserImage={alternativeUserImage} date={false} commentDate={''} comment={null} />

              {/* post body */}
              <PostCardBody post={post} alternativePostCover={alternativePostCover} />

              {/* interactions interactions insights */}
              <PostCardInteractionsInsights post={post} />

              {/* post card interactions */}
              <PostCardInteractions post={post} toggleLike={toggleLike} setToggleLike={setToggleLike} />

              {/* postcard comments */}
              <PostCardComments post={post} alternativeUserImage={alternativeUserImage} commentsLimit={1} getAllPosts={getUserPosts} />

            </div>
          )}
        </div> :
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

      {userPosts?.length == 0 ?
        <div className='w-full min-w-[280px] max-w-[750px] mx-auto h-10 flex items-center'>
          <p className='text-lg font-semibold'>Go back to the feed and share your first post <Link to={'/'} className='text-blue-800'>Feed Page</Link></p>
        </div> : null
      }
    </section>
  </>
}
