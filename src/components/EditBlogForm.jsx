import { useState } from "react"
import { updateBlog } from "../apis/axios"
import { useLocation, useNavigate } from "react-router-dom"

const EditBlogForm = () => {

    const { state } = useLocation()

    const navigate = useNavigate()

    const[blog, setBlog] = useState(state || {
        title: "",
        author: "",
        content: "",
    })

    const handleChange = (e)=> {
        const {name, value} = e.target 
        setBlog({
            ...blog,
            [name]: value
        })
    }

    const handleSubmit = async (e)=> {
       e.preventDefault()

       try{  
       const data =  await updateBlog(blog.id, blog)
       console.log(data)
       alert("Updated Successfully")
       navigate("/")

       }catch(error){
        console.log("error updating", error)
       }
    }

    return(
        <div className="card mt-4 p-4 shadow">
            <h2>Edit Blog</h2>
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="form-lable">Title: </label>
                <input 
                  type="text"
                  name="title"
                  className="form-control"
                  value={blog.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="author">Author: </label>
                <input 
                 type="text"
                 className="form-control"
                 name="author"
                 value={blog.author}
                  onChange={handleChange}
                 required
                />
                </div>
                <div className="mb-4">
                 <label htmlFor="content">Content: </label>
                 <textarea
                  name="content"
                  className="form-control"
                  rows="5"
                  value={blog.content}
                  onChange={handleChange}
                  required
                 >
                 </textarea>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default EditBlogForm