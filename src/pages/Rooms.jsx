import {useRoomStore} from "../stores/roomStore.js";
import {useAuthStore} from "../stores/authStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {Alert} from "@material-tailwind/react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
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
                <div>
                    {roomError && (
                        <Alert color="red">
                            {roomError}
                        </Alert>
                    )}

                    <RoomList rooms={userRooms} />
                </div>
            )}
        </main>
    );
};

export default Rooms;