import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Home() {
    return(
        <>
        <Hero />
        <Features />
        <Wallpaper/>
        {/* <GettingStarted /> */}
        {/* <ImageSlider /> */}
        <AboutCards />
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
        </div>
       </div>
       </div>
        </>
    )
};

function Features() {
    return(
        <>
        <div className="feature-container">
        <h1>Unlock Powerful Features</h1>
        <p className='feature-paragraph'>Unlock exclusive features like custom bio, profile banner, and unique links as you gain more likes and engage with the DreamWall community!</p>
        <div className="features-section">
        <div className="features-card">
        <i className="fas fa-pencil-alt"></i>
        <h3>Ability to Edit & Add Bio</h3>
            <p>Customize your profile by adding and editing your bio</p>
        </div>
        <div className="features-card">
        <i className="fas fa-user-circle"></i>
            <h3>Custom Profile</h3>
            <p>Unlock the ability to fully personalize your profile</p>
        </div>
        <div className="features-card">
        <i className="fas fa-image"></i>
            <h3>Custom Banner for Profile</h3>
            <p>Unlock the ability to fully personalize your profile</p>
        </div>
        <div className="features-card">
        <i className="fas fa-link"></i>
            <h3>Custom Profile Link</h3>
            <p>Create a custom link for your profile to share with others</p>
        </div>
        </div>
        </div>
        </>
    )
};


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