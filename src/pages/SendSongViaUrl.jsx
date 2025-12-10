import {useEffect, useState} from "react";
import {useSongStore} from "../stores/songStore.js";
import {useNavigate, useParams} from "react-router-dom";
import {useRoomStore} from "../stores/roomStore.js";
import NProgress from "nprogress";
import {Alert, Button, Input, Typography} from "@material-tailwind/react";

const SendSongViaUrl = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const {songLoading, songError, sendSongToRoom} = useSongStore();
    const {slug} = useParams();
    const {room} = useRoomStore();

    useEffect(() => {
        if (!room || slug.length === 0) navigate("/");
    }, [room, slug, navigate]);

    /**
     * Handles the form submission to send a song to the room.
     * @param e {React.FormEvent} e - The form submission event.
     * @returns {Promise<void>} A promise that resolves when the song is sent.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const uri = input.trim();
        if (uri === "") {
            setError("Please enter a song URL or URI.");
            return;
        }

        NProgress.start();
        await sendSongToRoom(room.id, null, uri);
        NProgress.done();
    }

    return (
        <>
            {room ? (
                <main className="flex flex-col justify-center items-center gap-6">
                    <div>
                        <Typography variant="lead" className="text-center text-balance">
                            Current Room
                        </Typography>
                        <Typography variant="h2" className="text-center text-balance">
                            {room.name}
                        </Typography>
                    </div>

                    {songError && <Alert color="red">{songError}</Alert>}
                    {error && <Alert color="red">{error}</Alert>}

                    <form className="grid grid-cols-[1fr_auto] w-full max-w-[36rem]" onSubmit={handleSubmit}>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            label="Song URL or URI"
                            disabled={songLoading}
                            className="rounded-br-none rounded-tr-none"
                        />
                        <Button
                            type="submit"
                            color="green"
                            variant="gradient"
                            disabled={songLoading}
                            onClick={handleSubmit}
                            className="rounded-bl-none rounded-tl-none"
                        >
                            {songLoading ? "Loading" : "Send Song"}
                        </Button>
                    </form>
                </main>
            ) : null}
        </>
    );
};

export default SendSongViaUrl;