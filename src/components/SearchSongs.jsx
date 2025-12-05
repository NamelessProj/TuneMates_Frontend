import SearchSongsForm from "./SearchSongsForm.jsx";
import {useEffect, useState} from "react";
import NProgress from "nprogress";
import axios from "axios";
import SongList from "./SongList.jsx";
import {useSongStore} from "../stores/songStore.js";
import {toast} from "react-toastify";

const SearchSongs = ({roomId}) => {
    const [previousSearch, setPreviousSearch] = useState("");
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);

    const [loading, setLoading] = useState(false);
    const [songsError, setSongsError] = useState("");
    const [songs, setSongs] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const {songError, songLoading, sendSongToRoom} = useSongStore();

    useEffect(() => {
        if (songError && !songLoading) toast(songError, {type: "error"});
    }, [songError, songLoading]);

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
        if (q === "") {
            setError("Please enter a search term.");
            return;
        }

        if (q === previousSearch) {
            setError("You have already searched for this term.");
            return;
        }

        setLoading(true);

        const songs = await searchSongs(q);
        setSongs(songs.items || []);
        setHasMore(songs.hasNext || false);
        setOffset(songs.nextOffset || 0);
        setPreviousSearch(q);

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
        if (q === "") {
            setSongsError("Please enter a search term.");
            return;
        }

        setLoading(true);

        const moreSongs = await searchSongs(q);
        setSongs(prevSongs => [...prevSongs, ...(moreSongs.items || [])]);
        setHasMore(moreSongs.hasNext || false);
        setOffset(moreSongs.nextOffset || 0);

        setLoading(false);
    }

    const handleSendSongToRoom = async (e, songId) => {
        e.preventDefault();

        NProgress.start();
        await sendSongToRoom(roomId, songId);
        toast("Requested song successfully!", {type: "success"});
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
                handleSendSongToRoom={handleSendSongToRoom}
            />
        </div>
    );
};

export default SearchSongs;