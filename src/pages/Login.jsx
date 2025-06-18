import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apis/axios";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const initialState = {
    email : "",
    password: "",
}

const Login = () => {

    const[loginData, setLoginData] = useState(initialState)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const {name, value} = e.target 
        setLoginData({
            ...loginData,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(loginData)
      try {
         const res = await loginUser(loginData)
        //   if(res.token){
        //     localStorage.setItem("token", res.token)
        // }
        const { msg, token } = res
        localStorage.setItem("authToken", res.token)
        alert(msg || "Login Successfully")
        // alert("Login Successfully")
        dispatch({
          type: "account_authenticated",
          userInfo: jwtDecode(token)
        })
        navigate("/")
      } catch (error) {
        console.log("error", error)
        alert("Invalid Details Please check")
      }
    }

    return(
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="card p-5 shadow" style={{width:"353px"}}>
                <h2 className="text-center mb-4">Login</h2>
                <form className="card-body" onSubmit={handleSubmit}>
                  <div className="mb-5">
                     <input className="form-control"
                      type="email"
                      placeholder="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleChange}
                      required
                     />
                  </div>
                   <div className="mb-4">
                     <input className="form-control"
                      type="password"
                      placeholder="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleChange}
                      required
                     />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary" type="submit">Submit</button>
                  </div>
                </form>
                <p className="mt-2">Don't have an account <Link to="/register">Register here</Link></p>
            </div>

        </div>
    )
}

export default Login;