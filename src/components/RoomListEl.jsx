import {Button, Card, Typography} from "@material-tailwind/react";
import {useRoomStore} from "../stores/roomStore.js";
import NProgress from "nprogress";

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
        <Card>
            <div className="grid grid-cols-[1fr-auto] gap-x-3">
                <Typography variant="h2">
                    {room.name}
                </Typography>
                <div>
                    <Button
                        variant="gradient"
                        color="red"
                        disabled={roomLoading}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <Typography variant="small">
                {room.createdAt}
            </Typography>
        </Card>
    );
};

export default RoomListEl;