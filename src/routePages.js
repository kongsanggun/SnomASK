import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MessagePage from "./page/messagePage";
import ResponsePage from "./page/responsePage";
import Error from "./page/error";

function RoutePages() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MessagePage />} />
          <Route path="/snom" element={<ResponsePage />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    );
  }
  
  export default RoutePages;