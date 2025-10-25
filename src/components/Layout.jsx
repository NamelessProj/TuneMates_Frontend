import {ToastContainer} from "react-toastify";
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";

const Layout = () => {
    return (
        <div className="grid grid-rows-app min-h-[100svh] bg-primary-black text-primary-white">
            <ToastContainer theme="dark" />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;