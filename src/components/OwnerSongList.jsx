import SongItem from "./SongItem.jsx";
import parseMsToMinutesSeconds from "../utils/parseMsToMinutesSeconds.js";
import {Typography} from "@material-tailwind/react";

const OwnerSongList = ({songs, handleAddSongToPlaylist}) => {
    return (
        <div className="flex flex-col justify-center items-center my-6">
            {songs.length > 0 ? (
                songs.map((song, i) => <SongItem
                    key={i}
                    song={song}
                    calcDuration={parseMsToMinutesSeconds}
                    handleAddSongToPlaylist={handleAddSongToPlaylist}
                />)
            ) : (
                <div>
                    <Typography variant="h3" className="text-center text-balance">
                        No songs found.
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default OwnerSongList;