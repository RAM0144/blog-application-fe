import PropTypes from "prop-types"
import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children}) => {

    return(
    
        <div className="d-flex flex-column min-vh-100"> 
              <Header />
          <main className="flex-grow-1 container py-4">
            {children}
            </main>
          <Footer />
        </div>
        
    )
}

Layout.propTypes = {
    children: PropTypes.element
}

export default Layout