import React from 'react';
import './HeaderComponent.css'; // Ensure the CSS file is correctly linked

import banner from './images/image1.png'; // Assuming image1 is the banner
import logo from './images/image2.png'; // Assuming image2 is the logo

function HeaderComponent() {
  return (
    <div className="header-component">
      <img src={logo} alt="University Logo" className="header-logo" />
      <img src={banner} alt="University Sports Event" className="header-banner" />
    </div>
  );
}

export default HeaderComponent;
