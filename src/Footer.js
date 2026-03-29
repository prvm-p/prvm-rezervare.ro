// src/components/Footer.js
import React from 'react';

const Footer = () => {
    const navbarStyle = {
        backgroundColor: '#0E4174',
        color: '#DEEEFF'
      };
  return (
    <footer className="pt-4 pb-0 mt-4" style={navbarStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>PRVM | Private</h3>
            <br />
            <h6>
              Servicii partenere furnizate în colaborare cu hoteluri și organizații selectate din întreaga Românie.
            </h6>
            <p>
              © 2026 PRVM | Private. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
