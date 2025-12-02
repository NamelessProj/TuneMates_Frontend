import {Badge, Button, Card, CardHeader, Typography} from "@material-tailwind/react";
import {useRoomStore} from "../stores/roomStore.js";
import NProgress from "nprogress";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import DefaultSpinner from "./DefaultSpinner.jsx";

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
        <Badge className="w-full max-w-[26rem]" color={room.isActive ? "green" : "red"}>
            <Card
                color="transparent"
                shadow={false}
                className="w-full bg-gray-500 bg-opacity-20"
            >
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex items-center gap-4 pt-0 pb-8"
                >
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                            <Typography variant="h3" color="white">
                                {room.name}
                            </Typography>

                            <div className="flex flex-col justify-center items-center gap-2">
                                <Link className=" w-full flex-1" to={`/room/edit/${room.id}`}>
                                    <Button
                                        color="green"
                                        variant="gradient"
                                        className="w-full"
                                    >
                                        Edit Room
                                    </Button>
                                </Link>

                                <Link className="w-full flex-1" to={`/room/songs/${room.id}`}>
                                    <Button
                                        color="blue"
                                        variant="gradient"
                                        className="w-full"
                                    >
                                        Requested Songs
                                    </Button>
                                </Link>

                                <Button
                                    variant="gradient"
                                    color="red"
                                    disabled={roomLoading}
                                    onClick={handleDelete}
                                    className="w-full"
                                >
                                    {roomLoading ? <DefaultSpinner color="red" /> : "Delete"}
                                </Button>
                            </div>
                        </div>
                        <Typography color="white">
                            Slug: {room.slug}
                        </Typography>
                        <Typography variant="small" color="white">
                            Updated: {room?.lastUpdate ? format(room.lastUpdate, "eeee dd MMM yyyy 'at' kk:mm") : "unknown"}
                        </Typography>
                    </div>
                </CardHeader>
            </Card>
        </Badge>
    );
};

export default RoomListEl;