import SearchSongsForm from "./SearchSongsForm.jsx";
import {useSpotifyStore} from "../stores/spotifyStore.js";
import {useEffect, useState} from "react";
import NProgress from "nprogress";

const SearchSongs = () => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);
    const [songs, setSongs] = useState([]);
    const [limit, setLimit] = useState(0);

    const {searchedSongs, spotifyLoading, spotifyError, searchSongs} = useSpotifyStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");

        const q = input.trim();
        if (q.length === 0) {
            setError("Please enter a search term.");
            return;
        }

        NProgress.start();
        await searchSongs(q, offset);
        NProgress.done();
    }

    const loadMoreSongs = async () => {
        if (spotifyLoading || !searchedSongs) return;

        const newOffset = searchedSongs.nextOffset;
        setOffset(newOffset);

        NProgress.start();
        await searchSongs(input.trim(), newOffset);
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
        </div>
    );
};

export default SearchSongs;