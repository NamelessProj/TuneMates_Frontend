import {Typography} from "@material-tailwind/react";

const Footer = () => {
    return (
        <footer>
            <Typography variant="small" className="text-center text-balance font-normal text-primary-white">
                &copy; {new Date().getFullYear()} TuneMates. All rights reserved.
            </Typography>
        </footer>
    );
};

export default Footer;