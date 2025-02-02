import { useEffect, useState, createContext } from "react";
import { Link } from "react-router-dom";

export const TopCreators = createContext();

export const TopUser = (props) => {
  const [communityProfile, setCommunityProfile ] = useState([]);


useEffect(() => {
    const fetchCommunityData = async () => {
        try {
            const response = await fetch(process.env.COMMUNITY_DATA,{
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
            const response = await fetch(process.env.COMMUNITY_DATA,{
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

const ProfilePerPage = 10;

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
        <div className="community-section">
     
            <h1>DreamWall Community</h1>
            <br />
            <input type="text" placeholder="Enter Their Username" onChange={handleUserSearch}/>
            <h2>Find A User? | Example Name <span>DreamWall</span></h2>
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
    <div className="no-profile-found-container">
     <div className="no-profile-found-mini-container">
     <i class="fas fa-user-alt"></i>
     <h1>No Profile <span>Found</span> </h1>
     </div>
    </div>
    </div>

)}
       
        </div>
        </div>
        </>
    )
}

export default Community;