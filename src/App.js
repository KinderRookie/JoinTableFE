import {Route, Routes} from "react-router-dom"
import Layout from "./components/Layout";
import MainApp from "./components/MainApp";
import HomePage from "./components/HomePage";
import About from "./components/About";
import EventPage from "./components/Events";
import NotFound from './NotFound'; // Import the NotFound component


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="app" element={<MainApp />} />
                <Route path="about" element={<About />} />
                <Route path="event/:eventUuid" element={<EventPage />} />
                {/* Catch-all route for invalid paths */}
                <Route path="*" element={<NotFound />} />


            </Route>

        </Routes>
    );
}

export default App;