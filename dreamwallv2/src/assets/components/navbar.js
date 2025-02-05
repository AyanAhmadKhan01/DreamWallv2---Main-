import { useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";


function Navbar() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { profileUrl } = useParams();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_USER_DATA, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(data); 
  
          const matchResponse = await fetch(`${process.env.REACT_APP_MATCH_USER_DATA}?username=${data.username}`);
  
          if (matchResponse.ok) {
            const matchData = await matchResponse.json();
            const { profileUrl: matchedProfileUrl } = matchData;
  
           
            const profileResponse = await fetch(`${process.env.REACT_APP_MATCHED_PROFILE}?profileUrl=${matchedProfileUrl}`);
  
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
  }, [profileUrl]);
  

    const [isNavbarVisible, setNavbarVisible] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMenu = () => {
        setNavbarVisible(!isNavbarVisible);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    function handleLogout() {
      fetch(process.env.REACT_APP_LOG_OUT, {
        method: 'POST',
        credentials: 'include', 
      })
        .then((response) => {
          if (response.ok) {
            window.location.reload();
          } else {
            console.error('Failed to log out');
          }
        })
        .catch((err) => console.error('Error:', err));
    }

const [viewNavbar, setViewNavbar] = useState(true);
const [isAnimation, setIsAnimation] = useState(false);

const handleNavbar = () => {
  setViewNavbar(true);
  setTimeout(() => {
    setIsAnimation(true);
  },0)
};

const handleCloseNavbar = () => {
  setIsAnimation(false);
  setTimeout(() => {
    setViewNavbar(false);
  },1000)
}

    return ( 
        <div className="container">
                <div className="header">
            <div className={`header-section ${isSticky ? 'sticky' : ''}`}>
            <Link to='/home'><h1>Dream Wall</h1></Link> 
            <div className="auth-container">
            {loading ? (  
          <p className="navbar-logo-responsive"></p>
        ) : user ? (
          <li className="user-section navbar-logo-responsive">
            <img
              src={profile.profileLogo} 
              className="user-logo navbar-logo-responsive" 
              style={{translate: '0px 0px'}}
            />
            <ul className="account-menu">
        <h3>Welcome {profile.username}!</h3>
        <Link to={`/profile/${profile.profileUrl}`}><li><i className="fas fa-user"></i> Profile</li></Link>
        <Link to='/dashboard'><li><i className="fas fa-chart-pie"></i> Dashboard</li></Link>
        <Link to='/dashboard/settings'><li><i className="fas fa-cog"></i> Account Settings</li></Link>
        <Link to='/' onClick={handleLogout}> <li><i className="fas fa-sign-out-alt"></i> Logout</li></Link>
       </ul>

          </li>
           
        ) : (
          <li>
            <Link to="/signup" className="loginbtn navbar-logo-responsive">Signup</Link>
          </li>
        )}
        <i className="fas fa-bars" onClick={handleNavbar}></i>
          </div>
          {viewNavbar && (

        
        <div className={`navbar ${isAnimation ? 'inView' : 'notView'}`}>
          <ul> 
              <i className="fa-solid fa-xmark" onClick={handleCloseNavbar}></i>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/explore'>Explore</Link></li>
            <li className="getting-started-navbar">
         Getting Started <i className="fas fa-chevron-down"></i>
        <ul className="dropdown-menu">
        <h2>Where to start</h2>
        <Link to='/documentation'><li><i className="fas fa-book"></i> Introduction</li></Link>
        <Link to='/documentation/howtoupload'><li><i className="fas fa-upload"></i> Upload Guide</li></Link>
        <Link to='/documentation/createaccount'><li><i className="fas fa-user-plus"></i> Create Account</li></Link>
        <Link to='/documentation/profilesettings'><li><i className="fas fa-cogs"></i> Profile Settings</li></Link>
        <Link to='/documentation/faq'><li><i className="fas fa-question-circle"></i> FAQ</li></Link>
       </ul>
     </li>

            <li><Link to='/community'>Community</Link></li>
          
            {loading ? (
          <p style={{width: '50px', objectFit: 'cover', borderRadius: '100px', translate: '-10px 8px', backgroundColor: '#808080'}} className="navbar-logo"></p>
        ) : user ? (
          <li className="user-section navbar-logo">
            <img
              src={profile.profileLogo} 
              className="user-logo" 
            />
            <ul className="account-menu">
        <h3>Welcome {profile.username}!</h3>
        <Link to={`/profile/${profile.profileUrl}`}><li><i className="fas fa-user"></i> Profile</li></Link>
        <Link to='/dashboard'><li><i className="fas fa-chart-pie"></i> Dashboard</li></Link>
        <Link to='/dashboard/settings'><li><i className="fas fa-cog"></i> Account Settings</li></Link>
        <Link to='/' onClick={handleLogout}> <li><i className="fas fa-sign-out-alt"></i> Logout</li></Link>
       </ul>

          </li>
           
        ) : (
          <li>
            <Link to="/signup" className="loginbtn navbar-logo">Signup</Link>
          </li>
        )}
          </ul>
        </div>
        )}
        </div>
        </div>
        </div>
    )
};



export default Navbar;
