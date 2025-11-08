import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import CreateRoomForm from "../components/CreateRoomForm.jsx";

const CreateRoom = () => {
    const {userInfo, userToken} = useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userToken) navigate("/login");
    }, [userInfo, userToken, navigate]);

    return (
        <main className="flex justify-center items-center">
            <CreateRoomForm token={userToken} />
        </main>
    );
};

export default CreateRoom;