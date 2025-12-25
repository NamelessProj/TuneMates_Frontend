import {useState} from "react";
import {Button, Typography} from "@material-tailwind/react";

const CopyInClipboard = ({value="", className="", textClassName="", buttonClassName=""}) => {
    const defaultText = "Copy";
    const [copyState, setCopyState] = useState(defaultText);

    /**
     * Handles the copy to clipboard action.
     * @param e {React.MouseEvent} e - The mouse event.
     * @returns {Promise<void>} A promise that resolves when the text is copied to clipboard.
     */
    const handleCopy = async (e) => {
        e.preventDefault();

        try{
            await navigator.clipboard.writeText(value);
            setCopyState("Copied");
        }catch(err){
            console.error(err);
            setCopyState("Error");
        }finally{
            setTimeout(() => setCopyState(defaultText), 2000);
        }
    }

    return (
        <div className={`relative rounded-xl max-w-sm bg-gray-800 px-4 py-2 ${className}`}>
            <div className="overflow-hidden">
                <Typography variant="lead" className={`${textClassName}`}>
                    {value}
                </Typography>
            </div>
            <Button
                onClick={handleCopy}
                color="green"
                variant="gradient"
                className={`!absolute right-1 top-1/2 transform -translate-y-1/2 ${buttonClassName}`}
            >
                {copyState}
            </Button>
        </div>
    );
};

export default CopyInClipboard;