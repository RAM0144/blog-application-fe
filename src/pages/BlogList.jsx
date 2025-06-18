import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getAllBlogs, deleteBlog } from "../apis/axios";
// const blogPosts = [
//     {
//       title: 'How to Learn React',
//       author: 'John Doe',
//       content: 'React is a powerful JavaScript library for building user interfaces...',
//     },
//     {
//       title: 'Understanding Redux Toolkit',
//       author: 'Jane Smith',
//       content: 'Redux Toolkit simplifies Redux state management with less boilerplate...',
//     },
//     {
//       title: 'Getting Started with MongoDB',
//       author: 'Alice Lee',
//       content: 'MongoDB is a NoSQL database that stores data in flexible JSON-like documents...',
//     },
//   ];


const BlogList = () => {
    const[blog, setBlog] = useState([])

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
       const blogData = await getAllBlogs()
        setBlog(blogData.blogs)
     } catch (error) {
       console.log("error fetching", error)
     }
    }

    useEffect(() => {
      loadBlog()
    },[])

    return(
       <div className="container mt-auto">
        <h2 className="mb-4">Blog Post</h2>
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