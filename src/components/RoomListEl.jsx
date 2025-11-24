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
        <Card color="blue-gray" className="w-full w-max-[20rem] mb-3">
            <div className="grid grid-cols-[1fr-auto] gap-x-3">
                <Typography variant="h2">
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
                        >
                            Edit Room
                        </Button>
                    </Link>

                    <Link className="flex-1" to={`/room/songs/${room.id}`}>
                        <Button
                            color="green"
                            variant="gradient"
                        >
                            See Requested Songs
                        </Button>
                    </Link>
                </div>
            </div>
            <Typography variant="small">
                {room.createdAt}
            </Typography>
        </Card>
    );
};

export default RoomListEl;