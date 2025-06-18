import { BrowserRouter as  Router, Route, Routes, Navigate } from 'react-router-dom'
import BlogList from './pages/BlogList'
import Layout from './components/Layout'
import BlogForm from './components/BlogForm'
import Register from './pages/Register'
import Login from './pages/Login'
import { Provider, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import store from './store/store'
import EditBlogForm from './components/EditBlogForm'

const ProtuctedRouter = ({ routeElement }) => {
  const { authenticated } = useSelector((state) => state.account)
  if(authenticated){
    return routeElement
  }else{
    return <Navigate to={"/login"} />
  }
} 

ProtuctedRouter.propTypes = {
  routeElement : PropTypes.node.isRequired
}

function App() {
  
  return (
   <Provider store={store}>
     <Router>
       <Layout>
      <Routes>
        <Route path='/' element={<ProtuctedRouter routeElement={<BlogList />} />} />
        <Route path='/blogForm' element={<ProtuctedRouter routeElement={<BlogForm />} />}/>
        <Route path='/edit/:id' element={<ProtuctedRouter routeElement={<EditBlogForm/>} />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
      </Routes>
     </Layout>
    </Router>
   </Provider>
  )
}

export default App
