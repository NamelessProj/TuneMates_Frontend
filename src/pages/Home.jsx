import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useRoomStore} from "../stores/roomStore.js";
import NProgress from "nprogress";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {useNavigate} from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";

const Home = () => {
    const [slug, setSlug] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {room, roomError, roomLoading, getRoomBySlug} = useRoomStore();

    useEffect(() => {
        if (room) navigate(`/room/${slug}`);
    }, [room, slug, navigate]);

    const focusById = (id) => document.getElementById(id)?.focus();

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        setError("");

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
        } finally {
            NProgress.done();
        }
    }

    return (
        <main className="flex flex-col justify-center items-center">
            {roomLoading ? (
                <DefaultSpinner />
            ) : (
                <Card className="w-[min(500px,100%)] mx-auto my-6">
                    <CardHeader floated={false} shadow={false}>
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
                                required
                            />
                            <PasswordInput password={password} setPassword={setPassword} label="Enter the room's password" />
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
        </main>
    );
};

export default Home;