import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useState} from "react";

const Home = () => {
    const [slug, setSlug] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const focusById = (id) => document.getElementById(id).focus();

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        setError("");

        const roomSlug = slug.replace(/(\s+|-+)/g, "-").replace(/-+$/g, "").toLowerCase();

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

        // Send a request to get the room information
    }

    return (
        <main className="flex flex-col justify-center items-center">
            <Card className="w-[min(500px,100%)] mx-auto my-6">
                <CardHeader floated={false} shadow={false}>
                    <Typography variant="h5" className="text-center text-balance">
                        Let join a room
                    </Typography>
                </CardHeader>
                <CardBody>
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
                        <Input
                            className="rounded-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            id="password"
                            label="Enter the room's password"
                            variant="outlined"
                            required
                        />
                        <Button
                            variant="gradient"
                            color="green"
                            className="rounded-t-none"
                            onClick={handleJoinRoom}
                        >
                            Join Room
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </main>
    );
};

export default Home;