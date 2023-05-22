import { Helmet } from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState } from 'react';

import ServiceList from "../sections/@dashboard/services/ServiceList";
import ServiceDetails from "../sections/@dashboard/services/ServiceDetail";


// ----------------------------------------------------------------------

export default function PackagesPage() {
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
      // <ServiceList/>

            <Routes>
                <Route path="/packages" element={<ServiceList/>} />;
                <Route path={`/package/:packageId`} element={<ServiceDetails />} />
            </Routes>

    );
}
