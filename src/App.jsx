import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Pagprincipal/Hero";
import InvitacionPag from "./pages/Invitacion/InvitacionPag";
import ConfirmacionInvitacion from "./pages/Agendar/ConfirmacionInvitacion";
import ReglasDeCelebracion from "./pages/DetalleCelebracion/ReglasDeCelebracion";
import SeleccionarCanciones from "./pages/Musica/SeleccionarCanciones";
import NroCuenta from "./pages/Cuenta/NroCuenta";
;

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/invitacion" element={<InvitacionPag/>} />
        <Route path="/confirmacion" element={<ConfirmacionInvitacion />} />
        <Route path="/ReglasDeCelebracion" element={<ReglasDeCelebracion />} />
        <Route
          path="/canciones"
          element={<SeleccionarCanciones token={token} />}
        />
        <Route path="/nrocuenta" element={<NroCuenta />} />
      </Routes>
    </Router>
  );
}

export default App;
