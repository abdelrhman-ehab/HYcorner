import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('socialAppToken')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)    
  }
)

// response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('socialAppToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// register
export const sendRegisterDataApi = async (userData) => {
  try {
    const { data } = await api.post(`/users/signup`, userData)
    return data;
  } catch (e) {
    return e.response?.data;
  }
}

// login
export const sendLoginDataApi = async (userData) => {
  try {
    const { data } = await api.post(`/users/signin`, userData)
    return data
  }
  catch (e) {
    return e.response?.data
  }
}

// get posts
export const getPostsApi = () => {
  return api.get(`/posts?limit=50&sort=-createdAt`)
}

// create post
export const createPostApi = async (bodyData) => {
  return api.post(`/posts`, bodyData)
}

// update post
export const updatePostApi = (formData, postId) => {
  return api.put(`/posts/${postId}`, formData)
}

// delete post
export const deletePostApi = (id) => {
  return api.delete(`/posts/${id}`)
}


// make comment
export const makeCommentApi = (comment, postId) => {
  return api.post(`/comments`,
    {
      content: comment,
      post: postId
    })
}

// update comment
export const updateCommentApi = (comment, postId) => {
  return api.put(`/comments/${postId}`, { "content": comment })
}

// delete comment
export const deleteCommentApi = (id) => {
  return api.delete(`/comments/${id}`)
}

// user info
export const getUserInfoApi = () => {
  return api.get(`/users/profile-data`)
}

// user posts
export const getUserPostsApi = (userId) => {
  return api.get(`/users/${userId}/posts`)
}