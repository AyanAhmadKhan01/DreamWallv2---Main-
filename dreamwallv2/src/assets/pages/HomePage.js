import { useEffect, useState, useRef } from 'react';
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
        <Link to={'/documentation'}><button className='hero-btn-gettingstarted'><i className="fas fa-lightbulb"></i>Getting Started</button></Link>
       <Link to={'/explore'}><button className='hero-btn-explore'><i className="fas fa-layer-group"></i>Explore</button></Link> 
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
        <h1>Analytics <span><i className="fas fa-circle"></i>Live</span></h1>
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
                    <i className="fas fa-heart"></i>
                    <i className="far fa-copy"></i>
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

  const [isLatest, setIsLatest] = useState([]);

  useEffect(() => {
    const fetchLatestWallpaper = async() => {
      try {
        const response = await fetch(process.env.REACT_APP_LATEST_WALLPAPER, {
          method: 'GET',
        });
        const data = await response.json(response);
        setIsLatest(data);
      } catch (err) {
        console.error('Failed to fetch Latest Wallpaper', err)
      }
    }
    fetchLatestWallpaper();
  },[])

  
  const scrollUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
    return(
        <>
        <div className="latest-wallpaper-container">
        <h1>Latest New Wallpaper</h1>
            <div className="latest-walllpaper-section">
            {isLatest.map((latest, index) => (
              <Link to={`/explore/${latest.linkCopy}`}key={index}>
                <div className="latest-wallpaper-box">
                <img src={latest.imgLink}/>
                <h2>{latest.uploaderName} <span><i className="fas fa-heart"> </i> {latest.likes}</span>  <span>{latest.downloads} Downloads</span></h2>
                </div>
                </Link>
                      ))}
                <Link to={'/explore'}><button className='explore-all-wallpapers' onClick={scrollUp}><i className="fas fa-rocket"></i> Explore all wallpapers</button></Link>   
            </div>
        </div>
        </>
    )
}


function TopCreator() {
const [TopMember, setTopMember] = useState([]);

    useEffect(() => {
      const fetchTopLeaderboard = async() => {
        try {
          const response = await fetch(process.env.REACT_APP_TOP_LEADERBOARD, {
            method: 'GET',
          });
          const data = await response.json();
          setTopMember(data);
        } catch (err) {
          console.error('Failed to fetch top Leaderbaord');
        }
      } 
      fetchTopLeaderboard();
    }, [])

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
          onDragStart={handleImageDragStart}
        >
          {TopMember
          .sort((a , b) => a.rank - b.rank)
          .map((members, index) => (
             <Link to={`/profile/${members.profileUrl}`} key={index} >
            <div className="top-creator-box">
              <span className={`rank  ${index === 0 ? 'firstrank' : ''}`}>{members.rank}</span>
              <img
                src={members.profileLogo}
                alt={`creator-${index}`}
              />
              <h2>{members.user}</h2>
              <h3>
                Downloads 
                <span>
                  <i className="far fa-arrow-alt-circle-down"></i> {members.downloads}
                </span>
              </h3>
            </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }


  function Promotion() {
    return(
        <>
        {/* <div className="promotion-container">
        <h1>More Works from the <span>Creator of DreamWall</span> </h1>
            <div className="promotion-section">
              <Link to={'/'}>
                <div className="promotion-box">
                  <img src="https://res.cloudinary.com/dt5qoqw6u/image/upload/v1751288371/nrdtax7jdqcvhwde0xiu.png" alt="" />
                    <h2>Mess Management <i className="fab fa-rocketchat"></i></h2>
                   <p>Efficiently handle daily canteen operations with our Mess Management System — designed for hostels, colleges, and institutions. From student registration and meal scheduling to attendance tracking and payment management, the system simplifies it all in one place. Ensure transparency, reduce food wastage, and streamline mess administration with a user-friendly and automated solution.</p>
                </div>
                </Link>
                 <Link to={'https://devlegend.vercel.app'}>
                <div className="promotion-box">
                <img className='portfolio-img' src="https://res.cloudinary.com/dt5qoqw6u/image/upload/v1751410304/jgwdf324r8kujqiyci1h.png" alt="" />
                   <h2>Portfolio <i className="fas fa-briefcase"></i></h2>
<p>Welcome to my portfolio! I’m a passionate MERN stack developer focused on building dynamic, user-centric web applications. From crafting intuitive interfaces to developing robust backend systems, I strive to deliver seamless digital experiences. Explore my work to see how I turn ideas into clean, scalable, and visually compelling solutions using modern development practices.</p>
                </div>
                </Link>
                <Link to={'https://levelcard.vercel.app'}>
                <div className="promotion-box">
                  <img src="https://res.cloudinary.com/dt5qoqw6u/image/upload/v1748003658/aabeefcnbg3iphuce1fe.png"/>
                    <h2>Portfolio Builder <i className="far fa-gem"></i></h2>
                  <p>Level Card is a sleek, no-code portfolio builder designed for developers and creatives who want to showcase their work without writing a single line of code. Featuring drag-and-drop customization, real-time previews, and modern UI templates, it empowers users to build professional portfolios in minutes. Whether you're a beginner or a pro, Level Card makes personal branding effortless and elegant.</p>
                </div>
                </Link>
            </div>
        </div> */}
        </>
    )
  }