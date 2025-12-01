import {Typography} from "@material-tailwind/react";
import RoomListEl from "./RoomListEl.jsx";

const RoomList = ({rooms, token}) => {
    return (
        <div className="w-full flex justify-center">
            {(rooms && rooms.length) ? (
                rooms.map((room) => (
                    <RoomListEl room={room} token={token} key={room.id} />
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