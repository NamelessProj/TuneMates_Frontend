import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Rooms from "./pages/Rooms.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import SpotifyConnect from "./pages/SpotifyConnect.jsx";
import SpotifyCallback from "./pages/SpotifyCallback.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import EditRoom from "./pages/EditRoom.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
                <Route path="room">
                    <Route path="create" element={<CreateRoom />} />
                    <Route path="slug/:slug" element={<RoomPage />} />
                    <Route path="edit/:roomId" element={<EditRoom />} />
                </Route>
                <Route path="rooms">
                    <Route index element={<Rooms />} />
                </Route>
                <Route path="spotify">
                    <Route path="connect" element={<SpotifyConnect />} />
                    <Route path="callback" element={<SpotifyCallback />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
};

export default App;