import './App.css';
import Video from './Component/VideoGallery';
import Sidebar from './Component/sidebar';
import { useState } from 'react';
function App() {
const [sidebarOpen, setSidebarOpen] = useState(false);
const toggleSidebar = () => {
setSidebarOpen(!sidebarOpen);

}; 
return (
<div className="App">
<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

<Video isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
</div>
);
}

export default App;