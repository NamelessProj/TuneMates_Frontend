import {Alert, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import NProgress from "nprogress";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";

const SpotifyCallback = () => {
    const [currentStep, setCurrentStep] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const {userInfo, userToken, setCredentials} = useAuthStore();
    const {userError, userLoading, user, connectUserToSpotify} = useUserStore();

    const urlParams = new URLSearchParams(window.location.search);

    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    useEffect(() => {
        const run = async () => {
            if (error) {
                setErrorMessage(`Spotify authorization error: ${error}`);
                return;
            }

            if (!code || !state) {
                setErrorMessage("Missing code or state in the callback URL.");
                return;
            }

            try {
                setCurrentStep("Exchanging code for Spotify tokens...");
                NProgress.start();
                await connectUserToSpotify(code, state, userToken);
                setCurrentStep("Successfully connected to Spotify! Redirecting...");
            } catch (err) {
                setErrorMessage(`Failed to connect to Spotify: ${err.message}`);
            } finally {
                NProgress.done();
            }
        }

        run();
    }, [error, code, state, userToken, connectUserToSpotify]);

    useEffect(() => {
        if (userInfo.spotifyId !== "") navigate("/"); // Already connected

        if (user && !userError) {
            setCredentials(user);
            navigate("/");
        }
    }, [userInfo, user, userError, navigate, setCredentials]);

    return (
        <main className="flex flex-col justify-center items-center gap-6">
            {userLoading && <DefaultSpinner />}
            <div className="flex flex-col justify-center items-center gap-4">
                {errorMessage && <Alert color="red">{errorMessage}</Alert>}
                {currentStep && <Typography variant="lead" className="text-center text-balance">{currentStep}</Typography>}
            </div>
        </main>
    );
};

export default SpotifyCallback;