import {Avatar, Button, Card, CardHeader, Chip, Typography} from "@material-tailwind/react";
import {format} from "date-fns";
import {useRef} from "react";

const SongItem = ({song, calcDuration, hasPlaylist=null, handleSendSongToRoom=null, handleAddSongToPlaylist=null}) => {
    const ref = useRef(null);

    /**
     * Handles the click event for sending a song to the room or adding it to a playlist.
     * @param e {React.MouseEvent} e - The click event.
     * @return {void}
     */
    const handleClick = (e) => {
        e.preventDefault();

        if (!ref.current) return;

        if (typeof handleSendSongToRoom === "function") {
            handleSendSongToRoom(song.id)
        } else if (hasPlaylist && typeof handleAddSongToPlaylist === "function") {
            handleAddSongToPlaylist(song.id)
        }

        // Making the card disappear
        ref.current.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
        ref.current.style.opacity = "0";
        ref.current.style.transform = "translateY(-20px)";

        // Optionally, you can remove the element from the DOM after the animation
        setTimeout(() => {
            if (ref.current) {
                ref.current.style.display = "none";
            }
        }, 500);
    }

    return (
        <Card
            color="transparent"
            shadow={false}
            className="w-full max-w-[26rem] mb-3"
            ref={ref}
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
                    loading="lazy"
                />
                <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {song?.explicit && <Chip variant="ghost" color="red" value="E" />}
                            <Typography variant="h5" color="white">
                                {song?.name ?? song?.title ?? "Unknown Title"}
                            </Typography>
                        </div>

                        {(typeof handleSendSongToRoom === "function" || (hasPlaylist && typeof handleAddSongToPlaylist === "function")) ? (
                            <Button
                                size="sm"
                                color="green"
                                variant="gradient"
                                onClick={(e) => handleClick(e)}
                            >
                                {(typeof handleSendSongToRoom === "function") ? "Send to Room" : "Add To Playlist"}
                            </Button>
                        )  : null}

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