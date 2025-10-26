import {useEffect, useState} from "react";
import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import DefaultSpinner from "./DefaultSpinner.jsx";
import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import NProgress from "nprogress";
import {Link} from "react-router-dom";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const {setCredentials} = useAuthStore();
    const {user, userError, userLoading, register} = useUserStore();

    useEffect(() => {
        if(user) setCredentials(user);
    }, [user]);

    const focusById = (id) => document.getElementById(id).focus();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const emailForm = email.trim();
        const usernameForm = username.trim();

        if (emailForm === '' || password === '' || confirmPassword === '' || usernameForm === '') {
            setError('Please fill all fields');

            if (confirmPassword === '') focusById('confirmPassword');
            if (password === '') focusById('password');
            if (usernameForm === '') focusById('username');
            if (emailForm === '') focusById('email');

            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(emailForm)) {
            setError('Please enter a valid email');
            focusById('email');
            return;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError('Please enter a valid password');
            focusById('password');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            focusById('confirmPassword');
            return;
        }

        try {
            NProgress.start();
            await register({email: emailForm, username: usernameForm, password, confirmPassword});
        } finally {
            NProgress.done();
        }
    }

    return (
        <div className="mt-6 flex flex-col justify-center items-center gap-6">
            {userLoading ? (
                <DefaultSpinner />
            ) : (
                <Card className="w-96">
                    <CardHeader variant="gradient" color="green" className="mb-4 grid h-28 place-items-center">
                        <Typography variant="h3">
                            Register
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        {error && (
                            <Alert color="red" className="mb-6">
                                {error}
                            </Alert>
                        )}
                        {userError && (
                            <Alert color="red" className="mb-6">
                                {userError}
                            </Alert>
                        )}

                        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                inputMode="email"
                                id="email"
                                name="email"
                                size="lg"
                                label="Email"
                                required
                            />
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="username"
                                name="username"
                                size="lg"
                                label="Username"
                                required
                            />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                size="lg"
                                label="Password"
                                required
                            />
                            <Input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                id="confirmPassword"
                                name="confirmpassword"
                                size="lg"
                                label="Confirm Password"
                                required
                            />
                            <Button color="green" variant="gradient" onClick={handleSubmit} type="submit">
                                Register
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            )}
            <Typography>
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </div>
    );
};

export default RegisterForm;