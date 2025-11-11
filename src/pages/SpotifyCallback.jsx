import {Alert, Typography} from "@material-tailwind/react";
import {useSpotifyStore} from "../stores/spotifyStore.js";
import {useEffect, useRef, useState} from "react";
import NProgress from "nprogress";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";

const SpotifyCallback = () => {
    const [currentStep, setCurrentStep] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const didExchangeRef = useRef(false);
    const navigate = useNavigate();

    const {userInfo, userToken} = useAuthStore();
    const {spotifyLoading, spotifyError, spotifyAccessToken, spotifyRefreshToken, spotifyTokenExpiresIn, fetchAccessToken} = useSpotifyStore();
    const {userError, userLoading, editUser} = useUserStore();

    const urlParams = new URLSearchParams(window.location.search);

    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    useEffect(() => {
        if (!userInfo || !userToken) {
            navigate("/login");
            return;
        }

        if (error) return;

        if (didExchangeRef.current) return;
        didExchangeRef.current = true;

        if (code && state) {
            NProgress.start();
            setCurrentStep("Fetching Spotify access token...");
            fetchAccessToken(code); // TODO: Sending that to my backend to get the access token securely
            setCurrentStep("");
        }
    }, [userInfo, userToken, error, code, state, navigate, fetchAccessToken]);

    useEffect(() => {
        if (spotifyLoading || error) return;

        if (!spotifyAccessToken || !spotifyRefreshToken || !userToken) {
            setErrorMessage("Failed to retrieve Spotify tokens or user token.");
            return;
        }

        setCurrentStep("Save Spotify access token...");
        editUser({
            token: spotifyAccessToken,
            refreshToken: spotifyRefreshToken,
            tokenExpiresIn: spotifyTokenExpiresIn
        }, userToken);
        setCurrentStep("");
        NProgress.done();
    }, [spotifyLoading, error, spotifyAccessToken, spotifyRefreshToken, userToken, spotifyTokenExpiresIn, editUser]);

    return (
        <main className="flex flex-col justify-center items-center gap-6">

            {error && <Alert color="red">Spotify Authentication Error: {error}</Alert>}
            {spotifyError && <Alert color="red">{spotifyError}</Alert>}
            {userError && <Alert color="red">{userError}</Alert>}
            {errorMessage && <Alert color="red">{errorMessage}</Alert>}

            {(spotifyLoading || userLoading) ? (
                <div className="flex flex-col justify-center items-center gap-4">
                    <DefaultSpinner />
                    <Typography variant="lead" className="text-center text-balance">
                        {currentStep}
                    </Typography>
                </div>
            ) : null}
        </main>
    );
};

export default SpotifyCallback;