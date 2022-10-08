import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/base/Navbar";
import Home from "../pages/Home";
import DetailStats from "../pages/DetailStats";
import Lavishing from "../pages/Lavishing";
import PageNotFound from "../pages/PageNotFound";


const Router = () => (
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} exact={true} />
            <Route path="/detail-stats" element={<DetailStats />} />
            <Route path="/lavishing" element={<Lavishing />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
