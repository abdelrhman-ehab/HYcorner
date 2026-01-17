import React from 'react'

export default function PostCardBody({post, alternativePostCover}) {
    return <>
        <div className="post-body px-2">
            <p className='my-2 line-clamp-1 text-lg'>{post?.body}</p>
            <div>
                {post?.image ? <img onError={(e) => e.target.src = alternativePostCover} className='w-full aspect-video object-cover' src={post?.image} alt={post?.body?.split(' ', 3).join(' ')} loading='lazy' /> : null}
            </div>
        </div>
    </>
}
