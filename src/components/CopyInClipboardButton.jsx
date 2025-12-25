import {Button} from "@material-tailwind/react";
import {useState} from "react";

const CopyInClipboardButton = ({value, className}) => {
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
        <Button
            onClick={handleCopy}
            color="green"
            variant="gradient"
            className={className}
        >
            {copyState}
        </Button>
    );
};

export default CopyInClipboardButton;