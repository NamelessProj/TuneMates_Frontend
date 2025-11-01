import {Link} from "react-router-dom";
import {Button, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import NProgress from "nprogress";

const Header = () => {
    const {userInfo, logout} = useAuthStore();

    const handleLogout = (e) => {
        e.preventDefault();

        try{
            NProgress.start();
            logout();
        }catch(err){
            console.error("Logout failed:", err);
        }finally{
            NProgress.done();
        }
    }

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
                                <Link to="profile" className="flex-grow">
                                    Profile
                                </Link>
                            </MenuItem>
                            <MenuItem className="flex">
                                <Link to="rooms" className="flex-grow">
                                    Rooms
                                </Link>
                            </MenuItem>
                            <MenuItem className="flex">
                                <Button className="flex-grow" color="red" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </MenuItem>
                            {userInfo.spotifyId !== "" && (
                                <MenuItem>
                                    <Link to="/connect/spotify">
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
                    <Button size="sm" color="green" className="text-primary-black">
                        <Link to="login" className="not-green">
                            Login / Register
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;