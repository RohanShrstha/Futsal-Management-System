import { Outlet } from "react-router-dom"

const style = {
    width: '100%',
    height: '100vh',
}

const Layout = () => {
    return (
        <div className="App" style={style}>
            <Outlet />
        </div>
    )
}

export default Layout