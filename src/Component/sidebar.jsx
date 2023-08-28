import React from 'react';
import '../App.css'; // Import your CSS for styling

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar content */}
      
    </div>
  );
}

export default Sidebar;
