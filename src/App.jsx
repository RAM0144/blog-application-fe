import { BrowserRouter as  Router, Route, Routes, Navigate } from 'react-router-dom'
// import BlogList from './pages/BlogList'
// import Layout from './components/Layout'
// import BlogForm from './components/BlogForm'
// import Register from './pages/Register'
// import Login from './pages/Login'
import { Provider, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import store from './store/store.js'
import EditBlogForm from './components/EditBlogForm.jsx'
import { lazy, Suspense } from 'react'
import Loder from './components/Loder.jsx'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Layout = lazy(() => import( './components/Layout'))
const BlogList = lazy(() => import( './pages/BlogList'))
const BlogForm = lazy(() => import('./components/BlogForm'))

const ProtuctedRoute = ({ routeElement }) => {
  const { authenticated } = useSelector((state) => state.account)
  if(authenticated){
    return routeElement
  }else{
    return <Navigate to={"/login"} />
  }
} 

ProtuctedRoute.propTypes = {
  routeElement : PropTypes.node.isRequired
}

function App() {
  
  return (
   
     <Provider store={store}>
     <Router>
      <Suspense fallback={<Loder />}>
       <Layout>
      <Routes>
        <Route path='/' element={<ProtuctedRoute routeElement={<BlogList />} />} />
        <Route path='/blogForm' element={<ProtuctedRoute routeElement={<BlogForm />} />}/>
        <Route path='/edit/:id' element={<ProtuctedRoute routeElement={<EditBlogForm/>} />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
      </Routes>
     </Layout>
     </Suspense>
    </Router>
   </Provider>
   
  )
}

export default App
