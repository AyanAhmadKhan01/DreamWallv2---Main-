import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TopCreators } from './Community';


function Home() {
    return(
        <>
        <Hero />
        <BentoBox />
        <NewWallpaper />
        <TopCreator />
        <Promotion />
        </>
    )
};


export default Home;


function Hero() {
    useEffect(() => { 
 document.title = 'Dream Wall V2 - Home'
}, [])
    return(
        <>
        <div className="hero-container">
       <div className="hero-section">
        <h1>Discover, Share, and Personalize <br /> Your Screen with DreamWall</h1>
        <p>Explore, upload, and download stunning wallpapers. Like, share, and connect with a community of wallpaper lovers on DreamWall – where your screen is always fresh</p>
        <div className="hero-btn">
        <button className='hero-btn-gettingstarted'><i className="fas fa-lightbulb"></i>Getting Started</button>
        <button className='hero-btn-explore'><i className="fas fa-layer-group"></i>Explore</button>
        <div className="circle-dream-wall"></div>  
        <div className="background-color"></div>  
        </div>
       </div>
       </div>
        </>
    )
};


function BentoBox() {
    return(
        <>
        <div className="bento-container">
            <div className="bento-section">
                <div className="bento-box">
                <div className="explore-card-home">
              <img src="/img/Wallpapers/1934580.jpg"/>
              <div className="leftbar">
                <div className="leftbar-section">
                  <h6><i className="far fa-heart"></i></h6>  
                  <h5><i className="far fa-clone"></i></h5>
                 </div>
                <label>Mobile</label>
                <div className="leftbar-text">
                  <h2>100 downloads  ● 7 days ago</h2>
                </div>
                
              <h1 className='uploader-name'>Dream Wall</h1>
            <h3>Space Wallpaper</h3>
              </div>
            </div>
        
                <div className="explore-card-home">
              <img src="/img/Wallpapers/Wallpaper 1.jpg" alt="" />
              <div className="leftbar">
                <div className="leftbar-section">
                  <h6><i className="far fa-heart"></i></h6>  
                  <h5><i className="far fa-clone"></i></h5>
                 </div>
                <label>PC</label>
                <div className="leftbar-text">
                  <h2>16 downloads  ● 1 days ago</h2>
                </div>
                
              <h1 className='uploader-name'>Dream Wall</h1>
            <h3>Anime Wallpaper</h3>
              </div>
            </div>
        
           
<div className="bento-box-graph">
<div className="bento-box-graph-section">
    <div className="analytics">
        <h1>Analytics <span><i class="fas fa-circle"></i>Live</span></h1>
        </div>
        <div className="analytics-box-container">
        <div className="analytics-box">
        <h2>TOTAL DOWNLOADS</h2>
        <h3>10000</h3>
        <h4>Daily Download <p>52</p></h4>
        </div>
        <div className="analytics-box">
        <h2>TOTAL Likes</h2>
        <h3>100</h3>
        <h4>Daily Likes <p>99</p></h4>
        </div>
        </div>
        <h1></h1>
    </div>
</div>
<div className="bento-btn-box">
    <div className="bento-btn-section">
                    <i class="fas fa-heart"></i>
                    <i class="far fa-copy"></i>
                    </div>
                    </div>
                   <div className="bento-profile-box">
                    <img src="/img/DreamWall-Banner.png" className='bento-banner' />
                    <img src="/img/dreamwall-logo.png" className='bento-logo' />
                    <h1>Dream Wall</h1>
                    <h5>Joined on July 17, 2024</h5>
                    <div className="bento-profile-option">
                    <h3>Wallpapers</h3>
                    <h3>Post</h3>
                    <h3>About</h3>
                    </div>
                    <div className="bento-wallpaper-container">
                    <div className="bento-wallpapers">
                        <img src="/img/Wallpapers/Wallpaper 5.jpg"/>
                    </div>
                    <div className="bento-wallpapers">
                        <img src="/img/Wallpapers/Wallpaper 7.jpg"/>
                    </div>
                    <div className="bento-wallpapers">
                        <img src="/img/Wallpapers/Wallpaper 10.jpg"/>
                    </div>
                    </div>
                   </div>
                </div>
            </div>
        </div>
        </>
    )
}


