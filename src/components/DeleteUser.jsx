import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Dialog,
    DialogBody,
    DialogHeader,
    Typography
} from "@material-tailwind/react";
import {useUserStore} from "../stores/userStore.js";
import {useState} from "react";
import PasswordInput from "./PasswordInput.jsx";
import NProgress from "nprogress";

const DeleteUser = ({token}) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const {deleteUser} = useUserStore();

    const handleOpen = (e) => {
        e.preventDefault();
        setError("");

        if (password.length <= 0) {
            setError("Please enter password.");
            return;
        }

        setOpen(!open);
    }

    const handleDeleting = async (e) => {
        e.preventDefault();

        NProgress.start();
        await deleteUser(password, token);
        NProgress.done();
    }

    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
            >
                <DialogHeader>
                    <Typography variant="h2">
                        Deleting Your Account
                    </Typography>
                </DialogHeader>
                <DialogBody>
                    <Typography>
                        This action can not be undone. Are you sure you want to delete your account?
                    </Typography>
                    <Button
                        color="red"
                        onClick={handleDeleting}
                    >
                        I&#39;m sure, Delete My Account
                    </Button>
                </DialogBody>
            </Dialog>

            <Card color="red">
                <CardHeader>
                    <Typography variant="h3">
                        Deleting your account
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form
                        onSubmit={handleOpen}
                    >
                        {error && <Alert color="red">{error}</Alert>}

                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                        />

                        <Button
                            type="submit"
                            onClick={handleOpen}
                        >
                            Deleting your account
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </>
    );
};

export default DeleteUser;