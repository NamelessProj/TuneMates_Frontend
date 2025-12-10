import {useRoomStore} from "../stores/roomStore.js";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Typography} from "@material-tailwind/react";
import SearchSongs from "../components/SearchSongs.jsx";

const RoomPage = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const {currentRoom} = useRoomStore();

    useEffect(() => {
        if (!currentRoom || slug.length === 0) navigate("/");
    }, [currentRoom, slug, navigate]);

    return (
        <>
            {room ? (
                <main>
                    <div>
                        <Typography variant="lead" className="text-center text-balance">
                            Current Room
                        </Typography>
                        <Typography variant="h2" className="text-center text-balance">
                            {currentRoom.name}
                        </Typography>
                    </div>

                    <SearchSongs roomId={currentRoom.id} />
                </main>
            ) : null}
        </>
    );
};

export default RoomPage;