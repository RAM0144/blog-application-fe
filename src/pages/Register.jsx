import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { registerUser } from "../apis/fetch"
import { registerUser } from "../apis/axios"

const initialState = {
    name: "",
    mobile: "",
    email: "",
    password: ""
}

const Register = () => {
    
    const navigate = useNavigate()

    const[formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
      try {
        const res = await registerUser(formData) 
        alert(res.msg || "Registration successful!")
        console.log(formData)
        setFormData(initialState)
        navigate("/login")
      } catch (error) {
        alert(error.message)
      }
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="card p-5 shadow">
                <h3 className="text-center mb-4">Registration</h3>
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input placeholder="user name"
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            required />
                    </div>
                    <div className="mb-4">
                        <input placeholder="mobile number"
                            type="number"
                            className="form-control"
                            name="mobile"
                            onChange={handleChange}
                            value={formData.mobile}
                            required />
                    </div>
                    <div className="mb-4">
                        <input placeholder="email"
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            required />
                    </div>
                    <div className="mb-4">
                        <input placeholder="password"
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            required />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <p>Already have an account <Link to="/login">login here</Link></p>
            </div>

        </div>
    )
}

export default Register