function NewWallpaper() {
    return(
        <>
        <div className="latest-wallpaper-container">
        <h1>Latest New Wallpaper</h1>
            <div className="latest-walllpaper-section">
                <div className="latest-wallpaper-box">
                <img src="/img/Wallpapers/Wallpaper 9.jpg"/>
                <h2>DevLegend <span><i class="fas fa-heart"> </i> 5</span>  <span>4 Downloads</span></h2>
                </div>
                <div className="latest-wallpaper-box">
                <img src="/img/Wallpapers/Wallpaper 9.jpg"/>
                <h2>DevLegend <span><i class="fas fa-heart"> </i> 5</span>  <span>4 Downloads</span></h2>
                </div>
                <div className="latest-wallpaper-box">
                <img src="/img/Wallpapers/Wallpaper 9.jpg"/>
                <h2>DevLegend <span><i class="fas fa-heart"> </i> 5</span>  <span>4 Downloads</span></h2>
                </div>
                <div className="latest-wallpaper-box">
                <img src="/img/Wallpapers/Wallpaper 9.jpg"/>
                <h2>DevLegend <span><i class="fas fa-heart"> </i> 5</span>  <span>4 Downloads</span></h2>
                </div>
                <div className="latest-wallpaper-box">
                <img src="/img/Wallpapers/Wallpaper 9.jpg"/>
                <h2>DevLegend <span><i class="fas fa-heart"> </i> 5</span>  <span>4 Downloads</span></h2>
                </div>
                <div className="latest-wallpaper-box">
                <img src="/img/Wallpapers/Wallpaper 9.jpg"/>
                <h2>DevLegend <span><i class="fas fa-heart"> </i> 5</span>  <span>99 Downloads</span></h2>
                </div>
                <button className='explore-all-wallpapers'><i class="fas fa-rocket"></i> Explore all wallpapers</button>
            </div>
        </div>
        </>
    )
}


function TopCreator() {
    const TopMember = useContext(TopCreators);
    console.log(TopMember)
  
    const carouselRef = useRef(null);
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
  
    const handleMouseDown = (e) => {
      isDragging = true;
      carouselRef.current.classList.add("dragging");
      startX = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft = carouselRef.current.scrollLeft;
  
     
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseLeave);
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX) * 0.8; 
      carouselRef.current.scrollLeft = scrollLeft - walk;
    };
  
    const handleMouseUp = () => {
      isDragging = false;
      carouselRef.current.classList.remove("dragging");
  
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  
    const handleMouseLeave = () => {
      isDragging = false;
      carouselRef.current.classList.remove("dragging");
  
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  

    const handleImageDragStart = (e) => {
        e.preventDefault(); 
      };

    return (
      <div className="top-creators">
        <h1>
          <span>
            <i className="fas fa-trophy"></i>
          </span>{" "}
          Top Creators in <span>last 24 hours</span>
        </h1>
        <div
          className="top-creator-section"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
        >
          {TopMember.map((members, index) => (
            <div key={index} className="top-creator-box">
              <img
                src={members.profileLogo}
                alt={`creator-${index}`}
                onDragStart={handleImageDragStart} 
              />
              <h2>{members.username}</h2>
              <h3>
                Downloads {}
                <span>
                  <i className="far fa-arrow-alt-circle-down"></i> 66
                </span>
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }


  function Promotion() {
    return(
        <>
        <div className="promotion-container">
        <h1>More Works from the <span>Creator of DreamWall</span> </h1>
            <div className="promotion-section">
                <div className="promotion-box">
                    <h2>Chatting App <i class="fab fa-rocketchat"></i></h2>
                </div>
                <div className="promotion-box">
                    <h2>Portfolio <i class="fas fa-briefcase"></i></h2>
                </div>
                <div className="promotion-box">
                    <h2>Soon! <i class="far fa-gem"></i></h2>
                </div>
            </div>
        </div>
        </>
    )
  }