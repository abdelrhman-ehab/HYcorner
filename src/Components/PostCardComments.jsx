import React, { useContext, useState } from 'react'
import PostCardHeader from './PostCardHeader'
import { IoIosSend } from "react-icons/io";
import { deleteCommentApi, makeCommentApi, updateCommentApi } from '../ApiRequests/ApiRequests';
import { Button } from '@heroui/react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useUserInfo } from '../Hooks/useUserInfo';
import { FaPencilAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { queryClient } from './../lib/queryClient';



export default function PostCardComments({ post, alternativeUserImage, commentsLimit, getAllPosts }) {

    const { data: userInfo } = useUserInfo()
    const [comment, setComment] = useState('')
    const [commentId, setCommentId] = useState('')
    const [updatedComment, setUpdatedComment] = useState('')
    const [workAsUpdate, setWorkAsUpdate] = useState(false)

    // create comment function
    const { mutate: makeComment, isPending: addCommentPending } = useMutation({
        mutationKey: ['create-comment'],
        mutationFn: ({ comment, postId }) => makeCommentApi(comment, postId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['get-all-posts'] })
            setComment('')
            toast.success("comment added success")
        },
        onError: (err) => {
            toast.error(err?.message || 'faild to create comment')
        }
    })

    // delete comment function
    const { mutate: deleteComment, isPending: deleteCommentPending } = useMutation({
        mutationKey: ['delete-comment'],
        mutationFn: (id) => deleteCommentApi(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries('get-all-posts')
            toast.success("comment deleted success")
        },
        onError: (err) => {
            toast.error(err?.message || 'faild to delete comment')
        }
    })


    const { mutate: updateComment, isPending: updateCommentPending } = useMutation({
        mutationKey: ['update-comment'],
        mutationFn: ({ updatedComment, commentId }) => {
            return updateCommentApi(updatedComment, commentId)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries('get-all-posts')
            setWorkAsUpdate(false)
            setUpdatedComment('')
            setComment('')
            toast.success('comment updated successfully')
        },
        onError: (err) => {
            toast.error(err?.message || 'faild to update comment')
        }
    })


    return <>
        <div className='pb-6 px-2 flex justify-between items-center gap-2 ' onClick={(e) => { e.stopPropagation(); }}>
            <img src={alternativeUserImage} className='w-9 p-.5 aspect-square rounded-full' alt="" />
            {!workAsUpdate ?
                <div className='w-full relative' >
                    <input value={comment} onChange={(e) => { setComment(e.target.value) }} className='py-1.5 px-2 bg-white text-black border border-gray-500 w-full rounded-lg' placeholder='add comment' type="text" />
                    <Button type='submit' onPress={() => { makeComment({ comment: comment, postId: post?._id }) }} className={`bg-transparent text-blue-900 absolute -right-4 w-fit -top-.5 `} isLoading={addCommentPending} disabled={comment.length < 2 || addCommentPending} >{addCommentPending ? null : <IoIosSend className='text-2xl ' />}</Button>
                </div> :
                <div className='w-full relative' >
                    <input value={updatedComment} onChange={(e) => { setUpdatedComment(e.target.value) }} className='py-1.5 px-2 bg-white text-black border border-gray-500 w-full rounded-lg' placeholder='update comment' type="text" />
                    <Button type='submit' onPress={() => { updateComment({ updatedComment, commentId }) }} className={`bg-transparent text-blue-900 absolute -right-4 w-fit -top-.5 `} isLoading={updateCommentPending} disabled={updatedComment.length < 2 || updateCommentPending} >{updateCommentPending ? null : <div className='flex items-center gap-3 text-md me-3'> <FaPencilAlt className='text-blue-800' onClick={(e)=>{updateComment({updatedComment, commentId}); e.stopPropagation(); e.preventDefault()}} /> <FaXmark onClick={(e)=>{setWorkAsUpdate(false); setUpdatedComment(''); e.stopPropagation(); e.preventDefault()}} className='text-red-700' /></div>}</Button>
                </div>
            }
        </div>
        <div className={`comments bg-gray-500/10`}>
            {post?.comments?.slice(0, commentsLimit).map(comment =>
                <div className='border-b border-b-divider py-3 pe-2' key={comment._id}>
                    <div className='flex justify-between items-center'>
                        <PostCardHeader post={post} alternativeUserImage={alternativeUserImage} comment={comment} commentDate={comment?.createdAt} getAllPosts={getAllPosts} commentHeader={comment} />
                        {userInfo?._id === comment?.commentCreator?._id &&
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button variant="flat" >
                                        <BsThreeDotsVertical />
                                    </Button>
                                </DropdownTrigger>

                                <DropdownMenu aria-label="Post Actions">
                                    <DropdownItem onPress={() => { setWorkAsUpdate(true); setUpdatedComment(comment?.content); setCommentId(comment?._id) }}>Update Comment</DropdownItem>
                                    <DropdownItem className="text-danger" onClick={() => { deleteComment(comment?._id) }}>
                                        Delete Comment
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        }
                    </div>

                </div>
            )}
        </div>
    </>
}