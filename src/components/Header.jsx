import {Button, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import NProgress from "nprogress";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Header = () => {
    const {userInfo, userToken, userTokenExpiresAt, logout} = useAuthStore();

    /**
     * Handles the logout process when the user clicks the logout button.
     * @param e {Event} e - The click event.
     * @return {void}
     */
    const handleLogout = (e) => {
        e.preventDefault();

        try{
            NProgress.start();
            logout();
        }catch(err){
            toast("Failed to logout: " + err.message, {type: "error"});
        }finally{
            NProgress.done();
        }
    }

    // Auto logout if token is expired
    useEffect(() => {
        if (userInfo) {
            if (!userToken || (userTokenExpiresAt && Date.now() >= userTokenExpiresAt)) {
                logout();
            }
        }

    }, [userInfo, userToken, userTokenExpiresAt, logout]);

    return (
        <header className="flex flex-col-reverse gap-2 justify-center items-center my-2 relative">
            <Link to="/">
                <Typography variant="h1" className="text-primary-green">
                    TuneMates
                </Typography>
            </Link>

            <div className="md:absolute top-1/2 right-2 md:transform md:-translate-y-1/2">
                {userInfo ? (
                    <Menu>
                        <MenuHandler>
                            <Button size="sm" color="green" className="text-primary-black">
                                {userInfo.username}
                            </Button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="flex">
                                <Link to="profile" className="flex-grow !text-black">
                                    Profile
                                </Link>
                            </MenuItem>
                            <MenuItem className="flex">
                                <Link to="rooms" className="flex-grow !text-black">
                                    Rooms
                                </Link>
                            </MenuItem>
                            <MenuItem className="flex">
                                <Button className="flex-grow" color="red" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </MenuItem>
                            {userInfo.spotifyId ? null : (
                                <MenuItem>
                                    <Link to="spotify/connect">
                                        <Button
                                            variant="gradient"
                                            color="green"
                                        >
                                            Connect To Spotify
                                        </Button>
                                    </Link>
                                </MenuItem>
                            )}
                        </MenuList>
                    </Menu>
                ) : (
                    <Link to="login" className="not-green">
                        <Button size="sm" color="green" className="text-primary-black">
                            Login / Register
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;