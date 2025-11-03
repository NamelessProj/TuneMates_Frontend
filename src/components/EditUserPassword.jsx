import {Alert, Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {useState} from "react";
import PasswordInput from "./PasswordInput.jsx";
import {useUserStore} from "../stores/userStore.js";

const EditUserPassword = ({token}) => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const {editUserPassword} = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === "" || newPassword === "" || confirmPassword === "") {
            setError("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }

        await editUserPassword({
            password,
            newPassword,
            confirmPassword
        }, token);
    }

    return (
        <Card>
            <CardHeader>
                <Typography variant="h3">
                    Edit Your Password
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

                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                        label="Current Password"
                        id="currentPassword"
                        name="currentPassword"
                    />
                    <PasswordInput
                        password={newPassword}
                        setPassword={setNewPassword}
                        label="New Password"
                        id="newPassword"
                        name="newPassword"
                    />
                    <PasswordInput
                        password={confirmPassword}
                        setPassword={setConfirmPassword}
                        label="Confirm New Password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                    />
                    <Button
                        color="green"
                        variant="gradient"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Update Password
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default EditUserPassword;