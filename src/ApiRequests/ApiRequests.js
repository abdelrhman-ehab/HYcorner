import axios from "axios"

export const sendRegisterDataApi = async (userData) => {
  try {
    const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', userData)
    return data;
  } catch (e) {
    return e.response?.data;
  }
}

export const sendLoginDataApi = async (userData) => {
  try {
    const { data } = await axios.post(`https://linked-posts.routemisr.com/users/signin`, userData)
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
    const { data } = await axios.post(`https://linked-posts.routemisr.com/comments`, bodyData, { headers: { 'token': localStorage.getItem('socialAppToken') } })
    return data;

  } catch (e) {
    return e.response.error.message
  }
}

export const createPostApi = async (bodyData) => {
  try {
    const { data } = await axios.post('https://linked-posts.routemisr.com/posts', bodyData, {
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
    const { data } = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
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
    const { data } = await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, bodyData,
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
    const { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        'token': localStorage.getItem('socialAppToken')
      }
    })
    return data
  } catch (e) {
    return e
  }
}