import {Alert, Button, Input} from "@material-tailwind/react";

const SearchSongsForm = ({input, setInput, error, handleSearch}) => {
    return (
        <div>
            {error && <Alert color="red" className="mx-auto">{error}</Alert>}
            <form
                className="flex flex-col md:flex-row gap-4 md:items-end md:gap-2"
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