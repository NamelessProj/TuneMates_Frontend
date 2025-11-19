import DefaultSpinner from "./DefaultSpinner.jsx";
import {Alert, Button} from "@material-tailwind/react";
import SongItem from "./SongItem.jsx";
import parseMsToMinutesSeconds from "../utils/parseMsToMinutesSeconds.js";

const SongList = ({songs, hasMore, error, loading, handleLoadMore, handleSendSongToRoom}) => {
    return (
        <div className="flex flex-col items-center mt-6">
            {songs.length > 0 ? (
                <div>
                    {songs.map((song, i) => <SongItem
                        song={song}
                        calcDuration={parseMsToMinutesSeconds}
                        handleSendSongToRoom={handleSendSongToRoom}
                        key={i}
                    />)}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <Alert color="red">
                        {error ? error : "No songs found."}
                    </Alert>
                </div>
            )}

            <div className="flex flex-col items-center justify-center my-3">
                {loading ? <DefaultSpinner /> : (
                    <>
                        {(songs.length > 0 && hasMore) ? (
                            <div className="flex items-center">
                                <Button
                                    color="green"
                                    variant="gradient"
                                    className="mt-4"
                                    onClick={handleLoadMore}
                                >
                                    Load More
                                </Button>
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
};

export default SongList;