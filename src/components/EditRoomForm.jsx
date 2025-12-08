import {useEffect, useState} from "react";
import {useSpotifyStore} from "../stores/spotifyStore.js";
import {Alert, Button, Input, Switch} from "@material-tailwind/react";
import SelectPlaylistWrapper from "./SelectPlaylistWrapper.jsx";
import NProgress from "nprogress";

const EditRoomForm = ({room, userToken, userInfo, roomError, editRoom}) => {
    const [name, setName] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState("");

    const {spotifyError, spotifyLoading, userPlaylists, getUserPlaylist} = useSpotifyStore();

    useEffect(() => {
        if (room) {
            setName(room.name);
            setIsActive(room.isActive);
            setPlaylistId(room.playlistId || "");
        }
    }, [room]);

    useEffect(() => {
        if (userInfo && userToken && userInfo.spotifyId !== "") {
            getUserPlaylist(userToken);
        }
    }, [userInfo, userToken, getUserPlaylist]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const n = name.trim();
        if (n === "" || n.length < 3 || n.length > 50) {
            setError("The name must be between 3 and 50 characters.");
            return;
        }

        NProgress.start();
        await editRoom({
            name: n,
            isActive: isActive,
            spotifyPlaylistId: playlistId,
        }, room.id, userToken);
        NProgress.done();
    }

    return (
        <div className="w-full flex justify-center items-center">
            <form className="max-w-[26rem] flex flex-col gap-6 flex-1" onSubmit={handleSubmit}>
                {roomError ? (
                    <div className="flex justify-center items-center w-full">
                        <Alert color="red">
                            {roomError}
                        </Alert>
                    </div>
                ) : null}

                {error ? (
                    <div className="flex justify-center items-center w-full">
                        <Alert color="red">
                            {error}
                        </Alert>
                    </div>
                ) : null}

                <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    label="Room name"
                />

                <Switch
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                    label="Is Active"
                    color="green"
                />

                <SelectPlaylistWrapper
                    userInfo={userInfo}
                    value={playlistId}
                    error={spotifyError}
                    setValue={setPlaylistId}
                    playlists={userPlaylists}
                    loading={spotifyLoading}
                />

                <Button
                    color="green"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Edit The Room
                </Button>
            </form>
        </div>
    );
};

export default EditRoomForm;