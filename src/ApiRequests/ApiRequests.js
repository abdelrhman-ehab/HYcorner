import axios from "axios"

export const sendRegisterDataApi = async (userData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/signup`, userData)
    return data;
  } catch (e) {
    return e.response?.data;
  }
}

export const sendLoginDataApi = async (userData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/signin`, userData)
    return data
  }
  catch (e) {
    console.log(e.response?.data);
    return e.response?.data
  }
}

export const getPostsApi = async (link) => {
  try {
    const { data } = await axios.get(`${link}`, { headers: { 'token': localStorage.getItem('socialAppToken') } })
    return data
  } catch (e) {
    console.log(e);
  }
}

export const createCommentApi = async (bodyData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/comments`, bodyData, { headers: { 'token': localStorage.getItem('socialAppToken') } })
    return data;

  } catch (e) {
    return e.response.error.message
  }
}

export const createPostApi = async (bodyData) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/posts`, bodyData, {
      headers: {
        'token': localStorage.getItem('socialAppToken')
      }

    })
    return data;
  } catch (e) {
    return e.response.error.message
  }
}

export const getUserInfoApi = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile-data`, {
      headers: {
        'token': localStorage.getItem('socialAppToken')
      }
    })
    return data;

  } catch (e) {
    console.log(e);
  }
}


// update post
export const updatePostApi = async (bodyData, postId) => {
  try {
    const { data } = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`, bodyData,
      {
        headers: { 'token': localStorage.getItem('socialAppToken') }
      })
    return data
  } catch (e) {
    return e
  }
}


// delete post
export const deletePostApi = async (id) => {
  try {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
      headers: {
        'token': localStorage.getItem('socialAppToken')
      }
    })
    return data
  } catch (e) {
    return e
  }
}