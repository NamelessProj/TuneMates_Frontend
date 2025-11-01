import {Button, Input} from "@material-tailwind/react";
import {useState} from "react";

const PasswordInput = ({password, setPassword, label="Password", name="password", id="password"}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="relative">
            <Input
                className="rounded-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={passwordVisible ? "text" : "password"}
                name={name}
                id={id}
                label={label}
                variant="outlined"
                required
            />
            <Button
                variant="text"
                size="sm"
                className="!absolute top-0 bottom-0 right-0"
                onClick={() => setPasswordVisible(!passwordVisible)}
            >
                {passwordVisible ? "Hide" : "Show"}
            </Button>
        </div>
    );
};

export default PasswordInput;