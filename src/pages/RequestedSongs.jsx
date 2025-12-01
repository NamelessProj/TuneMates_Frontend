import {useSongStore} from "../stores/songStore.js";
import NProgress from "nprogress";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthStore} from "../stores/authStore.js";
import {useEffect} from "react";
import {Typography} from "@material-tailwind/react";
import {useRoomStore} from "../stores/roomStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import OwnerSongList from "../components/OwnerSongList.jsx";
import {toast} from "react-toastify";
import {useSpotifyStore} from "../stores/spotifyStore.js";

const RequestedSongs = () => {
    const {roomId} = useParams();
    const {pendingSongs, songError, songLoading, getAllSongsWithStatus} = useSongStore();
    const {room, roomLoading, getRoomById} = useRoomStore();
    const {spotifyError, addSongToPlaylist} = useSpotifyStore();
    const {userInfo, userToken} = useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!roomId || isNaN(roomId) || !userInfo || !userToken) navigate("/login");

        NProgress.start();
        getRoomById(roomId);
        NProgress.done();
    }, [roomId, userInfo, userToken, navigate, getRoomById]);

    useEffect(() => {
        if (songError) toast(songError);
    }, [songError]);

    useEffect(() => {
        if (!room || !roomId || isNaN(roomId) || !userInfo || !userToken) return;

        const requestPendingSongs = async () => {
            NProgress.start();
            console.log("Fetching pending songs for room ID:", roomId);
            const pendingStatusCode = 0;
            await getAllSongsWithStatus(roomId, userToken, pendingStatusCode);
            NProgress.done();
        }

        // Initial fetch
        requestPendingSongs().then();

        const interval = 15_000; // 15 seconds
        const intervalFunc = setInterval(() => {
            requestPendingSongs().then();
        }, interval);

        return () => {
            clearInterval(intervalFunc);
        }
    }, [room, roomId, userToken, userInfo, getAllSongsWithStatus]);

    useEffect(() => {
        if (spotifyError) toast(spotifyError, {type: "error"});
    }, [spotifyError]);

    const handleAddSongToPlaylist = async (e, songId) => {
        e.preventDefault();
        if (!songId || isNaN(songId)) return;

        NProgress.start();
        await addSongToPlaylist(roomId, songId, userToken);
        NProgress.done();
    }

    return (
        <>
            {roomLoading ? (
                <main className="flex justify-center items-center">
                    <DefaultSpinner />
                </main>
            ) : (
                <main>
                    <Typography variant="lead" className="text-center text-balance">
                        Pending songs for the room
                    </Typography>
                    <Typography variant="h2" className="text-center text-balance">
                        {room?.name || "Unknown Room"}
                    </Typography>

                    {(songLoading && pendingSongs.length > 0) ? (
                        <div className="flex justify-center items-center my-6">
                            <DefaultSpinner />
                        </div>
                    ) : null}

                    <OwnerSongList
                        songs={pendingSongs}
                        handleAddSongToPlaylist={handleAddSongToPlaylist}
                    />
                </main>
            )}
        </>
    );
};

export default RequestedSongs;