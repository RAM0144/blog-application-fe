import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

const BlogCard = (props) => {

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/edit/${props.id}`, {
            state:{
                id: props.id,
                title: props.title,
                author: props.author,
                content: props.content
            }
        })
    }

    return(
        <div className="card mb-4 shadow-sm">
           <div className="card-body">
            <h3 className="card-title">{props.title}</h3>
            <h4 className="card-subtitle mb-2">By {props.author}</h4>
            <p className="card-text">{props.content}</p>
                <button className="btn btn-outline-primary btn-sm m-2" onClick={handleEdit}>Edit</button>

                 <button className="btn btn-outline-primary btn-sm m-2" onClick={()=> props.removeBlog(props.id)}>Delete</button>    
           </div>
        </div>
    )
}

BlogCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    content: PropTypes.string,
    removeBlog: PropTypes.func
}

export default BlogCard