import {Alert, Button, Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {useCodeStore} from "../stores/CodeStore.js";
import {useEffect} from "react";
import {useUserStore} from "../stores/userStore.js";
import DefaultSpinner from "./DefaultSpinner.jsx";
import {format} from "date-fns";
import CopyInClipboard from "./CopyInClipboard.jsx";
import NProgress from "nprogress";

const AllRoomCodes = ({roomId}) => {
    const {token} = useUserStore();
    const {allCodes, codesLoading, codesError, getAllCodesForRoom, deleteCode} = useCodeStore();

    useEffect(() => {
        if (token) getAllCodesForRoom(roomId, token).then();
    }, [getAllCodesForRoom, roomId, token]);

    /**
     * Handles the deletion of a code.
     * @param code {string} - The code to be deleted.
     * @returns {Promise<void>} - A promise that resolves when the code is deleted.
     */
    const handleDeleteCode = async (code) => {
        if (!token) return;

        NProgress.start();
        await deleteCode(code, token);
        await getAllCodesForRoom(roomId, token);
        NProgress.done();
    }

    /**
     * Renders a single code element with copy functionality and expiration info.
     * @param code {Object} - The code object containing code and expiration details.
     * @returns {JSX.Element} - The rendered code element.
     * @constructor
     */
    const CodeEl = ({code}) => {
        const link = `${window.location.origin}?code=${code.code}`;

        return (
            <div>
                <CopyInClipboard value={link} />
                <Typography variant="small">
                    Expires at: {format(code.expiresAt, "eeee dd MMM yyyy kk:mm")}
                </Typography>

                <Button
                    size="sm"
                    color="red"
                    className="mt-2"
                    onClick={() => handleDeleteCode(code.code)}
                >
                    Delete Code
                </Button>
            </div>
        );
    }

    /**
     * Renders a list of codes or a message if no codes are available.
     * @param codes {Array} - An array of code objects.
     * @returns {JSX.Element} - The rendered list of codes or a no-codes message.
     * @constructor
     */
    const CodeList = ({codes}) => {
        if (codes.length === 0) {
            return (
                <div className="flex justify-center items-center">
                    <Alert color="amber">
                        No codes have been generated for this room yet.
                    </Alert>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-4">
                {codes.map((code, i) => (
                    <CodeEl key={i} code={code} />
                ))}
            </div>
        );
    }

    return (
        <Card color="gray">
            <CardHeader color="gray" className="px-4 py-2">
                <Typography variant="h3">
                    Share The Room
                </Typography>
            </CardHeader>
            <CardBody>
                {codesLoading ? (
                    <div className="flex justify-center items-center">
                        <DefaultSpinner />
                    </div>
                ) : (
                    <>
                        {codesError ? (
                            <div className="flex justify-center items-center">
                                <Alert color="red">
                                    {codesError}
                                </Alert>
                            </div>
                        ) : <CodeList codes={allCodes} />}
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default AllRoomCodes;