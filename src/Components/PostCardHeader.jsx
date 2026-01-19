import React, { useContext, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserInfoContext } from '../Context/UserInfoContext';
import toastr from "toastr";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { deletePostApi, updatePostApi } from '../ApiRequests/ApiRequests';


// toastr
toastr.options = {
    closeButton: false,
    debug: true,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-bottom-right",
    preventDuplicates: true,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};

export default function PostCardHeader({ post, alternativeUserImage, commentDate, getAllPosts, commentHeader, comment }) {

    // modal contorl
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // formate date of post
    const postDateFormate = new Date(post?.createdAt)
    const dd = postDateFormate.toLocaleDateString();
    const tt = postDateFormate.toLocaleTimeString();

    // format date of comments
    const formate = new Date(commentDate);
    const d = formate.toLocaleDateString();
    const t = formate.toLocaleTimeString();

    const { userInfo } = useContext(UserInfoContext);
    const [updatedPostBody, setUpdatedPostBody] = useState('')
    const [updatedPostImage, setUpdatedPostImage] = useState(null)
    const [updatedPostImageUrl, setUpdatedPostImageUrl] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)

    const deletePost = async (id) => {
        setIsUpdating(true)
        try {
            const response = await deletePostApi(id);
            console.log(response);
            if (response.message.includes('success')) {
                await getAllPosts()
                toastr.success('Post deleted successfully');
            }
            else {
                toastr.error('faild to delete post ' + response.response.data.error);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsUpdating(false)
        }
    }


    const updatePost = async (e) => {
        setIsUpdating(true)
        e.preventDefault()
        const formData = new FormData();
        if (updatedPostBody.length > 1) {
            formData.append('body', updatedPostBody)
        }
        if (updatedPostImage) {
            formData.append('image', updatedPostImage)
        }

        if (updatedPostBody.length > 1 || updatedPostImage) {
            const response = await updatePostApi(formData, post._id)
            if (response.message.includes('success')) {
                await getAllPosts()
                toastr.success('Post updated successfully');
                setUpdatedPostBody('')
                setUpdatedPostImageUrl(null)
                setUpdatedPostImage(null)
            }
            else {
                toastr.error('faild to update post ' + response.response.data.error);
            }
        }
        setIsUpdating(false)
    }

    const generateImageUrl = (e) => {
        setUpdatedPostImageUrl(URL.createObjectURL(e.target.files[0]))
        setUpdatedPostImage(e.target.files[0])
        e.target.value = ''
    }

    return <>

        <div className='post-header py-2 px-2 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <img
                    onError={(e) => e.target.src = alternativeUserImage}
                    className='w-10 aspect-square rounded-full p-1 bg-amber-50'
                    src={post?.user?.photo}
                    alt=""
                />
                <div className={`flex flex-col ${commentHeader ? 'bg-gray-500/10 px-4 py-2 rounded-xl' : ''}`}>

                    {commentHeader ?
                        <span className='font-medium text-md'>{commentHeader?.commentCreator?.name}</span> :
                        <span className='font-medium text-md'>{post?.user?.name}</span>
                    }

                    {commentDate ?
                        <div className='flex gap-1 text-xs text-gray-400'>
                            <span>{d}</span>
                            <span>{t}</span>
                        </div>
                        :
                        <div className='flex gap-1 text-xs text-gray-400'>
                            <span>{dd}</span>
                            <span>{tt}</span>
                        </div>
                    }
                    <p className='text-lg mt-1'>{comment?.content}</p>
                </div>
            </div>

            <div>
                {(!commentHeader && (post?.user?._id === userInfo?._id)) && (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="flat" disabled={isUpdating} isLoading={isUpdating}>
                                {isUpdating ? null : <BsThreeDotsVertical />}
                            </Button>
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Post Actions">
                            <DropdownItem onPress={onOpen}>Update Post</DropdownItem>
                            <DropdownItem className="text-danger" onClick={() => deletePost(post._id)}>
                                Delete Post
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </div>
        </div >

        {/* modal */}
        <>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">update post</ModalHeader>
                            <form onSubmit={updatePost}>
                                <ModalBody>
                                    {/* post body */}
                                    <div className='relative'>
                                        <textarea value={updatedPostBody} onChange={(e) => { setUpdatedPostBody(e.target.value) }} name="updatedPostBody" className='w-full p-2 border border-gray-300 rounded-md focus:outline-0' rows={5} placeholder='update post caption..'></textarea>
                                        {updatedPostImageUrl &&
                                            <div className='w-7 aspect-square rounded-sm absolute bottom-3 left-2'>
                                                <img src={updatedPostImageUrl} className='w-full' alt="" />
                                                <FaRegCircleXmark onClick={() => { setUpdatedPostImage(null); setUpdatedPostImageUrl(null) }} className='absolute -top-1 -right-1 text-sm cursor-pointer' />
                                            </div>
                                        }
                                    </div>
                                    <label>
                                        <input onChange={generateImageUrl} type="file" />
                                    </label>
                                </ModalBody>

                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button type='submit' isLoading={isUpdating} disabled={isUpdating || updatedPostBody.length < 2} onPress={onClose}>
                                        update
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    </>;

}
