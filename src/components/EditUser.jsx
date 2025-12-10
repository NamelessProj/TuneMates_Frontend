import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useUserStore} from "../stores/userStore.js";
import {useEffect, useState} from "react";
import validateEmail from "../utils/validateEmail.js";

const EditUser = ({userInfo, token}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const {editUser} = useUserStore();

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
            setEmail(userInfo.email);
        }
    }, [userInfo, setEmail, setUsername]);

    /**
     * Handles the form submission to edit user information.
     * @param e {React.FormEvent} e - The form submission event.
     * @returns {Promise<void>} A promise that resolves when the user information is edited.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.trim() === "" || email.trim() === "") {
            setError("Username and email cannot be empty");
            return;
        }

        if (username.length < 3 || username.length > 30) {
            setError("Username must be between 3 and 30 characters");
            return;
        }

        if (email.length < 3 || email.length > 254) {
            setError("Email must be between 3 and 254 characters");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        await editUser({username, email}, token);
    }

    return (
        <Card>
            <CardHeader>
                <Typography variant="h3">
                    Edit Your Information
                </Typography>
            </CardHeader>
            <CardBody>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <Alert color="red" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        id="username"
                    />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        id="email"
                        inputMode="email"
                    />
                    <Button
                        color="green"
                        variant="gradient"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default EditUser;