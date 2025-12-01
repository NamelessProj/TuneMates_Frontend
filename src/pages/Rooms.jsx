import {useRoomStore} from "../stores/roomStore.js";
import {useAuthStore} from "../stores/authStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {Alert, Button} from "@material-tailwind/react";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import RoomList from "../components/RoomList.jsx";

const Rooms = () => {
    const {userInfo, userToken} = useAuthStore();
    const {userRooms, roomLoading, roomError, getUserRooms} = useRoomStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userToken) navigate("/");

        getUserRooms(userToken);
    }, [userInfo, userToken, navigate, getUserRooms]);

    return (
        <main className="flex justify-center items-center">
            {roomLoading ? <DefaultSpinner/> : (
                <div className=" w-full flex flex-col justify-center items-center gap-6">
                    {roomError && (
                        <Alert color="red">
                            {roomError}
                        </Alert>
                    )}

                    {(!userRooms || userRooms.length < 10) && (
                        <Link to="/room/create">
                            <Button variant="gradient" color="green">
                                Create New Room
                            </Button>
                        </Link>
                    )}

                    <RoomList rooms={userRooms} token={userToken} />
                </div>
            )}
        </main>
    );
};

export default Rooms;