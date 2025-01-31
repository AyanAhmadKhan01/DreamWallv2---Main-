import { useState, useEffect,  useRef} from "react";
import { Link } from "react-router-dom";

function ExplorePage() {
  return (
    <>
      <Explore/>
    </>
  );
}


export default ExplorePage;


function Explore() {
  useEffect(() => { 
    document.title = 'Dream Wall V2 - Explore'
   }, [])

      const timers = useRef([]);  
      const [copyWallpaper, setCopyWallpaper] = useState(false);
      const [isAnimating, setIsAnimating] = useState(false);
      const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
    
  
      const handleCopyAlert = () => {
        setIsAnimating(false); 
        timers.current.push(
        setTimeout(() => setCopyWallpaper(false), 1000)
        );
      };
    
      const clearTimers = () => {
        timers.current.forEach((timers) => clearTimeout(timers));
        timers.current = [];
      }

      const copyToClipboard = () => {
        clearTimers();

      
        setCopyWallpaper(true);
        setIsButtonDisabled(true); 
        timers.current.push(setTimeout(() => setIsAnimating(true), 10));
       
        timers.current.push(
          setTimeout(() => {
            handleCopyAlert();
            setIsButtonDisabled(false); 
          }, 3000)
        );
      };
   
  const [isLiked, setIsLike] = useState(false)
  const [wallpaperDisplay, setWallpaperDisplay] = useState([]);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [chooseWallpaper, setChooseWallpaper ] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchWallpaper = async () => {
      try {
        const response = await fetch("https://dreamwall-backend.onrender.com/api/wallpaper/display", {
          method: "GET",
        });
        if (!response.ok) {
          console.error("Failed to fetch Wallpaper");
        }
        const data = await response.json();
        setWallpaperDisplay(data);
      } catch (err) {
        console.error("Failed to load Wallpaper", err);
      }
    };

    fetchWallpaper();
  }, []);


  useEffect(() => {
    const fetchProfileData = async () => {
      try{
        const response = await fetch("https://dreamwall-backend.onrender.com/api/user/profile/data", {
          method: 'GET',
        });
        if(!response.ok) {
          console.error('Failed To fetch Profile');
        }
        const data = await response.json();
        setProfile(data)
      } catch (err) {
        console.error('Failed to load Profile', err)
      }
    }
    fetchProfileData();
  },[])
  

  const handleChooseDropdown = () => {
    setChooseWallpaper((prev) => !prev);  
  }
  

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setChooseWallpaper(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [isDeviceClick, setIsDeviceClick] = useState('ALL');
  const [deviceType, setDeviceType ] = useState('ALL')
 const [currentPage, setCurrentPage] = useState(1);


const itemsPerPage = 14;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const handleSearch = (event) => {
  const newSearchTerm = event.target.value;
  setSearchTerm(newSearchTerm);
  setCurrentPage(1); 
};

const [isRecent, setIsRecent] = useState(false); 
const [isMostDownloaded, setIsMostDownloaded] = useState(false); 
const [random, setRandom] = useState(false);


const handleSortChange = (sortType) => {
  setIsRecent(sortType === 'Recent');
  setIsMostDownloaded(sortType === 'Downloads');
  setRandom(sortType === 'Random');
  setSort(sortType);
};

const handleRecentClick = () => handleSortChange('Recent');
const handleMostDownloadedClick = () => handleSortChange('Downloads');
const handelRandomWallpaper = () => handleSortChange('Random');


const filteredWallpapers = wallpaperDisplay
  .filter((wallpaper) => {
    const matchedSearch = wallpaper.wallpaperName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchedDeviceType = deviceType === 'ALL' ? true : wallpaper.deviceTags === deviceType;
    return matchedSearch && matchedDeviceType;
  })
  .sort((a, b) => {
    if (isMostDownloaded) {
      return b.downloads - a.downloads; 
    }
    const dateA = new Date(a.uploadDate);
    const dateB = new Date(b.uploadDate);
    return dateA - dateB; 
  })
  .sort((a, b) => {
 if (isRecent) {
  const dateA = new Date(a.uploadDate);
  const dateB = new Date(b.uploadDate);
  return dateB - dateA; 
}
return 0; 
  })
  

const currentItems = filteredWallpapers.slice(indexOfFirstItem, indexOfLastItem);

const handleDeviceClick = (device) => {
  setDeviceType(device === '' ? '' : device); 
  setIsDeviceClick(device); 
  setCurrentPage(1); 
};

const [hideSideMenu, setHideSideMenu] = useState(false);

const handleSideMenu = () => {
  setHideSideMenu((prev) => !prev)
}

const [menuClass, setMenuClass] = useState('show')
 
const handleClass = () => {
  setMenuClass(menuClass === 'show' ? 'hide' : 'show');
}

const [sort, setSort] = useState('Random');
const [activeBar, setActiveBar] = useState('ALL');
 
const handleActiveBar = (active) => {
  setActiveBar(active);
}


  return (
    <>
                   {copyWallpaper && (
                <div className={`wallpaper-link-copy ${isAnimating ? 'show' : 'hide'}`}>
                  <div className="wallpaper-link-copy-section">
                    <h1><span><i class="fas fa-check"></i></span>Link copied to clipboard! <i class="fas fa-times" onClick={handleCopyAlert}></i></h1>
                  </div>
                </div>
               )}
    <div className="explore-container">
      <div className="mini-container">
      <i class="fa-solid fa-bars"  onClick={() => {handleClass(); handleSideMenu();}} style={{ display: hideSideMenu ? "block" : "none" }}></i>
        <div className={`left-sidebar-container ${menuClass}`} >
          <div className="left-sidebar-section">
            <div className="left-sidear-top">
            <h3>Side Menu</h3>  <i class="fas fa-bars-staggered"  onClick={() => {handleClass(); handleSideMenu();}}></i>
          </div>    
          <Link to={'/explore'}> 
    <div className={`left-sidebar ${activeBar === 'ALL' ? 'active' : ''}`} onClick={() => handleDeviceClick('ALL')}> 
     <h3 onClick={() => handleActiveBar('ALL')}><i class="fa fa-home"></i> All</h3>
    </div>
    </Link>
    <div className={`left-sidebar ${activeBar === 'Wallpapers' ? 'active' : ''}`}>
     <h3  onClick={() => handleActiveBar('Wallpapers')}><i class="fa-solid fa-image"></i> Wallpapers</h3>
    </div>
    <Link to={'/explore/meme'}>
    <div className={`left-sidebar ${activeBar === 'Memes' ? 'active' : ''}`}>
     <h3 onClick={() => handleActiveBar('Memes')}><i class="fa-regular fa-face-laugh"></i>Memes</h3>
    </div>
    </Link>
    <Link to={'/explore/livewallpaper'}>
    <div className={`left-sidebar ${activeBar === 'Fan Art' ? 'active' : ''}`}>
     <h3 onClick={() => handleActiveBar('Fan Art')} ><i class="fa-solid fa-brush"></i> Live Wallpaper</h3>
    </div>
    </Link>
    </div>
    </div>
      <div className="explore-section">
           <h1>Explore Wallpaper</h1>
           <div className="filter-container">
           <div className="filter-bar">
            <h2>First Page</h2>
            <div className="filter-device">
              <h4 onClick={() => handleDeviceClick('ALL')}
               className={isDeviceClick === 'ALL' ? 'clicked' : ''}
               >All</h4>
              <h4 onClick={() => handleDeviceClick('Mobile')}
               className={isDeviceClick === 'Mobile' ? 'clicked' : ''}
              >Mobile</h4>
              <h4 onClick={() => handleDeviceClick('PC')}
               className={isDeviceClick === 'PC' ? 'clicked' : ''}
              >Pc</h4>
              </div>
              <div className="choose-wallpaper-container" ref={dropdownRef}>
              <button onClick={handleChooseDropdown} className="choose-wallpaper-btn"><i class="fas fa-filter"></i> <span>Sort:</span>  {sort} <i class="fas fa-angle-down"></i></button>
              {chooseWallpaper && (
        <div className="choose-wallpaper">
          <div className="mini-choose-wallpaper-conatiner">
          <div className="choose-wallpaper-dropdown" onClick={handelRandomWallpaper}> 
          <i class="fas fa-random"></i> Random
          </div>
          <div className="choose-wallpaper-dropdown" onClick={handleRecentClick }  >
          <i class="fas fa-clock"></i> Recent
          </div>
          <div className="choose-wallpaper-dropdown" onClick={handleMostDownloadedClick}>
          <i class="fas fa-chart-line"></i> Downloads
          </div>
          </div>
        </div>
         )}
         </div>
         <div className="search-container">
  <input 
    type="text" 
    placeholder="Search wallpaper by name!" 
    className="search-wallpaper" 
    aria-label="Search wallpaper by name" 
    onChange={(event) => {
      handleSearch(event)
    }}
    
  />
  <i className="fas fa-search"></i> 
</div>
            </div>
            
           </div>
        <div className="masonry">
        {currentItems.length > 0 ? (
          currentItems.map((wallpaper) => (
            <div className="explore-card" key={wallpaper.id || wallpaper.wallpaperName}>
              <Link to={`/explore/${wallpaper.linkCopy}`}>
              <img src={wallpaper.imgLink} alt={wallpaper.wallpaperName} />
             </Link>
              <div className="leftbar">
                <div className="leftbar-section">
                  <h6>
                  <Link to={`/explore/${wallpaper.linkCopy}`} className="likes-explore">
                    <i className="far fa-heart"></i> {wallpaper.likes}
                    </Link>
                  </h6>
                  
                  <h5 onClick={() => {copyToClipboard();
                     const linkToCopy = `https://dreamwallv2.vercel.app/explore/${wallpaper.linkCopy}`;
                     navigator.clipboard.writeText(linkToCopy);
                  }}  disabled={isButtonDisabled}>
  <i className="far fa-clone"></i>
</h5>


                </div>
                <label>{wallpaper.deviceTags || "Unknown Device"}</label>
                <div className="leftbar-text">
                  <h2>{wallpaper.downloads} downloads  ● {wallpaper.linkcopy}</h2>
                  <h2>{(() => {
    const uploadedDate = new Date(wallpaper.uploadDate);
    const currentDate = new Date();
    const timeDifference = Math.abs(currentDate - uploadedDate);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  })()}</h2>
  
                </div>
                
                {profile
            .filter((profileItem) => profileItem.username === wallpaper.uploaderName) 
            .map((profileItem) => (
              <h1>
          <Link to={`/profile/${profileItem.profileUrl}`} key={profileItem.profileUrl} className="uploader-name">
             {wallpaper.uploaderName}
         </Link>
         </h1>
      ))}     
                <h3>{wallpaper.wallpaperName}</h3>
              </div>
            </div>
            
          ))) : (
            <div className="no-wallpaper-found">
           <div className="no-wallpaper-found-container">
            <div className="no-wallpaper-found-mini-container">
            <i class="fa-regular fa-image"></i>
            <h1>No Wallpaper <span>Found</span> </h1>
            </div>
           </div>
           </div>
          )}
        </div>
      </div>
    </div>
    </div>
    </>
  );
}


