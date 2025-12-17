// javascript
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
    const {addSongToPlaylist} = useSpotifyStore();
    const {userInfo, userToken} = useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!roomId || isNaN(roomId) || !userInfo || !userToken) navigate("/login");

        NProgress.start();
        getRoomById(roomId, userToken).then();
        NProgress.done();
    }, [roomId, userInfo, userToken, navigate, getRoomById]);

    useEffect(() => {
        if (songError) toast(songError);
    }, [songError]);

    useEffect(() => {
        if (!room || !roomId || isNaN(roomId) || !userInfo || !userToken) return;

        /**
         * Requests the pending songs for the room.
         * @returns {Promise<void>} A promise that resolves when the songs are fetched.
         */
        const requestPendingSongs = async () => {
            NProgress.start();
            const pendingStatusCode = 0;
            await getAllSongsWithStatus(Number.parseInt(roomId), userToken, pendingStatusCode);
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

    /**
     * Handles adding a song to the playlist.
     * @param songId {number} The ID of the song to add.
     * @returns {Promise<boolean>} A promise that resolves to true if the song was added successfully, false otherwise.
     */
    const handleAddSongToPlaylist = async (songId) => {
        if (!songId || isNaN(songId)) return false;

        NProgress.start();
        const res = await addSongToPlaylist(roomId, songId, userToken);
        const msg = res ? "Song added to playlist successfully!" : "Failed to add song to playlist. Please try again.";
        toast(msg, {type: res ? "success" : "error"});
        NProgress.done();
        return res;
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

                    {(songLoading && (pendingSongs?.length ?? 0) > 0) ? (
                        <div className="flex justify-center items-center my-6">
                            <DefaultSpinner />
                        </div>
                    ) : null}

                    <OwnerSongList
                        songs={pendingSongs}
                        hasPlaylist={room?.hasPlaylist ?? false}
                        handleAddSongToPlaylist={handleAddSongToPlaylist}
                    />
                </main>
            )}
        </>
    );
};

export default RequestedSongs;
