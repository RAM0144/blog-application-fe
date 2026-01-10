import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getAllBlogs, deleteBlog } from "../apis/axios";
import Loder from "../components/Loder";

const BlogList = () => {
    const [blog, setBlog] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")


    const removeBlog= async (blodId) => {
       try {
        await deleteBlog(blodId)
        setBlog(blog.filter((b) => b.id !== blodId))
        alert("Blog Deleted Successfully!")
       } catch (error) {
         console.log("error in delete api", error)
       }
    }

    const loadBlog = async() => {
     try {
       const blogData = await getAllBlogs(search)
        setBlog(blogData.blogs)
        setLoading(false)
     } catch (error) {
       console.log("error fetching", error)
     }
    }

    useEffect(() => {
      loadBlog()
    },[search])


    if(loading){
      return <Loder />
    }

    return(
       <div className="container mt-auto">
        <h2 className="mb-4">Blog Post</h2>
        <div  className="w-full max-w-md relative mb-3 text-center">
          <input 
           style={{backgroundColor:"rgb(245, 243, 243)"}}
           type="text"
           placeholder="search blogs by title..."
           value={search}
           onChange={(e)=> setSearch(e.target.value) }
           className="border p-2 w-full rounded "
          />
          
         </div> 

         {blog.length === 0 ? (
          <p>No blogs available.</p>
         ) : (
         blog.map((val) => (
            <BlogCard key={val.id || val.title} {...val}
            removeBlog={removeBlog}
            />
         ))
          )}
       </div>
    )
}

export default BlogList