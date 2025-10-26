import {useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import NProgress from "nprogress";
import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import DefaultSpinner from "./DefaultSpinner.jsx";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {user, userError, userLoading, login} = useUserStore();
    const {setCredentials} = useAuthStore();

    useEffect(() => {
        if (user) setCredentials(user);
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const emailTrimmed = email.trim();

        if (emailTrimmed === '' || password === '') {
            setError('Email and password are required.');

            if (emailTrimmed === '') {
                document.getElementById('email').focus();
            } else {
                document.getElementById('password').focus();
            }

            return;
        }

        try {
            NProgress.start();
            await login({email: emailTrimmed, password});
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
                            Login
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
                                size="lg"
                                label="Email"
                                name="email"
                                id="email"
                                required
                            />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                size="lg"
                                label="Password"
                                name="password"
                                id="password"
                                required
                            />
                            <Button color="green" variant="gradient" onClick={handleSubmit} type="submit">
                                Login
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            )}
            <Typography>
                Don&#39;t have an account? <Link to="/register">Register</Link>
            </Typography>
        </div>
    );
};

export default LoginForm;