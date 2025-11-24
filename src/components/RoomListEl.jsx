import {Button, Card, Typography} from "@material-tailwind/react";
import {useRoomStore} from "../stores/roomStore.js";
import NProgress from "nprogress";
import {Link} from "react-router-dom";

const RoomListEl = ({room, token}) => {
    const {roomLoading, deleteRoom} = useRoomStore();

    const handleDelete = async (e) => {
        e.preventDefault();
        if (roomLoading) return;
        NProgress.start();
        await deleteRoom(room.id, token);
        NProgress.done();
    }

    return (
        <Card color="blue-gray" className="p-3 mb-3">
            <div className="grid grid-cols-[1fr-auto] gap-x-3">
                <Typography variant="h2" className="text-center text-balance">
                    {room.name}
                </Typography>
                <div className="flex flex-col gap-2">
                    <Button
                        variant="gradient"
                        color="red"
                        disabled={roomLoading}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                    <Link className="flex-1" to={`/room/edit/${room.id}`}>
                        <Button
                            color="green"
                            variant="gradient"
                            className="w-full"
                        >
                            Edit Room
                        </Button>
                    </Link>

                    <Link className="flex-1" to={`/room/songs/${room.id}`}>
                        <Button
                            color="green"
                            variant="gradient"
                            className="w-full"
                        >
                            See Requested Songs
                        </Button>
                    </Link>
                </div>
            </div>
            <Typography variant="small">
                Room Code: {room.slug}
            </Typography>
        </Card>
    );
};

export default RoomListEl;