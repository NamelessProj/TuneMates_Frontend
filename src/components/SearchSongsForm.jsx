import {Alert, Button, Input} from "@material-tailwind/react";

const SearchSongsForm = ({input, setInput, error, handleSearch}) => {
    return (
        <div>
            <div className="flex justify-center">
                {error && <Alert color="red" className="w-fit mx-auto my-3">{error}</Alert>}
            </div>

            <form
                className="flex flex-col md:flex-row gap-4 md:items-end md:gap-2 w-full max-w-[36rem] mx-auto"
                onSubmit={handleSearch}
            >
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    label="Search Songs"
                />
                <Button
                    type="submit"
                    color="green"
                    variant="gradient"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </form>
        </div>
    );
};

export default SearchSongsForm;