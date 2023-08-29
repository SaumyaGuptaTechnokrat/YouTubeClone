import React from 'react';
import '../App.css'; // Import your CSS for styling

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
    
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar content */}
       <div className='sidebar-content'>
       <span class="material-symbols-outlined">
        home
        </span>
        <span class="material-symbols-outlined">
        subscriptions
        </span>
        <span class="material-symbols-outlined">
        video_library
        </span>
        <span class="material-symbols-outlined">
history
</span>
       </div>
    </div>
    </>
  );
}

export default Sidebar;
