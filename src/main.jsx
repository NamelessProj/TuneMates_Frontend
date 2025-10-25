import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {ThemeProvider} from "@material-tailwind/react";
import App from "./App.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './utils/NProgressConfig.js';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </Router>
        </ThemeProvider>
    </StrictMode>
);