import {Avatar, Button, Card, CardHeader, Chip, Typography} from "@material-tailwind/react";
import {format} from "date-fns";

const SongItem = ({song, calcDuration, handleSendSongToRoom=null, handleAddSongToPlaylist=null}) => {
    return (
        <Card
            color="transparent"
            shadow={false}
            className="w-full max-w-[26rem] mb-3"
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
                    src={song?.albumImageUrl ?? song?.albumArtUrl ?? "/default_song.png"}
                    alt={song?.name ?? song?.title ?? "Unknown Title"}
                />
                <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {song?.explicit && <Chip variant="ghost" value="E" />}
                            <Typography variant="h5" color="white">
                                {song?.name ?? song?.title ?? "Unknown Title"}
                            </Typography>
                        </div>

                        {typeof handleSendSongToRoom === "function" && (
                            <Button
                                size="sm"
                                color="green"
                                variant="gradient"
                                onClick={(e) => handleSendSongToRoom(e, song.id)}
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
                        {song?.artist || "Unknown Artist"}
                    </Typography>
                    <Typography variant="small" color="white">
                        {calcDuration(song?.durationMs || 0)}
                    </Typography>
                    {song?.addedAt ? (
                        <Typography variant="small" color="white">
                            Requested: {format(song.addedAt, "eeee dd MMM yyyy 'at' kk:mm")}
                        </Typography>
                    ) : null}
                </div>
            </CardHeader>
        </Card>
    );
};

export default SongItem;