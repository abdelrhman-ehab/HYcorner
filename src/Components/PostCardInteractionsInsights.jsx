import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function PostCardInteractionsInsights({ post }) {
    const navigate = useNavigate();
    return <>
        <div className='border-b border-b-divider flex items-center justify-between px-2 py-4' onClick={(e) => { navigate('/postDetails/' + post._id) }}>
            {/* reactions insights */}
            <div className='flex items-center gap-1.5'>
                <div className='-space-x-2 flex items-center'>
                    <AiOutlineLike className='text-xl text-blue-800' />
                    <FaRegHeart className='text-xl text-red-800' />
                </div>
                <span>8</span>
            </div>
            {/* comments insights */}
            <div className='flex items-center gap-3'>
                <span>{post?.comments?.length} comments</span>
            </div>
        </div>
    </>
}