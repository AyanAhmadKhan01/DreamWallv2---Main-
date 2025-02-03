import React, { useEffect, useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [isUpload, setUpload] = useState(false);
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    wallpaperName: '',
    imgLink: '',
    genre: 'Anime',
    resolution: '',
    uploaderName: '',
    tags: '',
    deviceTags: 'PC',
    likedBy: '',
  });


  const upload = () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('wallpaperName', formData.wallpaperName);
    data.append('uploaderName', userData.username);
    data.append('genre', formData.genre);
    data.append('resolution', formData.resolution);
    data.append('tags', formData.tags);
    data.append('deviceTags', formData.deviceTags);
    

    axios
      .post(process.env.REACT_APP_UPLOAD_WALLPAPER, data)
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
        setError('Error uploading wallpaper');
      });
  };

useEffect(() => {
  if(location.state?.triggerLogout) {
    setLogout(true)
  }
}, [location])

  useEffect(() => {
    if (location.state?.triggerUpload) {
      setUpload(true); 
    }
  }, [location]);

  const handleUploadMenu = () => {
    setUpload((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWallpaperChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const [analytics, setAnalytics] = useState({
    totalDownloads: 0,
    totalLikes: 0,
    totalUploads: 0,
  });

  useEffect(() => {
    const Analytics = async() => {
      try {
        const response = await fetch(process.env.REACT_APP_ANALYTICS_DATA, {
          method: 'GET',
        });
  
        if (!response.ok) {
          console.log('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalytics(data);
  
      } catch (err) {
        console.error('Failed', err)
      }
    }
    Analytics();
  }, [])


const [isVisible, setIsVisible ] = useState();

const handleAnimationEnd = () => {
  setTimeout(() => {
    setIsVisible(false)
  }, 1850)
  setTimeout(() => {
    window.location.reload();
  }, 1650)
}


const [isClicked, setIsClicked] = useState(true);
const [isAnimating, setIsAnimating] = useState(true);

const OpenleftMenu = () => {
  setIsClicked(true);
  setTimeout(() => {
    setIsAnimating(true)
  }, 0)
}

const CloseleftMenu = () => {
  setIsAnimating(false)
  setTimeout(() => {
    setIsClicked(false);
  }, 300)
}


const [ yourUploads, setYourUploads ] = useState([]);

const [deleteMenu, setDeleteMenu] = useState(false);
const [selectedWallpaper, setSelectedWallpaper] = useState(null);


const handleDeletMenu = (uploads) => {
  setDeleteMenu((prev) => !prev)
  setSelectedWallpaper(uploads); 
};

const pagereload = () => {
  setTimeout(() => {
    window.location.reload();
  }, 0)
}


useEffect(() => {
  const showUploads = async () => {
    try {
    const response = await fetch(process.env.REACT_APP_WALLPAPER_DISPLAY, {
      method: 'GET',
    });
    if(!response.ok) {
      console.log('Failed To get data');
    }
    const data = await response.json();
    setYourUploads(data);
  }   catch (err) {
    console.error('Failed', err)
  }}
  showUploads();
}, []);


  const [logout, setLogout ] = useState(false);

  function logoutMenu() {
    setLogout((prevState) => !prevState);
  }
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_USER_DATA, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
        document.title = `Dream Wall V2 - Dashboard`
      } catch (err) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <>
    <div className="dashboard-container">
          <div className="left-dashboard">
            <div className="left-dash-bar">
              <div className="left-section">
           <h3><i class="fas fa-home"></i> Loading...</h3>    
           <h3><i class="fas fa-cloud"></i>Loading...</h3>
             <Link><h3><i class="fas fa-chart-line"></i>  Loading...</h3></Link>
           <Link><h3><i class="fas fa-user-cog"></i> Loading...</h3></Link>
           <h3 className="log-out-btn"><i class="fas fa-sign-out-alt"></i> Loading...</h3> 
           </div>
           </div>
          </div>
          <div className="right-dashboard">
            <div className="right-section">   
                <div className="analytics">
            <div className="right-dash-bar">
              <h1>Loading...</h1>  
               <i class="fas fa-download"></i>
               <h2>Loading...</h2>
               <h3>Loading...</h3>
               <h4>Loading...</h4>
            </div>
            <div className="right-dash-bar">
              <h1>Loading...</h1> 
                <i class="far fa-thumbs-up"></i>
                <h2>Loading...</h2>
                <h3>Loading...</h3>
               <h4>Loading...</h4>
            </div>
            <div className="right-dash-bar">
              <h1>Loading...</h1>  
              <i class="fas fa-cloud-upload-alt"></i>
              <h2>Loading...</h2>
              <h3>Loading...</h3>
               <h4>Loading...</h4>
            </div>
            </div>

            <div className="your-uploads">
            <h1>Loading...</h1>
    
            <div className="your-upload-section">
            <div className="wallpaper-div" style={{ width: '250px', borderRadius: '10px', backgroundColor: '#808080'}}></div>
            <div className="dashboard-tittle-wallpaper">
              <h2>Loading...</h2>
            <h3>Loading...</h3>
            </div>
            <div className="dashboard-downloads-wallpaper">      
            <h2>Loading...</h2>
            <h3>Loading...</h3>
            </div>
            <div className="dashboard-likes-wallpaper">
            <h2>Loading...</h2>
            <h3>Loading...</h3>
            </div>
            <div className="dashboard-option-wallpaper">
              <h4>Loading...</h4>
              <h4>Loading...</h4>
            <h4>Loading...</h4>
            </div>
            </div>
             
            </div>
            </div>
          </div>
        </div>
    </>;
  }

  if (error) {
    return <>
      <div className="failed-container"></div>

    </>;
  }

  function handleLogout() {
    fetch(process.REACT_APP_env.LOG_OUT, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          navigate('/login');
          window.location.reload();
        } else {
          console.error('Failed to log out');
        }
      })
      .catch((err) => console.error('Error:', err));
  }

  const wallpaperDelete = async (wallpaper) => {
    try {
      const response = await fetch(process.env.REACT_APP_DELETE_WALLPAPER, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallpaperName: wallpaper }),
      });
  
      if (!response.ok) {
        console.log('Failed to Delete Wallpaper');
      } else {
        console.log('Wallpaper deleted successfully');
      }
    } catch (err) {
      console.error('Server Failed:', err);
    }
  };

  const wallpaperDefault = '/img/wallpaper.png';

  return (
    <>

      <div>
        {userData ? (
          <div>
            <div className="dashboard-container">
              <div className="left-dashboard">
                <div className="left-dash-bar">
                  {isClicked && (

                  <div className={`left-section ${isAnimating ? 'dashview': 'notdashview'}`}>
                 <i class="fa-solid fa-xmark" onClick={CloseleftMenu}></i>
               <h3><i class="fas fa-home"></i> Dashbaord</h3>  
              
               <h3 onClick={handleUploadMenu}><i class="fas fa-cloud"></i> Upload</h3>
              
                 <Link to={'/dashboard/analytics'}><h3><i class="fas fa-chart-line"></i>  Analytics</h3></Link>
               <Link to={'/dashboard/settings'}><h3><i class="fas fa-user-cog"></i> Settings</h3></Link>
               <h3 onClick={logoutMenu} className="log-out-btn"><i class="fas fa-sign-out-alt"></i> Logout</h3> 
               </div>
                )}
               </div>
              </div>
              
              {logout &&(
                <div className="logout-menu">
                  <div className="logout-section">
                  <i class="fas fa-exclamation"></i>
                    <h1>Are You Sure want log-out?</h1>
                    <div className="logout-btns">
                    <button onClick={handleLogout}>Yes</button>
                    <button onClick={logoutMenu}>No</button>
                    </div>
                    </div>
                  </div>
              )} 
           
              <i className="fa-solid fa-bars" onClick={OpenleftMenu}></i>
              <div className="right-dashboard">
                <div className="right-section">   
                  {Array.isArray(analytics) && analytics
                  .filter((total) => userData.username === total._id)
                  .map((total) => (
                    <div className="analytics">
                <div className="right-dash-bar">
                  <h1>Total Download</h1>  
                   <i class="fas fa-download"></i>
                   <h2>{total.totalDownloads}</h2>
                   <h3>Daily Average</h3>
                   <h4>Downloads <i class="fas fa-exclamation-circle"></i></h4>
                </div>
                <div className="right-dash-bar">
                  <h1>Total Likes</h1> 
                    <i class="far fa-thumbs-up"></i>
                    <h2>{total.totalLikes}</h2>
                    <h3>Daily Average</h3>
                   <h4>Likes <i class="fas fa-exclamation-circle"></i></h4>
                </div>
                <div className="right-dash-bar">
                  <h1>Total Uploads</h1>  
                  <i class="fas fa-cloud-upload-alt"></i>
                  <h2>{total.totalUploads}</h2>
                  <h3>Daily Average</h3>
                   <h4>Uploads <i class="fas fa-exclamation-circle"></i></h4>
                </div>
                </div>
  ))}
                <div className="your-uploads">
                <h1>Your Uploads</h1>
                {yourUploads
                .filter((uploads) => userData.username === uploads.uploaderName )  
                .map((uploads, index) => (
                <div className="your-upload-section" key={index}>
                <img src={uploads.imgLink} alt="wallpaper" />
                <div className="dashboard-tittle-wallpaper">
                  <h2>Tittle</h2>
                <h3>{uploads.wallpaperName}</h3>
                </div>
                <div className="dashboard-downloads-wallpaper">      
                <h2>Downloads</h2>
                <h3>{uploads.downloads}</h3>
                </div>
                <div className="dashboard-likes-wallpaper">
                <h2>Likes</h2>
                <h3>{uploads.likes}</h3>
                </div>
{deleteMenu && selectedWallpaper && (
  <div className="delete-menu">
    <div className="delete-menu-section">
      <h4>
        Are you sure you want to delete <span>{selectedWallpaper.wallpaperName}?</span>
      </h4>
      <img src={selectedWallpaper.imgLink} alt="Selected Wallpaper" />
      <div className="delete-menu-btns">
      <h5 onClick={() => {wallpaperDelete(selectedWallpaper.wallpaperName); handleDeletMenu(); setTimeout(() => {window.location.reload();}, 100)}}>Delete</h5>
      <h2 onClick={handleDeletMenu}>Cancel</h2>
      </div>
    </div>
  </div>
)}
                <div className="dashboard-option-wallpaper">
                  <h4 onClick={() => {
                    navigate(`/explore/${uploads.linkCopy}`)
                  }}>Open <i class="fas fa-folder-open"></i></h4>
                  <h4 onClick={() => 
                  navigator.clipboard
                    .writeText(`https://dreamwallv2.vercel.app/explore/${uploads.linkCopy}`)
                      .then(() => {
                        alert('Link copied to clipboard!');
                      })}
                      >Copy   <i class="far fa-copy"></i></h4>
                <h4 onClick={() => handleDeletMenu(uploads)}>Delete  <i class="fas fa-trash-alt"></i></h4>
                </div>
                </div>
                  ))}
                </div>
                </div>
              </div>
            </div>
            {isVisible && (
            <div className="upload-animation" onAnimationEnd={handleAnimationEnd}>
              <div className="upload-animation-section">
                <span className='span1'>
                <span className='span2'>
                <span className='span3'>
                <i class="fas fa-upload"></i>
                </span>
                </span>
                </span>
              </div>
            </div>
            )}
    
            {isUpload && (
              <div className="wallpaper-upload-form">
                <div className="wallpaper-upload-section">
                  <i
                    className="fas fa-times"
                    aria-label="Close banner menu"
                    onClick={handleUploadMenu}
                  ></i>
                  <div className="wallpaper-upload-mini-section">
                    <h1>Upload Wallpaper</h1>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        upload();
                      }}
                    >
                      <input
                        type="text"
                        onChange={handleChange}
                        placeholder="Wallpaper Name"
                        name="wallpaperName"
                        className="wallpapername"
                        value={formData.wallpaperName}
                      />
                      <br />
                      <label htmlFor="imgLink" className="imgLink-btn">
                        <span>Choose</span><i className="fa-solid fa-upload"></i>
                      </label>
                      <input
                        type="file"
                        onChange={handleWallpaperChange}
                        name="imgLink"
                        id="imgLink"
                      />
                      <br />
                     <br />
                      <select
                        name="genre"
                        id="genre"
                        onChange={handleChange}
                        value={formData.genre}
                      >
                        <option value="AI">AI</option>
                        <option value="Anime">Anime</option>
                        <option value="Aesthetic">Aesthetic</option>
                        <option value="Abstract">Abstract</option>
                        <option value="Futuristic">Futuristic</option>
                        <option value="Game">Game</option>
                        <option value="Landscapes">Landscapes</option>
                        <option value="Movies">Movies</option>  
                        <option value="Minimalist">Minimalist</option>  
                        <option value="Nature">Nature</option>                   
                      </select>
                    <select
                        name="deviceTags"
                        id="devices" 
                        onChange={handleChange}
                        value={formData.deviceTags}
                        >
                      <option value="PC">PC</option>
                      <option value="Mobile">Mobile</option>
                    </select>
                    <br />
                      <label className="resolution-btn" htmlFor="UHD">
                        <span>3840x2160</span> 
                        <input
                          type="radio"
                          id="UHD"
                          value="3840x2160"
                          name="resolution"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="resolution-btn" htmlFor="QHD">
                       <span>2560x1440</span> 
                        <input
                          type="radio"
                          id="QHD"
                          value="2560x1440"
                          name="resolution"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="resolution-btn" htmlFor="fullHd">
                         <span>1920x1080 </span>
                        <input
                          type="radio"
                          id="fullHd"
                          value="1920x1080"
                          name="resolution"
                          onChange={handleChange}
                        />
                      </label>
                      <br />
                      <br />
                     
                      <input type="submit" value="Upload" id='upload-wallpaper-btn' onClick={() => {setIsVisible(true);}} />
                    </form>
                  </div>
                  <img
                    src={preview || wallpaperDefault}
                    alt="wallpaper preview"
                    className="wallpaper-preview"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <h1>er</h1>
        )}
      </div>
    </>
  );
};

export default Dashboard;



