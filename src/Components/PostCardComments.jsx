import React, { useContext, useState } from 'react'
import PostCardHeader from './PostCardHeader'
import { IoIosSend } from "react-icons/io";
import { createCommentApi } from '../ApiRequests/ApiRequests';
import { Button } from '@heroui/react';
import { UserInfoContext } from '../Context/UserInfoContext';
import { BsThreeDotsVertical } from "react-icons/bs";
import toastr from 'toastr';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';


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


export default function PostCardComments({ post, alternativeUserImage, commentsLimit, getAllPosts }) {

    const { userInfo } = useContext(UserInfoContext)
    const { token } = useContext(AuthContext)

    const [isSending, setIsSending] = useState(false)
    const [comment, setComment] = useState('')
    const [commentId, setCommentId] = useState(null)

    const [workAsUpdate, setWorkAsUpdate] = useState(false)
    const [commentModefication, setCommentModefication] = useState(false)

    // create comment function
    const makeComment = async () => {
        setIsSending(true)
        const bodyData = {
            content: comment,
            post: post?._id
        }
        try {
            const response = await createCommentApi(bodyData)
            if (response.message) {
                await getAllPosts()
                setComment('')
                toastr["success"]("comment added success")
            }
        } catch (e) {

            toastr["error"](e.response.data.message)
        }
        finally{
            setIsSending(false)
        }
    }

    // delete comment function
    const deleteComment = async (id) => {
        setCommentModefication(true)
        try {
            const { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, { headers: { 'token': token } })
            if (data.message) {
                await getAllPosts()
                toastr["success"]('comment deleted successfully')
            }
        } catch (e) {
            toastr["error"](e.response.data.message)
        } finally {
            setCommentModefication(false)
        }
    }

    // update comment function
    const updateComment = async (id) => {
        setIsSending(true)
        setCommentModefication(true)
        try {
            const { data } = await axios.put(`https://linked-posts.routemisr.com/comments/${id}`, {"content": comment}, {
                headers: {
                    'token': token
                }
            })
            console.log(data);
            await getAllPosts()
            toastr["success"]('comment updated successfully')
            setComment('')

        } catch (e) {
            console.log(e);
            toastr["error"](e.response.data.message)

        } finally {
            setWorkAsUpdate(false)
            setCommentModefication(false)
            setCommentId(null)
            setIsSending(false)
        }
    }

    // create a comment or update
    const commentOperation = (e) => {
        e.preventDefault()
        if (workAsUpdate) {
            updateComment(commentId)
        }
        else{
            makeComment()
        }
    }


    return <>
        <div className='pb-6 px-2 flex justify-between items-center gap-2 ' onClick={(e) => { e.stopPropagation(); }}>
            <img src={alternativeUserImage} className='w-9 p-.5 aspect-square rounded-full' alt="" />
            <form onSubmit={commentOperation} className='w-full relative' >
                <input value={comment} onChange={(e) => { setComment(e.target.value) }} className='py-1.5 px-2 bg-white text-black border border-gray-500 w-full rounded-lg' placeholder='add comment' type="text" />
                <Button type='submit' className={`bg-transparent text-blue-900 absolute -right-4 w-fit -top-.5 `} isLoading={isSending} disabled={comment.length < 2 || isSending} >{isSending? null : <IoIosSend className='text-2xl ' />}</Button>
            </form>
        </div>
        <div className={`comments bg-gray-500/10`}>
            {post?.comments?.slice(0, commentsLimit).map(comment =>
                <div className='border-b border-b-divider py-3 pe-2' key={comment._id}>
                    <div className='flex justify-between items-center'>
                        <PostCardHeader post={post} alternativeUserImage={alternativeUserImage} comment={comment} commentDate={comment?.createdAt} getAllPosts={getAllPosts} commentHeader={comment} />
                        {userInfo._id === comment.commentCreator?._id &&
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="flat" disabled={commentModefication}>
                                        <BsThreeDotsVertical />
                                    </Button>
                                </DropdownTrigger>

                                <DropdownMenu aria-label="Post Actions">
                                    <DropdownItem onClick={() => { setComment(comment.content); setWorkAsUpdate(true); setCommentId(comment._id) }}>Update Comment</DropdownItem>
                                    <DropdownItem className="text-danger" onClick={() => { deleteComment(comment._id) }}>
                                        Delete Comment
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>}
                    </div>
                    
                </div>
            )}
        </div>
    </>
}