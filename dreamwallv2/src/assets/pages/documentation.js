import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function Documentation() {
  const [sideMenu, setSideMenu] = useState(true);
  const [menuBtn, setMenuBtn] = useState(true);
  const [isAnimation, setIsAnimation] = useState(false);


  const OpenSideMenu = () => {
    setSideMenu(true); 
    setMenuBtn(false);
    setTimeout(() => {
      setIsAnimation(true)
    },0)
  };

  const ClosesideMenu = () => {
    setIsAnimation(false) 
    setMenuBtn(true);
    setTimeout(() => {
      setSideMenu(false);
    },400)
  };

  useEffect(() => {
    const updateMenuState = () => {
      setSideMenu(window.innerWidth >= 1000);
      setMenuBtn(window.innerWidth <= 1000)
      setTimeout(() => {
        setIsAnimation((prev) => !prev)
      },100)
    };

    updateMenuState();
    window.addEventListener('resize', updateMenuState)
  },[])

    return(
        <>
        <div className="documentation-container">
            <div className="documentation-section">           
                 <SideDoucmentMenu sideMenu={sideMenu} isAnimation={isAnimation} ClosesideMenu={ClosesideMenu}/>
                <div className="right-documentation">
                <i class="fa-solid fa-bars" onClick={OpenSideMenu}></i>
            
                <Routes>
                        <Route path="/" element={<Introduction />} />
                        <Route path="/howtoupload" element={<HowToUpload />} />
                        <Route path="/managewallpaper" element={<ManageWallpaper />} />
                        <Route path="/createaccount" element={<CreateAccount />} />
                        <Route path="/profilesettings" element={<ProfileSettings />} />
                        <Route path="/becomemoderator" element={<BecomeModerator />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/support" element={<Support />} />
                    </Routes>
                </div>
            </div>
        </div>
        </>
    )
}
export default Documentation;


function SideDoucmentMenu({ sideMenu, isAnimation, ClosesideMenu }) {
 

    return(
        <>
        {sideMenu && (
        <div className={`left-documentation-conatiner ${isAnimation ? 'left-documentation-show' : 'left-documentation-hide'}`}>
        <i class="fa-solid fa-bars" onClick={ClosesideMenu}></i>
        <div className="left-documentation">                  
                   <Link to={'/documentation'}><h3><i class="fas fa-book"></i> Introduction</h3> </Link>
                   <Link to={'/documentation/howtoupload'}><h3><i class="fas fa-cloud-upload-alt"></i> How To Upload</h3></Link>   
                   <Link to={'/documentation/managewallpaper'}><h3><i class="fas fa-image"></i> Manage Wallpaper</h3></Link> 
                   <Link to={'/documentation/createaccount'}><h3><i class="fas fa-user"></i> Create Account</h3></Link>
                   <Link to={'/documentation/profilesettings'}><h3><i class="fas fa-user-cog"></i> Profile Settings</h3> </Link>
                   <Link to={'/documentation/becomemoderator'}><h3><i class="fas fa-user-shield"></i> Become Moderator</h3></Link>   
                   <Link to={'/documentation/faq'}><h3><i class="fas fa-question-circle"></i> Faq</h3> </Link>   
                   <Link to={'/documentation/support'}><h3><i class="fas fa-info-circle"></i> Support</h3></Link>
                   </div>
                   </div>
                    )}
        </>
    )
}



export function Introduction() {
    return (
      <>
      <div className="documentation-main-container">
         <h1>Introduction t<span className="heading-span">o DreamWall</span></h1>
         <p>Welcome to DreamWall! Here’s everything you need to know to get started with our premium wallpaper community!</p>
         <h2>1. High-Quality Wallpaper Collection</h2>
      <p>
        DreamWall offers a vast library of stunning, high-resolution wallpapers across various categories. Whether you love nature, technology, abstract art, or anime, you'll find wallpapers that suit your style. Our collection is constantly updated, ensuring fresh and trending designs.
      </p>

      <h2>2. Easy Upload & Sharing System</h2>
      <p>
        Uploading wallpapers has never been easier! With our simple and intuitive upload system, you can add your own wallpapers in just a few clicks. Simply go to the Upload section, select your image, add tags, and share it with the community.
      </p>

      <h2>3. Interactive Comments & Likes</h2>
      <p>
        Engage with the DreamWall community through our interactive features. Like your favorite wallpapers, leave comments, and join discussions. This helps in discovering trending wallpapers and supporting talented creators.
      </p>

      <h2>4. Profile Customization Options</h2>
      <p>
        Personalize your DreamWall experience with customizable profiles. Upload a profile picture, write a bio, and showcase your favorite wallpapers. Make your profile stand out and connect with other wallpaper enthusiasts.
      </p>

      <h2>5. Moderation Tools for Trusted Users</h2>
      <p>
        Selected and trusted users can access special moderation tools to keep DreamWall a safe and high-quality platform. Moderators can review reports, remove inappropriate content, and help maintain a positive environment.
      </p>

      <h2>6. Responsive Design Across Devices</h2>
      <p>
        DreamWall is designed with a fully responsive layout, ensuring a smooth experience across all devices. Whether you're browsing on a desktop, tablet, or smartphone, DreamWall adapts seamlessly for optimal viewing.
      </p>
      </div>
      </>
    );
  }
  
 export function HowToUpload() {
    return (
      <>
      <div className="documentation-main-container">
      <h1>How to <span className="heading-span">Upload Wallpapers</span></h1>
      <h3>To upload a wallpaper, follow these steps</h3>

      <p>
  <span className="steps">Step 1 <i className="fa-solid fa-check"></i></span> Login or Register - Access the DreamWall dashboard using your credentials.
</p>
<div className="img-div">
  <Link to={'/signup'} target="_blank">
<img src="/img/registerimg.png" alt="register" />
</Link>
<Link to={'/login'} target="_blank">
<img src="/img/Loginimg.png" alt="login" />
</Link>
</div>
      <p>
      <span className="steps">Step 2 <i className="fa-solid fa-check"></i></span> Go to Upload Section - Click on the "Upload" tab or button located on the dashboard.
      </p>
      <img src="/img/upload section.PNG" alt="dashboard-upload" className="documentation-dashboard-upload" />
      <p>
      <span className="steps">Step 3 <i className="fa-solid fa-check"></i></span> Select Wallpaper - Browse your device for the wallpaper you wish to upload.
      </p>
      <img src="/img/choose wallpaper.PNG" alt="choose-wallpaper-img" className="choose-wallpaper" />
      <p>
      <span className="steps">Step 4 <i className="fa-solid fa-check"></i></span> Add Details - Fill in the title and tags for better visibility.
      </p>
      <img src="/img/Upload landscape.PNG" alt="upload-img" className="upload-wallpaper"/>
      <p>
      <span className="steps">Step 5 <i className="fa-solid fa-check"></i></span> Upload Now - Click "Upload" to submit your creation.
      </p>
    </div>
      </>
    );
  }
  
export function ManageWallpaper() {
    return (
      <>
       <div className="documentation-main-container">
      <h1>Managing <span className="heading-span">Your Wallpapers</span></h1>
<h4>After uploading, you can manage your wallpapers through the dashboard</h4>

<p><span className="documentation-delete">Delete <i class="fa-solid fa-trash-can"></i></span> Remove any wallpaper by clicking the delete button.</p>
<p><span className="documentation-copy">Copy <i class="fa-solid fa-copy"></i></span> Use the copy icon to get the download link.</p>
<p> <span className="documentation-open">Open <i class="fa-solid fa-file"></i></span> View the wallpaper directly in a new tab.</p>
<img src="/img/Dashboard.PNG" alt="dashbaord" className="documentation-dashboard-image" />
</div>
      </>
    );
  }
  
export function CreateAccount() {
    return (
      <>
<div className="documentation-main-container">
      <h1>Create a<span className="heading-span">n Account</span></h1>
        <br/>
        <span className="steps">Step 1 <i className="fa-solid fa-check"></i></span> Click on the "Register" option in Navbar
        <br/>
        <span className="steps">Step 2 <i className="fa-solid fa-check"></i></span> Fill in your personal details including email, username, and password
        <br/>
        <span className="steps">Step 3 <i className="fa-solid fa-check"></i></span> Confirm registration by clicking on the link sent to your email
        <br/>
        <span className="steps">Step 4 <i className="fa-solid fa-check"></i></span> Login with your credentials to access the platform
    </div>

      </>
    );
  }
  
 export function ProfileSettings() {
    return (
      <>
      <div className="documentation-main-container">
     <h1>Profile <span className="heading-span">Settings</span></h1>
<h2>Update Profile Picture and Banner</h2>
<p>Customize your profile by uploading a new profile picture and banner to make your account stand out.</p>

<h2>Edit Username and Password</h2>
<p>Keep your account secure by updating your username and password anytime through the settings page.</p>

<h2>View Wallpaper Statistics</h2>
<p>Track the performance of your uploaded wallpapers, including views, likes, and downloads.</p>
</div>
      </>
    );
  }
  
 export function BecomeModerator() {
    return (
      <>
      <div className="documentation-main-container">
      <h1>Become a <span className="heading-span">Moderator</span></h1>
<p>Becoming a moderator is an honor that comes with great responsibilities. To apply, follow these steps:</p>

<h2>Step 1: Follow Our Social Media</h2>
<p>Stay updated and connected by following <b>DevLegend</b> aka <b>Ayan Ahmad Khan</b> on social media.</p>

<h2>Step 2: Join Our Discord Server</h2>
<p>Engage with the community and moderators by joining our official Discord server through the platform.</p>

<h2>Step 3: Participate in the Interview</h2>
<p>Attend the interview session arranged by <b>Ayan Ahmad Khan</b> to showcase your understanding of the platform.</p>

<h2>Step 4: Earn Moderator Status</h2>
<p>Successfully passing the interview grants you moderator privileges, allowing you to help maintain the community.</p>
</div>
      </>
    );
  }
  
 export function FAQ() {
    return (
      <>
         <div className="documentation-main-container">
       <h1><span className="heading-span">FAQ</span></h1>

<h2>How do I download a wallpaper?</h2>
<p>Click the <b>download</b> button or copy and paste the link to save the wallpaper.</p>

<h2>Can I share my wallpaper on social media?</h2>
<p>Yes, you can share your wallpaper, but make sure to provide to the original creator.</p>

<h2>What are the dimensions available?</h2>
<p>Wallpapers are available in various sizes, ranging from <b>1920x1080</b> to <b>3840x2160</b> based on your preference.</p>
</div>
      </>
    );
  }
  
 export function Support() {
    return (
      <>
<div className="documentation-main-container">
     <h1>Sup<span className="heading-span">port</span></h1>
<h2>General Inquiries</h2>
<p>For any general questions or information, reach out to us at  <Link to={'https://discord.gg/KTsFkJmVFc'} className="discord-docs"><b> Discord</b></Link></p>

<h2>Wallpaper Removal</h2>
<p>If you need to report or request the removal of a wallpaper, contact us at  <Link to={'https://discord.gg/KTsFkJmVFc'} className="discord-docs"><b> Discord</b></Link></p>

<h2>Technical Issues</h2>
<p>Facing technical difficulties? Get in touch with our support team at     
   <Link to={'https://discord.gg/KTsFkJmVFc'} className="discord-docs"><b> Discord</b></Link></p>

<h2>© 2025 DreamWall</h2>
<p>All rights reserved. DreamWall is a platform dedicated to wallpaper enthusiasts, ensuring a seamless experience for all users.</p>
</div>
      </>
    );
  }
  