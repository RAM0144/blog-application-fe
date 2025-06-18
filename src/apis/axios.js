import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BE_URL || "http://localhost:4600",
    timeout: 10000,
    headers: {
        "Customer-Header" : "foober"
    }
})


instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken")
  if(token) req.headers["Authorization"] = token
  return req
})

const getAllBlogs = async () =>{
   const response = await instance.get("/blogs")
   return response.data
}

const getBlog = async (blogId) => {
    const response = await instance.get(`/blogs/${blogId}`)
    return response.data
}

const createBlog = async (blogData) => {

    const response = await instance.post("/blogs", blogData)
    return response.data
}

const updateBlog = async (blogId, blogData) => {
    const response = await instance.put(`/blogs/${blogId}`, blogData)
    return response.data
}

const deleteBlog = async (blogId)=> {
    const response = await instance.delete(`/blogs/${blogId}`)
    return response.data
}

const loginUser = async (userDetails)=> {
  try {
    const response = await instance.post("/auth/login", userDetails)
    return response.data
  } catch (error) {
    console.log(error)
        throw new Error(error.response.data.msg || "Login failed")
  }
}

const registerUser = async (formData)=> {
  try {
    const response = await instance.post("/auth/register", formData)
    return response.data
  } catch (error) {
    console.log(error)
     throw new Error(error.response.data.msg || "Registration failed")
  }
}

export {getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog, loginUser, registerUser}

