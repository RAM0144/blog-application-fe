
const Footer = () => {

    return(
       <footer className="text-light text-center py-3  mt-auto" style={{ backgroundColor: "#4B0082" }}>
        <p className="mb-1">&copy; {new Date().getFullYear()} Blog </p>
       </footer>
    )
}

export default Footer