import DefaultSpinner from "./DefaultSpinner.jsx";
import {Alert, Button} from "@material-tailwind/react";
import SongItem from "./SongItem.jsx";

const SongList = ({songs, hasMore, error, handleLoadMore, loading}) => {
    const durationMsToMinutesSeconds = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div className="flex items-center mt-6">
            {loading ? <DefaultSpinner /> : (
                <>
                    {songs.length > 0 ? (
                        <div>
                            {songs.map((song, i) => <SongItem song={song} calcDuration={durationMsToMinutesSeconds} key={i} />)}

                            {hasMore ? (
                                <div className="flex items-center my-6">
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
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <Alert color="red">
                                {error ? error : "No songs found."}
                            </Alert>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SongList;