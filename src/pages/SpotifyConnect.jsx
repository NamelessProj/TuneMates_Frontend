import {useSpotifyStore} from "../stores/spotifyStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {Alert} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import NProgress from "nprogress";

const SpotifyConnect = () => {
    const {userInfo} = useAuthStore();
    const {spotifyAuthUrl, spotifyLoading, spotifyError, fetchSpotifyAuthUrl} = useSpotifyStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || (userInfo && userInfo.spotifyId)) navigate("/");

        NProgress.start();
        fetchSpotifyAuthUrl();
        NProgress.done();
    }, [userInfo, navigate, fetchSpotifyAuthUrl]);

    useEffect(() => {
        if (spotifyAuthUrl) window.open(spotifyAuthUrl);
    }, [spotifyAuthUrl]);

    return (
        <main className="flex justify-center items-center">
            {spotifyLoading ? <DefaultSpinner /> : (
                <div>
                    {spotifyError && (
                        <Alert color="red">
                            {spotifyError}
                        </Alert>
                    )}
                </div>
            )}
        </main>
    );
};

export default SpotifyConnect;