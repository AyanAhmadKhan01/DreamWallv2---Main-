import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react';


function Profile() {
  const { profileUrl } = useParams(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [profileSection, setProfileSection ] = useState('wallpapers');

  const handlePageLoad = (section) => {
    setProfileSection(section)
  }

  const [profileupload, setProfileUploads] = useState([]);

  useEffect(() => {
    const profileUploads = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/wallpaper/display', {
          method: 'GET',
      })
      const data = await response.json();
      setProfileUploads(data);
      } catch (err) {
        console.error('Failed to fetch', err)
      }
    }
    profileUploads();
  }, [])


  const [bannerMenu, setBannerMenu ] = useState(false);


  useEffect(() => {
    if(bannerMenu) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [bannerMenu])

  const openBannerMenu = () => setBannerMenu(true)
  const closeBannerMenu = () => setBannerMenu(false)

  

  const copyToClipboard = () => {
    const linkToCopy = `http://localhost:3000/profile/${profile.profileUrl}`;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/profile?profileUrl=${profileUrl}`);
        if (!response.ok) {
          throw new Error('User Profile Not Available');
        }
        const data = await response.json();
        setProfile(data); 
        setLoading(false);
        document.title = `Dream Wall V2 - ${data.username}`
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileUrl]);

  const [ bannerPreview, setBannerPreview ] = useState(null);
  const [ logoPreview, setLogoPreview ] = useState(null);

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const [userinfo, setUserInfo ] = useState({
    username: '',
    profileAbout: ''
  })


  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

 
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const updateProfile = async () => {
    try {
      const UpdatedData = {
        profileUrl: profile.profileUrl,
        username: userinfo.username,
        profileBanner: bannerPreview || profile.profileBanner,
        profileLogo: logoPreview || profile.profileLogo,
        profileAbout: userinfo.profileAbout,
      };
  
      const response = await fetch(`http://localhost:4000/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(UpdatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();  
        throw new Error(errorData.message || 'Failed To save Profile');
      }
  
      const data = await response.json();
      console.log('Profile Updated', data);
    } catch (err) {
      console.error('Error Updating Profile', err);
    }
  };
  
  const handleInputChange = (e) => {
    setUserInfo({
      ...userinfo,
      username: e.target.value,
    });
  };
  

  return (
    <div className="profile-container">
      {profile ? (
        <>
        <div className="profile-section">
          <div className="profile-mini-section">
          <img src={profile.profileBanner} alt="Banner" className="profile-banner"/>
          <img src={profile.profileLogo} alt={profile.username}  className="profile-logo"/>
          <i class="fas fa-cog" onClick={openBannerMenu}></i>
          <h1 className="username">{profile.username}</h1>
          <p className="account-create-date"> Joined on {new Date(profile.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
         })}</p>


        {bannerMenu && (
          <div className="profile-edit-container">
            <div className="profile-mini-container">
         <div className="profile-edit-section">
          <h2>Profile</h2>
             <i class="fas fa-times" aria-label="Close banner menu" onClick={closeBannerMenu}></i>
             <p className="profile-subheading">Profile Name</p>
             <input 
  type="text" 
  id="profile-username" 
  placeholder={profile.username || "Enter your username"} 
  value={userinfo.username} 
  name="profile-username" 
  onChange={(e) => handleInputChange(e)} 
/>

             <hr  className="profile-line"/>
             <p className="profile-subheading">Profile Logo</p>
             <label htmlFor="profile-logo" className="profile-logo-btn">Change Logo<i class="fas fa-user-circle"></i></label>
             <input type="file" id="profile-logo" onChange={handleLogoChange} style={{display: 'none'}} />
             <hr className="profile-line"/>
             <p className="profile-subheading">Profile Banner</p>
             <label htmlFor="profile-banner" className="profile-banner-btn">Change Banner <i class="fas fa-magic"></i></label>
             <input type="file" id="profile-banner" onChange={handleBannerChange} style={{display: 'none'}}/>
             <hr className="profile-line"/>
             <p className="profile-subheading">About Me</p>
             <div className="text-area" value={userinfo.profileAbout}>
            <textarea type="text" id="profile-aboutme">{profile.profileAbout}</textarea>
            </div>
            <hr className="profile-line"/>
            <div className="new-feature-soon">
            <h4>New Feature Soon!</h4>
            <ul>
            <li>Banner & Logo Resizing will be added Soon!</li>
          </ul>
          <button className="save-btn" onClick={updateProfile}>Save</button>

          <br /><br />
          </div>
            </div>
            <div className="preview-profile">
          
          <img
            className="profile-preview-banner"
            src={bannerPreview || profile.profileBanner}
            alt="Banner Preview"
          />  
     
            <img className="profile-preview-logo" 
          src={logoPreview || profile.profileLogo}
          alt="Logo Preview"
          />
          <h1 className="preview-username">{profile.username}</h1>
            </div>
            </div>
         </div>
      )}
<div className="profile-container-section">
          {/* <div className="profile-left">
          <div className="profile-link">
          <i class="far fa-copy" onClick={copyToClipboard}></i>
            <h6>Profile Link</h6>
          <a href={profile.profileUrl}>http://localhost:3000/profile/{profile.profileUrl}</a>
          </div>
          <div className="about-me-box">
            <h2>About Me</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae id aliquid officia consectetur voluptas ipsum culpa et, possimus eius, assumenda amet voluptates sequi corporis animi minus minima reiciendis? Dolore, repellendus.</p>
          </div>
          </div> */}
          <div className="profile-category">
            <div className="profile-links">
          <h6 onClick={() => handlePageLoad('wallpapers')}>Wallpapers</h6>
          <h6 onClick={() => handlePageLoad('post')}>Post</h6>
          <h6 onClick={() => handlePageLoad('about')}>About</h6>
          </div>
          {profileSection === 'wallpapers' && (
            <div className="wallpaper-container-section">
              <h1>wallpaper</h1>
              <div className="flex-container">
              {profileupload
              .filter((profileuploads) => profile.username === profileuploads.uploaderName)
              .map((profileUploads) => (
                <Link to={`http://localhost:3000/explore/${profileUploads.linkCopy}`} >
              <div className="wallpaper-conatiner-mini-section">
                <img src={profileUploads.imgLink}/>
                <h2>{profileUploads.wallpaperName}</h2>
                <div className="icons-section">
                <h3><i class="fas fa-heart"></i> {profileUploads.likes}</h3>
                <h3><i class="far fa-arrow-alt-circle-down"></i>  {profileUploads.downloads}</h3>
                </div>
               
              </div>
              </Link>
                ))}
                </div>
            </div>
          )}
          {profileSection === 'post' && (
             <div className="post-section">
               <h2>Under Development</h2>
               <p>You will be able to post and track analytics using the dashboard. A 'Post' section will be added in the Explore area, where you can attach images, use stickers, and add emojis. People can comment, like, and reply to your posts. Each post will have a custom link that you can share with anyone.</p>
             </div>
          )}
          {profileSection === 'about' && (
            <div className="about-profile-section">
               <h2>Under Development</h2>
               <p>You will be able to add your social links, and they will be displayed on your profile.</p>
            </div>
          )}
          </div>
          </div>
          </div>
          </div>
        </>
      ) : (
        <p>User Profile Not Available</p>
      )}
    </div>
  );
}

export default Profile;
