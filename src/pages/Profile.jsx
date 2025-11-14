import {useAuthStore} from "../stores/authStore.js";
import {useUserStore} from "../stores/userStore.js";
import {Alert, Card, CardHeader, Typography} from "@material-tailwind/react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {useEffect} from "react";
import EditUser from "../components/EditUser.jsx";
import EditUserPassword from "../components/EditUserPassword.jsx";
import DeleteUser from "../components/DeleteUser.jsx";

const Profile = () => {
    const {userInfo, setCredentials} = useAuthStore();
    const {user, token, userError, userLoading} = useUserStore();

    useEffect(() => {
        if (user) setCredentials(user);
    }, [user, setCredentials]);

    return (
        <main className="flex justify-center items-center">
            {userLoading ? <DefaultSpinner /> : (
                <div className="flex flex-col items-center justify-center gap-14">
                    <Card variant="gradient" color="green">
                        <CardHeader color="green" variant="gradient" floated={false} shadow={false}>
                            <Typography variant="h1" className="text-center text-balance">
                                Profile Page for {userInfo ? userInfo.username : "Guest"}
                            </Typography>
                        </CardHeader>
                    </Card>
                    <div className="flex flex-col gap-14">
                        {userError && (
                            <Alert color="red" className="w-fit mx-auto">
                                {userError}
                            </Alert>
                        )}

                        <EditUser userInfo={userInfo} token={token} />

                        <EditUserPassword token={token} />

                        <DeleteUser token={token} />
                    </div>
                </div>
            )}
        </main>
    );
};

export default Profile;