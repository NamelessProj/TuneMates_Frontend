import {Avatar, Button, Card, CardHeader, Typography} from "@material-tailwind/react";

const SongItem = ({song, calcDuration, handleSendSongToRoom=null, handleAddSongToPlaylist=null}) => {
    return (
        <Card
            color="transparent"
            shadow={false}
            className="w-full max-w-[26rem]"
        >
            <CardHeader
                color="blue-gray"
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
                        <Typography variant="h5" color="white">
                            {song.name}
                        </Typography>

                        {typeof handleSendSongToRoom === "function" && (
                            <Button
                                size="sm"
                                color="green"
                                variant="gradient"
                                onClick={(e) => handleSendSongToRoom(e, song.uri)}
                            >
                                Send Request
                            </Button>
                        )}

                        {typeof handleAddSongToPlaylist === "function" && (
                            <Button
                                size="sm"
                                color="green"
                                variant="gradient"
                                onClick={(e) => handleAddSongToPlaylist(e, song.id)}
                            >
                                Add To Playlist
                            </Button>
                        )}

                    </div>
                    <Typography color="white">
                        {song.artist}
                    </Typography>
                    <Typography variant="small" color="white">
                        {calcDuration(song.durationMs)}
                    </Typography>
                </div>
            </CardHeader>
        </Card>
    );
};

export default SongItem;