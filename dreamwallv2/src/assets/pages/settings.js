import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


function Settings() {
const navigate = useNavigate();

const handleLogout = () => {
    navigate('/dashboard', {state: {triggerLogout: true}})
}

    const handleUploadClick = () => {
        navigate('/dashboard', { state: { triggerUpload: true } });
      };

      const [userInfo, setUserInfo] = useState();
const [isUpdated, setIsUpdated] = useState({
    password: '',
    profileLogo: '',
    profileBanner: '', 
});

const userdata = async() => {
    try {
        const response = await fetch(`https://dreamwall-backend.onrender.com/api/user/profile?profileUrl=${profile.profileUrl}`, {
            method: 'POST',
            body: JSON.stringify(isUpdated),
            headers: { 'Content-Type': 'application/json' },
        });
        if(!response.ok) {
            console.error('Failed to Update');
        }
    } catch (err) {
        console.error('Failed')
    }
}

const handleInput = (e) => {
    setIsUpdated({...isUpdated, [e.target.name]: e.target.value});
};


const [user, setUser] = useState(null);
const [profile, setProfile] = useState(null);
const [loading, setLoading] = useState(true);
const { profileUrl } = useParams();


useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://dreamwall-backend.onrender.com/api/user/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(data); 
  
          const matchResponse = await fetch(`https://dreamwall-backend.onrender.com/api/user/profileMatch?username=${data.username}`);
  
          if (matchResponse.ok) {
            const matchData = await matchResponse.json();
            const { profileUrl: matchedProfileUrl } = matchData;
  
           
            const profileResponse = await fetch(`https://dreamwall-backend.onrender.com/api/user/profile?profileUrl=${matchedProfileUrl}`);
  
            if (profileResponse.ok) {
              const profileData = await profileResponse.json();
              setProfile(profileData); 
            } else {
              throw new Error('Failed to fetch profile');
            }
          } else {
            throw new Error('Failed to match username');
          }
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  const [isClicked, setIsClicked] = useState(true);
  const [isMenuAnimating, setIsMenuAnimating] = useState(true);
  
  const OpenleftMenu = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsMenuAnimating(true)
    }, 0)
  }
  
  const CloseleftMenu = () => {
    setIsMenuAnimating(false)
    setTimeout(() => {
      setIsClicked(false);
    }, 300)
  }
  
  


  const [isEmpty, setIsEmpty] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

const handleChangeAlert = (e) => {
  const value = e.target.value;
  if(value.trim() === '') {
    setIsAnimating(false)
    setTimeout(() => {
      setIsEmpty(false);
    }, 300)
  } else {
    setIsEmpty(true)
    setTimeout(() => {
      setIsAnimating(true)
    }, 0)
  }
}

const clearValue = () => {
  setIsAnimating(false)
  setTimeout(() => {
    setIsEmpty(false);
  }, 300)
  setIsUpdated((prev) => ({...prev, profileLogo: '', profileBanner: '', password: ''}))
}

const [isSuccess, setIsSucess] = useState(false);
const [successAnimating, setSuccessAnimating] = useState(false);

const handleSuccess = () => {
  setIsSucess(true);
  setTimeout(() => {setSuccessAnimating(true)},10)
  setTimeout(() => {setSuccessAnimating(false)}, 2000)
  setTimeout(() => {setIsSucess(false)}, 3000)
}

const handleAccountDelete = async() => {
  try {
    const response = await fetch('https://dreamwall-backend.onrender.com/api/delete-request', {
      method: 'POST',
      body: JSON.stringify({username: user.username}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok) {
      console.error('Failed to delete')
    }

  } catch (err) {
    console.error('Failed delete Request')
  }
}

const handleAccountCancel = async() => {
  try {
    const response = await fetch('https://dreamwall-backend.onrender.com/api/cancel-request', {
      method: 'POST',
      body: JSON.stringify({username: user.username}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok) {
      console.error('Failed to cancel')
    }
  } catch (err) {
    console.error('Failed Cancel Request')
  }
}

const [deleteTimer, setDeleteTimer] = useState("");
const [isDeleteActive, setIsDeleteActive] = useState(false); 

useEffect(() => {
  if (!user?.deleteAt) {
    setIsDeleteActive(false);
    setDeleteTimer(""); 
    return;
  }

  const updateTimer = () => {
    const deleteAt = new Date(user.deleteAt);
    const now = new Date();
    
    const timeRemaining = deleteAt - now;

    if (timeRemaining <= 0) {
      setIsDeleteActive(false);
      setDeleteTimer("Time expired");
      return;
    }

    setIsDeleteActive(true);

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    setDeleteTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  updateTimer();
  const interval = setInterval(updateTimer, 1000);
  return () => clearInterval(interval);
}, [user?.deleteAt]); 

const handleDeleteRequest = () => {
  handleAccountDelete();
  window.location.reload();
};


const handleCancelRequest = () => {
  handleAccountCancel();
  window.location.reload();
};

    return(
        <>
        <div className="settings-container mobile-settings">
            <div className="left-settings left-all">
                 <div className="left-dashboard">
                                <div className="left-dash-bar">
                                  <div className="left-section">
                                  <i class="fa-solid fa-xmark" onClick={CloseleftMenu}></i>
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
                    <span>Not Available</span>
                    <h4>Change Name</h4>
                    <input type="text" />
                    </div>
                    <div className="right-setting-box">
                    <i class="fas fa-unlock"></i>
                    <h4>Change Password</h4>
                    <input type="text" 
                    name="password"
                    value={isUpdated.password}
                    onChange={(e) => {handleInput(e); handleChangeAlert(e);}}/>
                
                    </div>
                    <div className="right-setting-box">
                    <i class="fas fa-user-minus"></i>   
                    <span>{deleteTimer && isDeleteActive ? `Delete in: ${deleteTimer}` : "No Delete Request"}</span>
                    {!isDeleteActive ? (
      <h3 onClick={handleDeleteRequest}>Delete Account</h3>
    ) : (
      <h3 onClick={handleCancelRequest}>Cancel</h3>
    )}
                    <p>Once an account is deleted, all associated data will be permanently lost. DreamWall will not be held liable for any consequences.</p>
                    </div>
                </div>
                <div className="profile-edit-container">
            <div className="profile-mini-container">
         <div className="profile-edit-section">
          <h2>Profile <span>(Paste the Link)</span></h2>
             <p className="profile-subheading">Profile Logo</p>
             <input type="text"
              id="profile-logo"
              name="profileLogo"
              value={isUpdated.profileLogo}
              onChange={(e) => {handleInput(e); handleChangeAlert(e);}}/>
             <hr className="profile-line"/>
             <p className="profile-subheading">Profile Banner</p>
           
             <input type="input" 
             id="profile-banner"
             name="profileBanner"
             value={isUpdated.profileBanner}
             onChange={(e) => {handleInput(e); handleChangeAlert(e);}}/>
             {isEmpty && (
              <div className={`saving-alert ${isAnimating ? 'saving-alert-box-show' : 'saving-alert-box-hide'}`}>
                <div className="saving-alert-box">
                  <h1>Careful, you have unsaved changes!</h1>
                  <button className="save-btn-settings" onClick={() => {userdata(); clearValue(); handleSuccess();}}>Save</button>
                </div>
              </div>
             )}
             {isSuccess && (
              <div className={`success-msg ${successAnimating ? "success-alert-box-show" : "success-alert-box-hide"}`}>
                <div className="success-msg-section">
                <i class="fa-solid fa-circle-check"></i>
                <h4>Successfully Saved</h4>
                </div>
              </div>
             )}
          <br /><br />
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