import {Avatar, Button, Card, CardHeader, Typography} from "@material-tailwind/react";

const SongItem = ({song, calcDuration, handleSendSongToRoom}) => {
    return (
        <Card
            color="transparent"
            shadow={false}
            className="w-full max-w-[26rem]"
        >
            <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-0 pb-8"
            >
                <Avatar
                    size="lg"
                    variant="rounded"
                    src={song.albumImageUrl}
                    alt={song.name}
                />
                <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray">
                            {song.name}
                        </Typography>
                        <Button
                            size="sm"
                            color="green"
                            variant="gradient"
                            onClick={(e) => handleSendSongToRoom(e, song.uri)}
                        >
                            Send Request
                        </Button>
                    </div>
                    <Typography color="blue-gray">
                        {song.artist.join(", ")}
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                        {calcDuration(song.durationMs)}
                    </Typography>
                </div>
            </CardHeader>
        </Card>
    );
};

export default SongItem;