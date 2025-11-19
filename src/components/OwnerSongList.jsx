import SongItem from "./SongItem.jsx";
import parseMsToMinutesSeconds from "../utils/parseMsToMinutesSeconds.js";
import {Typography} from "@material-tailwind/react";

const OwnerSongList = ({songs}) => {
    return (
        <div className="my-6">
            {songs.length > 0 ? (
                songs.map((song, i) => <SongItem
                    key={i}
                    song={song}
                    calcDuration={parseMsToMinutesSeconds}
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