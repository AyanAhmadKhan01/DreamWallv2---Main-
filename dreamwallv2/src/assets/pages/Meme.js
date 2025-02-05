import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";

function Meme() {

   const emojis = [
    'fa-regular fa-face-laugh-beam',
     'fa-regular fa-face-smile-wink', 
     'fa-regular fa-face-grin-tongue-squint',
      'fa-regular fa-face-dizzy',
      'fa-regular fa-face-angry',
      'fa-regular fa-face-grin-stars'];

    const [fun, setFun] = useState(emojis[0]);

    const handleFun = () => {
        const currentIndex = emojis.indexOf(fun); 
        const nextIndex = (currentIndex + 1) % emojis.length; 
        setFun(emojis[nextIndex]); 
      };

 const [chooseWallpaper, setChooseWallpaper ] = useState(false);
      const dropdownRef = useRef(null);
    
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
    
   
      const [isDeviceClick, setIsDeviceClick] = useState('ALL');
      const [deviceType, setDeviceType ] = useState('ALL')
     const [currentPage, setCurrentPage] = useState(1);


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

    return(
        <> 
         <div className="explore-container">
      <div className="mini-container">
      <i className="fa-solid fa-bars"  onClick={() => {handleClass(); handleSideMenu();}} style={{ display: hideSideMenu ? "block" : "none" }}></i>
        <div className={`left-sidebar-container ${menuClass}`} >
          <div className="left-sidebar-section">
            <div className="left-sidear-top">
            <h3>Side Menu</h3>  <i className="fas fa-bars-staggered"  onClick={() => {handleClass(); handleSideMenu();}}></i>
          </div>    
          <Link to={'/explore'}> 
    <div className={`left-sidebar ${activeBar === 'ALL' ? 'active' : ''}`} onClick={() => handleDeviceClick('ALL')}> 
     <h3 onClick={() => handleActiveBar('ALL')}><i className="fa fa-home"></i> All</h3>
    </div>
    </Link>
    <Link to={'/explore'}> 
    <div className={`left-sidebar ${activeBar === 'Wallpapers' ? 'active' : ''}`}>
     <h3  onClick={() => handleActiveBar('Wallpapers')}><i className="fa-solid fa-image"></i> Wallpapers</h3>
    </div>
    </Link>
    <Link to={'/explore/meme'}>
    <div className={`left-sidebar ${activeBar === 'Memes' ? 'active' : ''}`}>
     <h3 onClick={() => handleActiveBar('Memes')}><i className="fa-regular fa-face-laugh"></i>Memes</h3>
    </div>
    </Link>
    <Link to={'/explore/livewallpaper'}>
    <div className={`left-sidebar ${activeBar === 'Fan Art' ? 'active' : ''}`}>
     <h3 onClick={() => handleActiveBar('Fan Art')} ><i className="fa-solid fa-brush"></i> Live Wallpaper</h3>
    </div>
    </Link>
    </div>
    </div>
      <div className="explore-section">
           <h1>Explore Live Wallpaper</h1>
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
              <button onClick={handleChooseDropdown} className="choose-wallpaper-btn"><i className="fas fa-filter"></i> <span>Sort:</span>  {sort} <i className="fas fa-angle-down"></i></button>
              {chooseWallpaper && (
        <div className="choose-wallpaper">
          <div className="mini-choose-wallpaper-conatiner">
          <div className="choose-wallpaper-dropdown"> 
          <i className="fas fa-random"></i> Random
          </div>
          <div className="choose-wallpaper-dropdown" >
          <i className="fas fa-clock"></i> Recent
          </div>
          <div className="choose-wallpaper-dropdown">
          <i className="fas fa-chart-line"></i> Downloads
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
  />
  <i className="fas fa-search"></i> 
</div>
            </div>
            
           </div>
           
           <Link to={'/explore'}>
        <h2 className="back-btn"><i className="fa-solid fa-left-long"></i> Back</h2>
        </Link>
    <div className="meme-page"> 
        <div className="meme-soon">
           <div className="meme-soon-container">
            <div className="meme-soon-mini-container" onClick={handleFun}>
            <i className={fun}></i>
            <h1>Meme will be added <span>Soon</span> </h1>
            </div>
           </div>
           </div>
           </div>
           </div>
            </div>
            </div>       
           </>
    )
}

export default Meme