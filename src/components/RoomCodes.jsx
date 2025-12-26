import {useCodeStore} from "../stores/CodeStore.js";
import AllRoomCodes from "./AllRoomCodes.jsx";
import {useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import DefaultSpinner from "./DefaultSpinner.jsx";
import {Alert, Button, Input} from "@material-tailwind/react";
import PasswordInput from "./PasswordInput.jsx";
import NProgress from "nprogress";

const RoomCodes = ({roomId}) => {
    const [expiresInHours, setExpiresInHours] = useState(1);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {token} = useUserStore();
    const {allCodes, codeError, codeLoading, getCodeForRoom, getAllCodesForRoom} = useCodeStore();
    const codeLimitPerRoom = 1;

    /**
     * Handles the generation of a room code.
     * @param e {React.FormEvent} e - The form submission event.
     * @returns {Promise<void>} A promise that resolves when the room code is generated.
     */
    const handleGenerateCode = async (e) => {
        e.preventDefault();

        if (!token) return;

        if (expiresInHours <= 0) {
            setError("Expiration time must be greater than 0 hours.");
            return;
        }

        if (expiresInHours > 48) {
            setError("Expiration time cannot exceed 48 hours.");
            return;
        }

        NProgress.start();
        await getCodeForRoom(roomId, password, expiresInHours, token);
        await getAllCodesForRoom(roomId, token); // Refresh the list of codes
        NProgress.done();
    }

    return (
        <div className="bg-gray-700 rounded-lg px-4 py-2">
            {codeLoading ? (
                <div className="flex justify-center items-center w-full min-h-20">
                    <DefaultSpinner />
                </div>
            ) : (
                <div>
                    {allCodes?.length < codeLimitPerRoom ? (
                        <form className="flex flex-col gap-3 mb-6" onSubmit={handleGenerateCode}>
                            {codeError ? (
                                <Alert color="red">
                                    {codeError}
                                </Alert>
                            ) : null}

                            {error ? (
                                <Alert color="red">
                                    {error}
                                </Alert>
                            ) : null}

                            <Input
                                value={expiresInHours}
                                onChange={(e) => setExpiresInHours(Number(e.target.value))}
                                type="number"
                                inputMode="numeric"
                                size="lg"
                                label="Expiration Time (hours)"
                                name="expiresInHours"
                                id="expiresInHours"
                                color="white"
                                min={1}
                                max={48}
                                required
                            />

                            <PasswordInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Optional Password"
                                id="codePassword"
                                name="codePassword"
                                color="white"
                            />

                            <Button
                                variant="gradient"
                                color="green"
                                type="submit"
                                onClick={handleGenerateCode}
                            >
                                Generate Room Code
                            </Button>
                        </form>
                    ) : (
                        <div className="flex justify-center mb-6">
                            <Alert color="amber">
                                You have reached the maximum number of room codes ({codeLimitPerRoom}) for this room.
                            </Alert>
                        </div>
                    )}

                    <AllRoomCodes roomId={roomId} />
                </div>
            )}
        </div>
    );
};

export default RoomCodes;