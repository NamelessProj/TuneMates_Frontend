import {useRoomStore} from "../stores/roomStore.js";
import {useAuthStore} from "../stores/authStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import EditRoomForm from "../components/EditRoomForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import NProgress from "nprogress";

const EditRoom = () => {
    const {userInfo, userToken} = useAuthStore();
    const {room, roomLoading, roomError, getRoomById, editRoom} = useRoomStore();
    const {roomId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken || !userInfo) navigate("/login");
    }, [userToken, userInfo, navigate]);

    useEffect(() => {
        if (userToken) {
            NProgress.start();
            getRoomById(roomId, userToken);
            NProgress.done();
        }
    }, [userToken, roomId, getRoomById]);

    return (
        <main className="flex flex-col justify-center">
            {roomLoading ? <DefaultSpinner /> : <EditRoomForm
                room={room}
                userToken={userToken}
                userInfo={userInfo}
                roomError={roomError}
                editRoom={editRoom}
            />}
        </main>
    );
};

export default EditRoom;