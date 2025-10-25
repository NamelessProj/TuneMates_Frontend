import {Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <main className="h-full flex flex-col justify-center items-center text-primary-white">
            <Typography variant="h2" as="p">
                Error
            </Typography>
            <Typography variant="h1" className="text-7xl text-primary-green">
                404
            </Typography>
            <Typography variant="h2" as="p">
                Not Found
            </Typography>

            <div>
                <Typography variant="lead" className="text-center">
                    Go back to the <Link to="/">homepage</Link>.
                </Typography>
            </div>
        </main>
    );
};

export default ErrorPage;