import { useState } from "react"
// import { createBlog } from "../apis/fetch"
import { createBlog } from "../apis/axios"
import { useNavigate } from "react-router-dom"

const intialState = {
    title : "",
    author: "",
    content: "",
}

const BlogForm = () => {
     
    const[blog, setBlog] = useState(intialState)
    const navigate = useNavigate()

    const handleChange = (e) => {
      const {name, value} = e.target
      setBlog({
        ...blog,
      [name] : value
      })
    }

    // const createNewBlog = async() => {
    //     const data = await createBlog(blog)
    //     setBlog([...blog, data])

    // }

     const handleSubmit = async (e) => {
        e.preventDefault()
       console.log(blog)
       
       const blogData = {
         ...blog
       }
       await createBlog(blogData)

       setBlog(intialState)
       navigate("/")
     }


    return(
        <div>
           <h2>Create Blog</h2>
          <div className="card mt-4 p-4 shadow-sm" style={{width: "700px", margin: "auto"}}>
            <form className="card-body" onSubmit={handleSubmit} >
               <div className="mb-4">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" placeholder="title"
                 className="form-control"
                  value={blog.title}
                  name="title"
                  onChange={handleChange}
                  required
                />
               </div>

                 <div className="mb-3">
                <label htmlFor="author" className="form-label">Author:</label>
                <input type="text" placeholder="author"
                 className="form-control"
                 value={blog.author}
                 name="author"
                  onChange={handleChange}
                  required
                />
               </div>

                 <div className="mb-3">
                <label htmlFor="content" className="form-label">Content:</label>
                 <textarea className="form-control" 
                 rows="5"
                  value={blog.content}
                  name="content"
                  onChange={handleChange}
                  required
                 ></textarea>
               </div>
               <div className="text-center">
                <button className="btn btn-primary">Publish</button>
               </div>
            </form>
          </div>
        </div>
    )
}

export default BlogForm