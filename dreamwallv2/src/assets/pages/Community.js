import { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";

export const TopCreators = createContext();

export const TopUser = (props) => {
  const [communityProfile, setCommunityProfile ] = useState([]);


useEffect(() => {
    const fetchCommunityData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_COMMUNITY_DATA,{
                method: 'GET',
            });
            const data = await response.json();
            setCommunityProfile(data);
        } catch (err){
            console.error('Failed To Fetch Community Data')
        }
    }
    fetchCommunityData()
},[])
return(
  <TopCreators.Provider value={communityProfile}>
  {props.children}
</TopCreators.Provider>
)
}

function Community () {
    document.title = `Dream Wall V2 - Community`

const [communityProfile, setCommunityProfile ] = useState([]);


useEffect(() => {
    const fetchCommunityData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_COMMUNITY_DATA,{
                method: 'GET',
            });
            const data = await response.json();
            setCommunityProfile(data);
        } catch (err){
            console.error('Failed To Fetch Community Data')
        }
    }
    fetchCommunityData()
},[])


const [currentPage, setCurrentPage] = useState(1);
const [userSearch, setUserSearch] = useState('');

const [ProfilePerPage, setProfilePerPage] = useState(3);
const [isLoading, setIsLoading] = useState(false);


const handleScroll = () => {
const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
const documentHeight = document.documentElement.offsetHeight;

const buffer = 100;
if(scrollPosition < documentHeight - buffer || isLoading) {
  return;
}

setProfilePerPage((prevProfile) => {
  const newProfile = prevProfile + 3;
  return newProfile;
})

setTimeout(() => {
  setIsLoading(false);
}, 300)

}
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
},[isLoading])


const [noProfile, setNoProfile] = useState(false);
const [isloader, setIsLoader] = useState(true);

const handlenoProfile = () => {
  setNoProfile(true)
  setIsLoader(false)
}


const handleUserSearch = (event) => {
    const search = event.target.value;
    setUserSearch(search);
    setCurrentPage(1);
}

const lastProfile = currentPage * ProfilePerPage
const firstProfile = lastProfile - ProfilePerPage;


const filter = communityProfile.filter((profile) => {
    const matchProfile = profile.username.toLowerCase().includes(userSearch.toLowerCase());
    return matchProfile;
})

const currentProfile = filter.slice(firstProfile, lastProfile);


    return (
        <>
        <div className="community-container">
            <h1>DreamWall Community</h1>
            <br />
            <input type="text" placeholder="Enter Their Username" onChange={handleUserSearch}/>
            <h2>Find A User? | Example Name <span>DreamWall</span></h2>
            <div className="community-section">
            {currentProfile.length > 0 ? (
  currentProfile.map((data, index) => (
    <div className="community-profile-container" key={data.profileUrl || index}>
      <Link to={`/profile/${data.profileUrl}`}>
        <div className="community-profile">
          <img src={data.profileBanner} className="banner-community" alt="Profile Banner" />
          <img src={data.profileLogo} className="logo-community" alt="Profile Logo" />
          <h2>{data.username}</h2>
          <h3>
            {new Date(data.createdAt).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </h3>
        </div>
      </Link>
    </div>
  ))
) : (
    <div className="no-profile-found">
      {isloader && (
      <div className="loader" onAnimationEnd={handlenoProfile}></div>
    )}
      {noProfile && (
    <div className="no-profile-found-container">
     <div className="no-profile-found-mini-container">
     <i className="fas fa-user-alt"></i>
     <h1>No Profile <span>Found</span> </h1>
     </div>
    </div>
    )}
    </div>

)}
       
        </div>
        </div>
        </>
    )
}

export default Community;