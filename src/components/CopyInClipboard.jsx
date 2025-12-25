import {Typography} from "@material-tailwind/react";
import CopyInClipboardButton from "./CopyInClipboardButton.jsx";

const CopyInClipboard = ({value="", className="", textClassName="", buttonClassName=""}) => {
    return (
        <div className={`relative rounded-xl max-w-sm bg-gray-800 px-4 py-2 ${className}`}>
            <div className="overflow-hidden">
                <Typography variant="lead" className={`${textClassName}`}>
                    {value}
                </Typography>
            </div>
            <CopyInClipboardButton value={value} className={`!absolute right-1 top-1/2 transform -translate-y-1/2 ${buttonClassName}`} />
        </div>
    );
};

export default CopyInClipboard;