import React from 'react';
import { Route, Routes } from 'react-router';

import Catalog from '../pages/Catalog'
import Detail from '../pages/Detail';
import Home from '../pages/Home';

function Routers(props) {
    return (
        <Routes>
            <Route 
                path=":category/search/:keyword" 
                element={<Catalog />}
            />
              <Route 
                path=":category/:id" 
                element={<Detail />}
            />
              <Route 
                path=":category" 
                element={<Catalog />}
            />
              <Route 
                path="/" 
                exact
                element={<Home />}
            /> 
        </Routes>
    );
}

export default Routers;