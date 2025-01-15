import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Home() {
    return(
        <>
        <Hero />
        <BentoBox />
        {/* <Wallpaper/> */}
        {/* <GettingStarted /> */}
        {/* <ImageSlider /> */}
        {/* <AboutCards /> */}
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
                    
                   </div>
                </div>
            </div>
        </div>
        </>
    )
}



function Wallpaper() {
    return(
        <>
        <div className="wallpaper-container">
            <div className="wallpaper-section">
                <div className="wallpaper-mini-section">
                <h1>Top Rated Wallpaper</h1>
                <p>Explore wallpapers loved by our community! Our top-rated collection is shaped by users like you, with each wallpaper climbing the ranks based on community favorites. Discover trending styles, unique art, and stunning visuals that have captured the most likes.</p>
                <button className="signup-button">
                       Sign Up & Share Your Wallpapers <i className="fas fa-arrow-right"></i>
                     </button>
                </div>
                <div className="wallpaper-mini-section"> 
                    <img src="img\Wallpapers\Wallpaper 1.jpg" alt="wallpaper" />
                    <img src="img\Wallpapers\Wallpaper 6.jpg" alt="wallpaper" />
                </div>
            </div>
        </div>
        </>
    )
}


function GettingStarted() {
    return(
        <>
          <div className="getting-section">
            <div className="getting-started">
                <h1>Getting Started</h1>
                <h2>How To Upload</h2>
                <div className="getting-started-container">
                <div className="dreamwall-tutorial">
                    <div className="dreamwall-tutorial">
                <video src="Dream Wall.mp4" loop muted poster="img\dream wall 1.png" id="myVideo"></video>
            </div>
        </div>
    </div>
            </div>
        </div>
        </>
    )
};

function ImageSlider() {

    const SliderImage = [
        {id: 1, src:'/img/Slides/1.jpg'},
        {id: 2, src:'/img/Slides/2.png'},
        {id: 3, src:'/img/Slides/3.png'},
        {id: 4, src:'/img/Slides/4.png'},
        {id: 5, src:'/img/Slides/5.png'},
        {id: 6, src:'/img/Slides/6.jpg'},
        {id: 7, src:'/img/Slides/7.png'},
        {id: 8, src:'/img/Slides/8.png'},
        {id: 9, src:'/img/Slides/9.jpg'},
        {id: 10, src:'/img/Slides/10.png'},
        {id: 11, src:'/img/Slides/11.jpg'},
    ]

    return(
        <>
         <div className="feature">
            <h2>Top Rated Wallpaper</h2>
            <h4 className="border-bottom"></h4>
            <div className="feature-section">
                <div id="slider-container">
                  {SliderImage.map((image) => (
                    <img src={image.src} id="slider-img" alt={`Slider Image ${image.id}`} />
                  ))}
                  </div>
        </div>
    </div>
        </>
    )
}


function AboutCards() {
    return(
        <>
        <section className="about-page">
    <div className="about-cards">

        <div className="about">
            <div className="about-flex-container">
            <div className="about-section">
                <h1>Our Mission</h1>
                <p>At Dream Wall, we believe that beautiful digital decorations can transform screens and uplift moods. Our mission is to build a vibrant community of wallpaper enthusiasts who can explore, share, and inspire each other through stunning visuals.</p>
                <br/>
                <p>We aim to provide a platform where creativity knows no bounds, allowing everyone to find wallpapers that reflect their unique style. Here, artists can showcase their work to a global audience. By fostering a space for artistic expression and connection, we hope to add a touch of beauty and inspiration to everyday life.</p>
                <br/>
                <p>Join us in our mission to make every screen a masterpiece and every moment a bit more beautiful.</p>
            </div>
            <div className="about-section">
              <img src="img\50194.jpg" className="our-misson"/>
            </div>
        </div>
        </div>

    </div>
    <div className="about-cards">
    <div className="what-we-offer-container">
        <h1>What We Offer</h1> 
        <p id="offer-text">At Dream Wall, we provide a comprehensive platform for wallpaper enthusiasts. Whether you're looking to explore, download, or upload stunning wallpapers, our offerings cater to all your needs.</p>

    </div> 
    </div>
    <div className="about-cards">

        <div className="what-we-offer-container">
            <div className="what-we-offer">
                <div className="text-offer">
                <div className="what-we-offer-section gallery-image">
                 <img src="img\design.png"/>
            </div>
            <p className="img-text">Dive into our curated collection of high-definition and 4K wallpapers. Discover serene landscapes, captivating cityscapes, and mesmerizing abstract art—all designed to transform your digital space.</p>
        </div>
        <div className="text-offer">
            <div className="what-we-offer-section gallery-image">
                <img src="img/image.png"/>
            </div>
            <p>Enhance your screens with our collection of high-quality wallpapers. Browse and download effortlessly to bring beauty and inspiration to your devices.
            </p>
            </div>
            <div className="text-offer">
            <div className="what-we-offer-section gallery-image">
                <img src="img\design 2.png" className="card-gallery-img"/>
            </div>
            <p className="img-text">Create an account on Dream Wall to start uploading and sharing your stunning wallpapers. Join a vibrant community of creators and showcase your artistic talents to wallpaper enthusiasts worldwide.
            </p>
            </div>
            </div>
        </div> 

    </div>
    <div className="about-cards">
        <div className="join-container">
            <h1>Join Us Now</h1>
            <p className="img-text">Embark on your journey with Dream Wall today. Join our vibrant community of wallpaper enthusiasts, where creativity knows no bounds. Sign up now to discover, share, and inspire with stunning digital art.</p>
            <h5><Link to={'/signup'}>Sign Up</Link></h5>
        <div className="join-section">
            <div className="join-sub-section">
                <i className="fab fa-discord" data-url="https://discord.gg/z7agFHxwJT" data-target="_blank" onclick="openLink(this)"></i>
            </div>
            <div className="join-sub-section" data-url="https://github.com/AyanAhmadKhan01" data-target="_blank" onclick="openLink(this)">
                <i className="fab fa-github"></i>
            </div>
            <div className="join-sub-section" data-url="https://www.linkedin.com/in/ayanahmadkhan/" data-target="_blank" onclick="openLink(this)">
                <i className="fab fa-linkedin"></i>
            </div>
        </div>
    </div>
    </div>
</section>
        </>
    )
};