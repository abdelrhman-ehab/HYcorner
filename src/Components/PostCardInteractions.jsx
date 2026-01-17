import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";

export default function PostCardInteractions({post, toggleLike, setToggleLike}) {
    return <>
        {/* interactions */}
        <div className='flex justify-around items-center my-5'>
            <div className={`flex items-center gap-1 cursor-pointer text-lg ${toggleLike === post?._id ? 'text-blue-700' : ''}`} onClick={() => { setToggleLike(post?._id === toggleLike ? '' : post?._id) }}>
                <span>like</span>
                <AiOutlineLike />
            </div>
            <div className='flex items-center gap-1 cursor-pointer text-lg'>
                <span>comment</span>
                <FaRegComment />
            </div>
            <div className='flex items-center gap-1 cursor-pointer text-lg'>
                <span>share</span>
                <TbShare3 />
            </div>
        </div>
    </>
}
