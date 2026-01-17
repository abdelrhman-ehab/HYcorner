import React, { useState } from 'react'
import PostCardHeader from './PostCardHeader';
import PostCardBody from './PostCardBody';
import PostCardInteractionsInsights from './PostCardInteractionsInsights';
import PostCardInteractions from './PostCardInteractions';
import PostCardComments from './PostCardComments';
import alternativePostCover from '../assets/postImageNotFound.png'
import alternativeUserImage from '../assets/userCoverNotFound.png'
import { Card, Skeleton } from "@heroui/react";

export default function PostCard({ posts, getAllPosts }) {
    const [toggleLike, setToggleLike] = useState("")



    return <>
        {posts.length > 0 ?
            <div className='w-full min-w-[280px] max-w-[750px] mx-auto mt-7 flex flex-col gap-5'>
                {posts.map(post =>
                    <div key={post._id} className='shadow-md rounded-md overflow-hidden bg-gray-500/10'>

                        {/* post header */}
                        <PostCardHeader getAllPosts={getAllPosts} post={post} alternativeUserImage={alternativeUserImage} date={false} commentDate={''} comment={null} />

                        {/* post body */}
                        <PostCardBody post={post} alternativePostCover={alternativePostCover} />

                        {/* interactions interactions insights */}
                        <PostCardInteractionsInsights post={post} />

                        {/* post card interactions */}
                        <PostCardInteractions post={post} toggleLike={toggleLike} setToggleLike={setToggleLike} />

                        {/* postcard comments */}
                        <PostCardComments post={post} alternativeUserImage={alternativeUserImage} commentsLimit={1} getAllPosts={getAllPosts} />

                    </div>
                )}
            </div> :
            <div className='w-full min-w-[280px] max-w-[750px] mx-auto bg-gray-500/10 p-2 rounded-lg space-y-3 mt-7'>
                <div className="w-full flex items-center gap-3">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    <Card className="space-y-5 p-4 bg-transparent border-none" radius="lg">
                        <Skeleton className="rounded-lg">
                            <div className="h-70 rounded-lg bg-secondary" />
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-full rounded-lg bg-secondary" />
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-full rounded-lg bg-secondary-300" />
                            </Skeleton>
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
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-3 w-full rounded-lg bg-secondary-200" />
                            </Skeleton>
                        </div>
                    </Card>
                </div>
            </div>
        }
    </>
}
