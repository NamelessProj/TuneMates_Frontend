import {Alert, Button, Input, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const SearchSongsForm = ({input, setInput, error, handleSearch}) => {
    return (
        <div>
            <div className="flex justify-center">
                {error && <Alert color="red" className="w-fit mx-auto my-3">{error}</Alert>}
            </div>

            <form
                className="flex flex-col md:flex-row gap-0 md:items-end w-full max-w-[36rem] mx-auto"
                onSubmit={handleSearch}
            >
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    label="Search Songs"
                    className="rounded-b-none md:rounded-bl-[7px] md:rounded-tr-none"
                    color="white"
                />
                <Button
                    type="submit"
                    color="green"
                    variant="gradient"
                    onClick={handleSearch}
                    className="rounded-t-none md:rounded-tr-[7px] md:rounded-bl-none"
                >
                    Search
                </Button>
            </form>

            <Typography className="text-center text-balance">
                Sending a song using a Spotify URL or URI? <Link to="url" className="text-green-500 underline">Click here</Link>.
            </Typography>
        </div>
    );
};

export default SearchSongsForm;