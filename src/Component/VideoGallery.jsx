// ... (imports and component definition)
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import '../App.css';
function Video({ isOpen, toggleSidebar}) {
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Default search query
    const [video,setVideo] = useState([]);
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Trigger the search with the current searchQuery value()
        handleSearchClick();
      }
    };
    const formatUploadTime = (publishedAt) => {
        const uploadDate = new Date(publishedAt);
        const now = new Date();
        const diffInSeconds = Math.floor((now - uploadDate) / 1000);
      
        if (diffInSeconds < 60) {
          return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
          return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        } else if (diffInSeconds < 86400) {
          return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        } else {
          return uploadDate.toDateString();
        }
      };
      
    const formatViews = (viewCount) => {
        const num = Number(viewCount);
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + 'M views';
        } else if (num >= 1000) {
          return (num / 1000).toFixed(1) + 'K views';
        } else {
          return num + ' views';
        }
      };
      
    async function fetchVideos() {
        const apiKey = 'AIzaSyAeLgA7VK2mJQ0wOq8cgTP4fh2DYKrDt78';
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            q: searchQuery,
            key: apiKey,
            part: 'snippet',
            type: 'video',
            maxResults: 20,
          },
        });
        const videoIds = response.data.items.map((item) => item.id.videoId).join(',');
        const statisticsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics&id=${videoIds}`
        );
    
        const videosWithStats = response.data.items.map((item, index) => ({
          ...item,
          statistics: statisticsResponse.data.items[index].statistics
        }));
        const videosWithDetails = response.data.items.map((video) => ({
            ...video,
            snippet: {
              ...video.snippet,
              publishedAt: statisticsResponse.data.items.find((item) => item.id === video.id.videoId).snippet.publishedAt,
            },
          }));
      
        setVideos(videosWithStats , videosWithDetails);
        
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }
  
    const handleSearchClick = () => {
        document.getElementById("already").style.display='none';
      fetchVideos();
    };
    useEffect(() => {
      
        fetchVideos();
    
      }, []);
      const [gridTemplateColumns, setgridTemplateColumns] = useState('320px 320px 320px 320px');

  const handleClick = () => {
    console.log("clicked");
    setgridTemplateColumns(gridTemplateColumns === '320px 320px 320px 320px' ? '320px 320px 320px' : '320px 320px 320px 320px');
  };

  const divStyle = {
    display:'grid',
    gridTemplateColumns: gridTemplateColumns,
    justifyContent:'center',
    alignItems: 'center',
    gap:'2% 1%'
  };
  

  const combineFunction = () =>{
    console.log("Combined Clicked");
    handleClick();
    toggleSidebar();
  };
      
    return (
      <>
      <div className="search-container">
       <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search videos" className="search-input"
          onKeyDown={handleKeyPress}

        />
        <button className="search-button" onClick={handleSearchClick}><span class="material-symbols-outlined">
search
</span></button>

      <div className="keyboard-voice"><span class="material-symbols-outlined">
keyboard_voice
</span></div>
       </div>
      <div className={`main-content ${isOpen ? 'pushed' : ''}`}>
        <button className="toggle-button" onClick={combineFunction}>
        <div id="sidebar"></div>
<div id="sidebar"></div>
<div id="sidebar"></div> 
      </button>
       
       <div></div>
        <div style={divStyle} >
        {video.map(i => (//for the videosearched through input box
          <div key={i.id.videoId} className="video-item">
            <iframe
            title={video.snippet.title}

              width="320px"
              height="200px"
              src={`https://www.youtube.com/embed/${i.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
                        <p>{i.snippet.title} </p>

          </div>
        ))}
        </div>
        <div style={divStyle}>
        {videos.map(video => (//for default videos shown at the homepage
            
          <div key={video.id.videoId} style={{width:"320px"}}>
            <iframe
              title={video.snippet.title}
              width="320px"
              height="200px"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
                        <p id="videoCaption">{video.snippet.title}</p>
                        <p style={{color:"gray"}}>{formatViews(video.statistics.viewCount)} <sup style={{fontSize:"20px"}}>.</sup>   {formatUploadTime(video.snippet.publishedAt)}</p>

          </div>
        ))}

        </div>
        
      </div>
      </>
    );
  }
  
  export default Video;
  