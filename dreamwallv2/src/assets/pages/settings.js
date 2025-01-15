import { Link, useNavigate } from "react-router-dom";


function Settings() {
const navigate = useNavigate();

const handleLogout = () => {
    navigate('/dashboard', {state: {triggerLogout: true}})
}

    const handleUploadClick = () => {
        navigate('/dashboard', { state: { triggerUpload: true } });
      };
    return(
        <>
        <div className="settings-container">
            <div className="left-settings">
                 <div className="left-dashboard">
                                <div className="left-dash-bar">
                                  <div className="left-section">
                              <Link to={'/dashboard'}><h3><i class="fas fa-home"></i> Dashbaord</h3>  </Link>
                              <h3 onClick={handleUploadClick}><i class="fas fa-cloud"></i> Upload</h3> 
                               <Link to={'/dashboard/analytics'}><h3><i class="fas fa-chart-line"></i>  Analytics</h3></Link>
                               <Link to={'/dashboard/settings'}><h3><i class="fas fa-user-cog"></i> Settings</h3></Link>
                               <h3 onClick={handleLogout} className="log-out-btn"><i class="fas fa-sign-out-alt"></i> Logout</h3> 
                               </div>
                               </div>
                              </div>
            </div>
            <div className="right-settings">
                <h1>Settings <i class="fas fa-user-cog"></i></h1> 
                <div className="right-mini-settings">
                <div className="right-settings-section">
                    <div className="right-setting-box">
                    <i class="fas fa-signature"></i>
                    <h4>Change Name</h4>
                    <input type="text" />
                    </div>
                    <div className="right-setting-box">
                    <i class="fas fa-unlock"></i>
                    <h4>Change Password</h4>
                    <input type="text" />
                    </div>
                    <div className="right-setting-box">
                    <i class="fas fa-user-minus"></i>
                    <h3>Delete Account</h3>
                    <p>Once an account is deleted, all associated data will be permanently lost. DreamWall will not be held liable for any consequences.</p>
                    </div>
                </div>
                <div className="profile-edit-container">
            <div className="profile-mini-container">
         <div className="profile-edit-section">
          <h2>Profile</h2>
             <p className="profile-subheading">Profile Name</p>
             <input 
  type="text" 
  id="profile-username" 
  placeholder={"Enter your username"} 
 
  name="profile-username" 
/>

             <hr  className="profile-line"/>
             <p className="profile-subheading">Profile Logo</p>
             <label htmlFor="profile-logo" className="profile-logo-btn">Change Logo<i class="fas fa-user-circle"></i></label>
             <input type="file" id="profile-logo" style={{display: 'none'}} />
             <hr className="profile-line"/>
             <p className="profile-subheading">Profile Banner</p>
             <label htmlFor="profile-banner" className="profile-banner-btn">Change Banner <i class="fas fa-magic"></i></label>
             <input type="input" id="profile-banner"/>
             <hr className="profile-line"/>
             <p className="profile-subheading">About Me</p>
             <div className="text-area">
            <textarea type="text" id="profile-aboutme"></textarea>
            </div>
            <hr className="profile-line"/>
            <div className="new-feature-soon">
            <h4>New Feature Soon!</h4>
            <ul>
            <li>Banner & Logo Resizing will be added Soon!</li>
          </ul>
          <button className="save-btn">Save</button>

          <br /><br />
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

export default Settings;