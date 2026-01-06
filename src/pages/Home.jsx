import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useRoomStore} from "../stores/roomStore.js";
import NProgress from "nprogress";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import focusById from "../utils/focusById.js";

const Home = () => {
    const [slug, setSlug] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const {currentRoom, roomError, roomLoading, getRoomBySlug, getRoomByCode} = useRoomStore();

    useEffect(() => {
        if (currentRoom && hasSubmitted && !roomError) navigate(`/room/slug/${slug}`);
    }, [currentRoom, hasSubmitted, roomError, slug, navigate]);

    /**
     * Handles the form submission to join a room.
     * @param e {React.FormEvent} e - The form submission event.
     * @returns {Promise<void>} A promise that resolves when the room is joined.
     */
    const handleJoinRoom = async (e) => {
        e.preventDefault();
        setError("");
        setHasSubmitted(false);

        const roomSlug = slug.replace(/(\s+|-+)/g, "-").replace(/-+$/g, "").toLowerCase();
        setSlug(roomSlug);

        if (roomSlug === "") {
            setError("Please enter a valid slug");
            focusById("slug");
            return;
        }

        if (password === "") {
            setError("Please enter a password");
            focusById("password");
            return;
        }

        try {
            NProgress.start();
            await getRoomBySlug(roomSlug, password);
            setHasSubmitted(true);
        } finally {
            NProgress.done();
        }
    }

    useEffect(() => {
        const code = searchParams.get("code");
        setHasSubmitted(true);
        if (code) getRoomByCode(code).then();
        setHasSubmitted(false);
    }, [searchParams, getRoomByCode]);

    return (
        <main className="flex flex-col justify-center items-center">
            {roomLoading ? (
                <DefaultSpinner />
            ) : (
                <Card color="gray" className="w-[min(500px,100%)] mx-auto my-6">
                    <CardHeader color="gray" floated={false} shadow={false}>
                        <Typography variant="h5" className="text-center text-balance">
                            Let join a room
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        {roomError && (
                            <Alert className="mb-3" color="red">
                                {roomError}
                            </Alert>
                        )}
                        {error && (
                            <Alert className="mb-3" color="red">
                                {error}
                            </Alert>
                        )}
                        <form className="flex flex-col" onSubmit={handleJoinRoom}>
                            <Input
                                className="rounded-b-none"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value.toLowerCase().trimStart().replace(/\s+/g, '-'))}
                                name="slug"
                                id="slug"
                                label="Enter the room slug"
                                color="white"
                                required
                            />
                            <PasswordInput
                                password={password}
                                setPassword={setPassword}
                                label="Enter the room's password"
                                inputClassName="!rounded-none"
                                color="white"
                            />
                            <Button
                                variant="gradient"
                                color="green"
                                className="rounded-t-none"
                                type="submit"
                                onClick={handleJoinRoom}
                            >
                                Join Room
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            )}

            {currentRoom ? (
                <Card color="gray">
                    <CardBody className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] items-center justify-between">
                        <div>
                            <Typography variant="h4">
                                Join Back
                            </Typography>
                            <Typography variant="lead" color="green">
                                {currentRoom.name}
                            </Typography>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link to={`/room/slug/${currentRoom.slug}`}>
                                <Button
                                    variant="text"
                                    color="green"
                                    className="fill-green-300 hover:fill-green-500"
                                >
                                    <p className="sr-only">Click here to join this room</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 640">
                                        <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"/>
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            ) : null}
        </main>
    );
};

export default Home;