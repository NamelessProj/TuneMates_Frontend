import {useRoomStore} from "../stores/roomStore.js";
import DefaultSpinner from "./DefaultSpinner.jsx";
import {Alert, Button, Card, CardBody, CardHeader, Input, Switch, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import PasswordInput from "./PasswordInput.jsx";
import NProgress from "nprogress";
import {useNavigate} from "react-router-dom";
import {useSpotifyStore} from "../stores/spotifyStore.js";
import {useAuthStore} from "../stores/authStore.js";
import SelectPlaylistWrapper from "./SelectPlaylistWrapper.jsx";

const CreateRoomForm = ({token}) => {
    const [name, setName] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {userInfo, userToken} = useAuthStore();
    const {room, roomError, roomLoading, createRoom} = useRoomStore();
    const {spotifyError, spotifyLoading, userPlaylists, getUserPlaylist} = useSpotifyStore();

    useEffect(() => {
        if (room && !roomError) navigate("/rooms");
    }, [room, roomError, navigate]);

    useEffect(() => {
        if (!userInfo || !userToken) navigate("/login");

        if (userInfo.spotifyId) {
            getUserPlaylist(userToken);
        }
    }, [userInfo, userToken, navigate, getUserPlaylist]);

    /**
     * Handles the form submission to create a new room.
     * @param e {React.FormEvent} e - The form submission event.
     * @returns {Promise<void>} A promise that resolves when the room creation is complete.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim().length < 3 || name.trim().length > 50) {
            setError("Name is required and must be between 3 and 50 characters");
            return;
        }

        if (password.trim().length === 0) {
            setError("Password is required");
            return;
        }

        if (password !== passwordConfirm) {
            setError("Password and Confirm Password do not match");
            return;
        }

        NProgress.start();
        await createRoom({
            name: name.trim(),
            password,
            passwordConfirm,
            isActive
        }, token);
        NProgress.done();
    }

    return (
        <div className="w-full">
            {roomLoading ? <DefaultSpinner /> : (
                <Card color="gray" className="!w-full max-w-md mx-auto">
                    <CardHeader variant="gradient" color="green" className="flex flex-col gap-4 items-center py-3">
                        <Typography variant="h2" className="text-center text-balance">
                            Creating Room...
                        </Typography>
                        {name && (
                            <Typography variant="lead" className="text-center text-balance">
                                {name}
                            </Typography>
                        )}
                    </CardHeader>
                    <CardBody>
                        {roomError && (
                            <Alert color="red" className="mb-6">
                                {roomError}
                            </Alert>
                        )}

                        {error && (
                            <Alert color="red" className="mb-6">
                                {error}
                            </Alert>
                        )}

                        <form className="flex flex-col gap-6 flex-1" onSubmit={handleSubmit}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label="Room Name"
                                color="white"
                                required
                            />
                            <PasswordInput
                                password={password}
                                setPassword={setPassword}
                                label="Room Password"
                                color="white"
                            />
                            <PasswordInput
                                password={passwordConfirm}
                                setPassword={setPasswordConfirm}
                                label="Confirm Password"
                                name="confirmPassword"
                                id="confirmPassword"
                                color="white"
                            />
                            <Switch
                                label="Is Active"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                                color="green"
                            />

                            <SelectPlaylistWrapper
                                value={playlistId}
                                setValue={setPlaylistId}
                                playlists={userPlaylists}
                                error={spotifyError}
                                loading={spotifyLoading}
                                userInfo={userInfo}
                            />

                            <Button
                                color="green"
                                variant="gradient"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Create Room
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export default CreateRoomForm;