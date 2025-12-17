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
import {useAuthStore} from "../stores/authStore.js";
import {useState} from "react";
import PasswordInput from "./PasswordInput.jsx";
import NProgress from "nprogress";
import {toast} from "react-toastify";

const DeleteUser = ({token}) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const {deleteUser} = useUserStore();
    const {logout} = useAuthStore();

    /**
     * Handles the dialog open/close action.
     * @param e {React.MouseEvent} e - The mouse event.
     */
    const handleOpen = (e) => {
        e.preventDefault();
        setError("");

        if (password.length <= 0) {
            setError("Please enter password.");
            return;
        }

        setOpen(!open);
    }

    /**
     * Handles the user deletion process.
     * @param e {React.MouseEvent} e - The mouse event.
     * @returns {Promise<void>} A promise that resolves when the user is deleted.
     */
    const handleDeleting = async (e) => {
        e.preventDefault();

        NProgress.start();
        const res = await deleteUser(password, token);
        if (res) {
            logout();
            toast("Account deleted successfully.", {type: "success"});
        } else {
            toast("Failed to delete account. Please check your password and try again.", {type: "error"});
        }
        NProgress.done();
    }

    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
            >
                <DialogHeader className="flex justify-center">
                    <Typography variant="h2">
                        Deleting Your Account
                    </Typography>
                </DialogHeader>
                <DialogBody>
                    <Typography className="text-center text-balance">
                        This action can not be undone. Are you sure you want to delete your account?
                    </Typography>
                    <div className="flex justify-evenly mt-6">
                        <Button
                            color="blue"
                            onClick={handleOpen}
                        >
                            Cancel
                        </Button>

                        <Button
                            color="red"
                            onClick={handleDeleting}
                        >
                            I&#39;m sure, Delete My Account
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>

            <Card>
                <CardHeader color="red">
                    <Typography variant="h3">
                        Deleting your account
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form
                        className="flex flex-col gap-4"
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
                            color="red"
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