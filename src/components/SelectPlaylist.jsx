import {Avatar, Option, Select} from "@material-tailwind/react";

const SelectPlaylist = ({playlists, value, setValue}) => {
    return (
        <div>
            <Select
                size="lg"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="Select Playlist"
            >
                {(playlists || []).map((playlist, i) => (
                    <Option
                        value={playlist?.id || ""}
                        key={i}
                        className="flex items-center gap-2"
                    >
                        <Avatar
                            src={playlist?.imageUrl || "/default_song.png"}
                            alt={playlist?.name || "Playlist Image"}
                            variant="rounded"
                            className="h-5 w-5 object-cover"
                        />
                        {playlist?.name || "Unnamed Playlist"} {playlist?.id || "ID"}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default SelectPlaylist;