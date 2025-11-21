import DefaultSpinner from "./DefaultSpinner.jsx";
import {Alert, Typography} from "@material-tailwind/react";
import SelectPlaylist from "./SelectPlaylist.jsx";

const SelectPlaylistWrapper = ({userInfo, loading, error, playlists, value, setValue}) => {
    return (
        <>
            {userInfo.spotifyId !== "" ? (
                <>
                    {loading ? (
                        <div className="flex justify-center items-center my-3">
                            <DefaultSpinner />
                        </div>
                    ) : (
                        <>
                            {error ? (
                                <div className="flex justify-center items-center my-3">
                                    <Alert color="red">
                                        {error}
                                    </Alert>
                                </div>
                            ) : (
                                <SelectPlaylist
                                    playlists={playlists}
                                    value={value}
                                    setValue={setValue}
                                />
                            )}
                        </>
                    )}
                </>
            ) : (
                <div className="my-6">
                    <Typography className="text-center">
                        You&#39;re not connected to Spotify &#128557;
                    </Typography>
                    <Typography className="text-center">
                        But don&#39;t worry, you can always select a Playlist later by editing the room.
                    </Typography>
                </div>
            )}
        </>
    );
};

export default SelectPlaylistWrapper;