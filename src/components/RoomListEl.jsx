import {Card, Typography} from "@material-tailwind/react";

const RoomListEl = ({room}) => {
    return (
        <Card>
            <div>
                <Typography variant="h2">
                    {room.name}
                </Typography>
                <Typography>
                    {room.createdAt}
                </Typography>
            </div>
        </Card>
    );
};

export default RoomListEl;