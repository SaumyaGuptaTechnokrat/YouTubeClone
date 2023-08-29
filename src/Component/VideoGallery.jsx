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
        const apiKey = 'AIzaSyD8wv0OKoVoYP31O1z0OGMu4rr5aWQ-Z5A';
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
  
    const handleSearchClick = async () => {
       fetchVideos();
    };
    useEffect(() => {
      //console.log(isActive);
        fetchVideos();
    
      }, []);
      
      const [isActive, setIsActive] = useState(false);

  const toggleClassName = () => {
    setIsActive(prevState => !prevState);
    console.log(isActive);
  };
  const combineFunction = () =>{
    console.log("Combined Clicked");
    toggleSidebar();
  //  handleReplaceClassName();
  toggleClassName();
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
       <button className="toggle-button" onClick={combineFunction}>
        <div id="sidebar"></div>
        <div id="sidebar"></div>
        <div id="sidebar"></div> 
      </button>
      <div className={`main-content ${isOpen ? 'pushed' : ''}`}>
        
          <div className="container-fluid" style={{position:"relative", left:"2%"}}>

              <div className="row">
              {video.map(i => (//for the videosearched through input box
                <div key={i.id.videoId} className="col-md-3 mb-3">
                  <iframe
                  title={video.snippet.title}

                    width="338px"
                    height="190px"
                    src={`https://www.youtube.com/embed/${i.id.videoId}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                              <p>{i.snippet.title} </p>
                              <div class="g-ytsubscribe" data-channel="GoogleDevelopers" data-layout="full" data-count="default"></div>
                </div>
              ))}
              </div>
          </div>
          <div className="container-fluid">
            <div  className="row" id="already">
            {videos.map(video => (//for default videos shown at the homepage
                <div key={video.id.videoId}  className={isActive ? 'col-md-4 mb-3' : 'col-md-3 mb-3'} >
                <iframe 
                  title={video.snippet.title}
                  width="338px"
                  height="190px"
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
        
      </div>
      </>
    );
  }
  
  export default Video;
  