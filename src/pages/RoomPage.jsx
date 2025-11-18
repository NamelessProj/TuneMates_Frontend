import {useRoomStore} from "../stores/roomStore.js";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Typography} from "@material-tailwind/react";
import SearchSongs from "../components/SearchSongs.jsx";

const RoomPage = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const {room} = useRoomStore();

    useEffect(() => {
        if (!room || slug.length === 0) navigate("/");
    }, [room, slug, navigate]);

    return (
        <>
            {room ? (
                <main>
                    <div>
                        <Typography variant="lead" className="text-center text-balance">
                            Current Room
                        </Typography>
                        <Typography variant="h2" className="text-center text-balance">
                            {room.name}
                        </Typography>
                    </div>

                    <SearchSongs roomId={room.id} />
                </main>
            ) : null}
        </>
    );
};

export default RoomPage;