import {Avatar, Option, Select} from "@material-tailwind/react";

const SelectPlaylist = ({playlists, value, setValue}) => {
    return (
        <div>
            <Select
                size="lg"
                value={value}
                onChange={(val) => setValue(val)}
                label="Select Playlist"
            >
                {(playlists || []).map((playlist, i) => (
                    <Option
                        value={playlist?.id || ""}
                        key={i}
                        className="flex items-center gap-2"
                    >
                        <Avatar
                            src={playlist?.images[0]?.url || "/default_song.png"}
                            alt={playlist?.name || "Playlist Image"}
                            variant="rounded"
                            className="h-6 w-6 object-cover"
                        />
                        {playlist?.name || "Unnamed Playlist"}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default SelectPlaylist;