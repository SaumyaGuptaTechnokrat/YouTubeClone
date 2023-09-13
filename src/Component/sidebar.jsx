import React from 'react';
import '../App.css'; // Import your CSS for styling

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
    
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar content */}
       <div className='sidebar-content'>
       <div id='Home'>
          <span class="material-symbols-outlined">
            home
          </span>
          {/* <p>Home</p> */}
       </div>
        <div id="subscriptions">
          <span class="material-symbols-outlined">
          subscriptions
          </span>
        </div>
        <div id='videolibrary'>
          <span class="material-symbols-outlined">
          video_library
          </span>
        </div>
        <div id='history'>
          <span class="material-symbols-outlined">
           history
          </span>
          
        </div>
        <div>
          .
          <br/>
         
        </div>
       </div>
    </div>
    </>
  );
}

export default Sidebar;
