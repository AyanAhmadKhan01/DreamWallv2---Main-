import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


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
        const response = await fetch(process.env.REACT_APP_WALLPAPER_DISPLAY, {
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





  

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MATCHED_PROFILE}?profileUrl=${profileUrl}`);
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


  return (
    <div className="profile-container">
      {profile ? (
        <>
        <div className="profile-section">
          <div className="profile-mini-section">
          <img src={profile.profileBanner} alt="Banner" className="profile-banner"/>
          <img src={profile.profileLogo} alt={profile.username}  className="profile-logo"/>
          <h1 className="username">{profile.username}</h1>
          <p className="account-create-date"> Joined on {new Date(profile.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
         })}</p>
<div className="profile-container-section">
          <div className="profile-category">
            <div className="profile-links">
          <h6 onClick={() => handlePageLoad('wallpapers')}>Wallpapers</h6>
          <h6 onClick={() => handlePageLoad('post')}>Post</h6>
          <h6 onClick={() => handlePageLoad('about')}>About</h6>
          </div>
          {profileSection === 'wallpapers' && (
            <div className="wallpaper-container-section">
              <h1>wallpaper</h1>
              <div className="flex-wrap-conatiner">
               
              {profileupload
              .filter((profileuploads) => profile.username === profileuploads.uploaderName)
              .map((profileUploads) => (
                <Link to={`https://dreamwallv2.vercel.app/explore/${profileUploads.linkCopy}`} >
              <div className="wallpaper-container-mini-section">
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
<div className="profile-section">
          <div className="profile-mini-section">
          <div className="profile-banner" style={{ borderRadius: '20px', backgroundColor: '#808080'}}></div>
          <div className="profile-logo"  ></div>
          <h1 className="username">Loading...</h1>
          <p className="account-create-date">Loading...</p>
<div className="profile-container-section">
          <div className="profile-category">
            <div className="profile-links">
          <h6>Loading...</h6>
          <h6>Loading...</h6>
          <h6>Loading...</h6>
          </div>
          </div>
          </div>
          </div>
          </div>
      )}
    </div>
  );
}

export default Profile;
