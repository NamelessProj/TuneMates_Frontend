import {useRoomStore} from "../stores/roomStore.js";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Button, Card, CardBody, Typography} from "@material-tailwind/react";
import SearchSongs from "../components/SearchSongs.jsx";

const RoomPage = () => {
    const navigate = useNavigate();
    const {slug} = useParams();
    const {currentRoom, deleteCurrentRoomFromCookies} = useRoomStore();

    useEffect(() => {
        if (!currentRoom || slug.length === 0) navigate("/");
    }, [currentRoom, slug, navigate]);

    /**
     * Handles the action of quitting the current room.
     * @param e {React.FormEvent} e - The form submission event.
     * @returns {void}
     */
    const handleQuitRoom = (e) => {
        e.preventDefault();
        deleteCurrentRoomFromCookies();
    }

    return (
        <>
            {currentRoom ? (
                <main>
                    <div>
                        <Card shadow={false} className="w-full max-w-[36rem] mx-auto mb-6" color="gray">
                            <CardBody className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] items-center justify-between py-2 px-6">
                                <Typography color="red" variant="lead">
                                    Quit This Room
                                </Typography>
                                <Button
                                    color="red"
                                    variant="text"
                                    className="fill-red-300 hover:fill-red-500"
                                    onClick={handleQuitRoom}
                                >
                                    <p className="sr-only">Click here to quit the room</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 640">
                                        <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/>
                                    </svg>
                                </Button>
                            </CardBody>
                        </Card>

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