import {Typography} from "@material-tailwind/react";
import RoomListEl from "./RoomListEl.jsx";

const RoomList = ({rooms}) => {
    return (
        <div>
            {(rooms && rooms.length) ? (
                rooms.map((room) => (
                    <RoomListEl room={room} key={room.id} />
                ))
            ) : (
                <Typography>
                    You don&#39;t have any rooms yet.
                </Typography>
            )}
        </div>
    );
};

export default RoomList;