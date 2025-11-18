import SearchSongsForm from "./SearchSongsForm.jsx";
import {useState} from "react";
import NProgress from "nprogress";
import axios from "axios";
import SongList from "./SongList.jsx";
import {useSongStore} from "../stores/songStore.js";

const SearchSongs = ({roomId}) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);

    const [loading, setLoading] = useState(false);
    const [songsError, setSongsError] = useState("");
    const [songs, setSongs] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const {songError, sendSongToRoom} = useSongStore();

    const baseUrl = `${import.meta.env.VITE_API_URL}/spotify`;

    const searchSongs = async (q) => {
        setSongsError("");
        const market = 'US';
        let results;

        try {
            NProgress.start();
            const res = await axios.get(`${baseUrl}/search/${q}/${offset}/${market}`, {
                withCredentials: true,
                method: "GET"
            });
            results = res.data;
        } catch (err) {
            setSongsError(err?.response?.data?.message || err?.message || "Failed to search songs on Spotify");
        } finally {
            NProgress.done();
        }

        return results;
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");

        const q = input.trim();
        if (q.length === 0) {
            setError("Please enter a search term.");
            return;
        }

        setLoading(true);

        const songs = await searchSongs(q);
        setSongs(songs.items || []);
        setHasMore(songs.hasMore || false);
        setOffset(songs.nextOffset || 0);

        setLoading(false);
    }

    const handleLoadMore = async (e) => {
        e.preventDefault();
        setSongsError("");

        if (!hasMore) {
            setSongsError("No more songs to load.");
            return;
        }

        const q = input.trim();
        if (q.length === 0) {
            setSongsError("Please enter a search term.");
            return;
        }

        setLoading(true);

        const moreSongs = await searchSongs(q);
        setSongs(prevSongs => [...prevSongs, ...(moreSongs.items || [])]);
        setHasMore(moreSongs.hasMore || false);
        setOffset(moreSongs.nextOffset || 0);

        setLoading(false);
    }

    const handleSendSongToRoom = async (e, songId) => {
        e.preventDefault();

        NProgress.start();
        await sendSongToRoom(songId, roomId);
        NProgress.done();
    }

    return (
        <div>
            <SearchSongsForm
                input={input}
                setInput={setInput}
                error={error}
                handleSearch={handleSearch}
            />

            <SongList
                songs={songs}
                loading={loading}
                error={songsError}
                handleLoadMore={handleLoadMore}
                hasMore={hasMore}
                songError={songError}
                handleSendSongToRoom={handleSendSongToRoom}
            />
        </div>
    );
};

export default SearchSongs;