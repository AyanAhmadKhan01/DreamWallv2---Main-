import { useParams, Link} from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function WallpaperPage() {
    const { linkCopy } = useParams();
    const [wallpaperPage, setWallpaperPage ] = useState(null);
    const [profile, setProfile] = useState([]);
    const [authenticate, setAuthenticate ] = useState(null);
    const timers = useRef([]);

    useEffect(() => {
      const authenticateUser =  async () => {   
      try {
        const response = await fetch('https://dreamwall-backend.onrender.com/api/user/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });
        if(!response.ok) {
          console.error('Failed to fetch Auth Api');
        }
        const data = await  response.json();
        setAuthenticate(data)
      } catch (err){
        console.error('Error', err)
      }
    }
    authenticateUser();
    }, [])

    useEffect(() => {
      const fetchUserProfile =  async () => {
      try {
        const response = await fetch('https://dreamwall-backend.onrender.com/api/user/profile/data', {
          method: 'GET',
        });
        if(!response.ok) {
          console.error('Failed To Fetch Profile Url');
        }
         const data = await response.json();
         setProfile(data);
      } catch (err) {
        console.error('Failed', err)
      }
    }
    fetchUserProfile();
    }, [])


    const [isLiked ,setIsLiked] = useState(false);

    useEffect(() => {
      if (authenticate) {
        const fetchWallpaperPage = async () => {
            try {
                const response = await fetch(`https://dreamwall-backend.onrender.com/api/wallpaper/view?linkCopy=${linkCopy}`);
                if(!response.ok) {
                    console.error('Failed to load Wallpaper Page');
                }
                const data = await response.json();
                setWallpaperPage(data);

                if (data.likedBy.includes(authenticate.username)) {
                  setIsLiked(true);
                } else {
                  setIsLiked(false);
                }
                   document.title = `Dream Wall V2 - ${data.wallpaperName}`

            } catch (err) {
                console.error(err)
            }
        }
        fetchWallpaperPage();
      }
    },[linkCopy, authenticate] )


    const handleDownload = async () => {
        try {
          const response = await fetch(wallpaperPage.imgLink);
          const blob = await response.blob();
    
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${wallpaperPage.wallpaperName}`
          document.body.appendChild(link);
          link.click();
    
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error("Error downloading the image:", error);
        }
      };


      const UpdateDownload = async () => {
     
        try {
          const response = await fetch(`https://dreamwall-backend.onrender.com/api/update/wallpaper/downloads`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({linkCopy}),
          });
      
          if (!response.ok) {
            console.error('Failed to update download count');
          } else {
            console.log('Successfully updated download count');
          }
          window.location.reload();
        } catch (error) {
          console.error("Error", error);
        }
      };

      const handleLike = async () => {
        try {
          const response = await fetch('https://dreamwall-backend.onrender.com/api/update/wallpaper/likes', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              linkCopy: linkCopy,
              likedBy: authenticate.username,
            }),
          });
    
          if(!response.ok) {
            console.error('Failed to Update Like')
          }  
          window.location.reload();
        } catch {
          console.error("Error")
        }
      }
      
      const clearTimers = () => {
        timers.current.forEach((timers) => clearTimeout(timers));
        timers.current = [];
      }

      const [copyWallpaper, setCopyWallpaper] = useState(false);
      const [isAnimating, setIsAnimating] = useState(false);
      const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
    
    
    
      const handleCopyAlert = () => {
        setIsAnimating(false); 
        timers.current.push(
        setTimeout(() => setCopyWallpaper(false), 1000)
        );
      };
    
      const copyToClipboard = () => {
        clearTimers();
        const linkToCopy = `http://localhost:3000/explore/${linkCopy}`;
        navigator.clipboard.writeText(linkToCopy);
    
      
        setCopyWallpaper(true);
        setIsButtonDisabled(true); 
        timers.current.push(setTimeout(() => setIsAnimating(true), 10));
       
        timers.current.push(
          setTimeout(() => {
            handleCopyAlert();
            setIsButtonDisabled(false); 
          }, 3000)
        );
      };


    const commentRef = useRef(null);

    const handleInput = () => {
    const textarea = commentRef.current;
    textarea.style.height = "auto"; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
    };
    

    

    const [comments, setComments ] = useState({
      user: '',
      userLogo: '',
      commentText: '',
      commentId: '',
    })


    const handleChange = (e) => {
      const { name, value } = e.target;
      setComments((prev) => ({ ...prev, [name]: value }));
    };

  const createComment = async () => {
  try {
    const response = await fetch('https://dreamwall-backend.onrender.com/api/user/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: authenticate.username,
        userLogo: profile.profileLogo,
        commentText: comments.commentText,
        commentId: wallpaperPage._id,
      }),
    });
   if(!response.ok) {
    console.error('Failed to create comment');
   }
   window.location.reload();
  } catch {
    console.error('Failed To Send comment to server');
  }
}


const [ viewComments, setViewComments ] = useState([]);

useEffect(() => {
  const fetchComments = async () => {
  try {
    const response = await fetch(`https://dreamwall-backend.onrender.com/api/user/comment/view?commentId=${wallpaperPage._id}`);
    if(!response.ok) {
      console.error('Failed to load Comments');
    }
    const data = await response.json();
    setViewComments(data)
  } catch (err) {
    console.error('Error', err)
  }
 }
fetchComments()
}, [wallpaperPage])




const deleteComment = async (commentId) => {
  if (!commentId) {
    console.error('Comment ID is required');
    return;
  }

  try {
    const response = await fetch(`https://dreamwall-backend.onrender.com/api/user/comment/view/delete?commentId=${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId: commentId,
      }),
    });

    if (!response.ok) {
      console.error(`Failed to delete comment with ID: ${commentId}`);
      return;
    }
    window.location.reload();
  } catch (err) {
    console.error(`Failed to delete comment with ID: ${commentId}`, err);
  }
};

    return( 


    <div className="wallpaperpage-container">
        {wallpaperPage ? (
            <>
            <div className="wallpaper-page-container">
                <div className="wallpaper-page-section">
                <img src={wallpaperPage.imgLink} alt={wallpaperPage.wallpaperName} />
                </div>
                <div className="wallpaper-page-section">
                    <div className="wallpaper-page-text-section">
                <h1><i class="fas fa-signature"></i> Name  <span>{wallpaperPage.wallpaperName}</span></h1>
                <h3> <i class="fas fa-download"></i> Downloads   <span>{wallpaperPage.downloads} </span></h3>
                <h3> <i class="fa fa-calendar"></i> Upload Date  <span>{new Date(wallpaperPage.uploadDate).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
         })} </span></h3>
         <h3> <i class="fa fa-desktop"></i> Resolution  <span>{wallpaperPage.resolution} </span></h3>
         <h3> <i class="fa fa-user"></i> Uploader  <span>{wallpaperPage.uploaderName}</span></h3>
         <h3> <i class="fas fa-hashtag"></i> Genre <span className="wallpaper-tags">#{wallpaperPage.genre}</span> </h3>
                </div>
                <div className="wallpaper-page-btn">
                <h5 onClick={() => {copyToClipboard();}}  disabled={isButtonDisabled}><i class="far fa-copy"></i></h5>
                
                <h6 onClick={handleLike} className="like-wallpaper">
                <i className={`${isLiked ? 'fas fa-heart liked' : 'far fa-heart'}`}></i> {wallpaperPage?.likes}
                  </h6>
               <button onClick={() => {handleDownload(); UpdateDownload()}}>Download</button>
               </div>
               {copyWallpaper && (
                <div className={`wallpaper-link-copy ${isAnimating ? 'show' : 'hide'}`}>
                  <div className="wallpaper-link-copy-section">
                    <h1><span><i class="fas fa-check"></i></span>Link copied to clipboard! <i class="fas fa-times" onClick={handleCopyAlert}></i></h1>
                  </div>
                </div>
               )}
               <textarea
                name="commentText" 
                id="comment"
                placeholder="Add a Comment"
                onChange={handleChange}
                value={comments.commentText} 
           />
                      <button className="create-comment-btn" onClick={createComment}>Comment</button>
                      {viewComments.map((comment) => (
              <div className="comment-container">
              {profile
              .filter((profileItem) => (profileItem.username === comment.user))
         .map((profileItem) => (
    <Link key={profileItem._id} to={`/profile/${profileItem.profileUrl}`}>
      <div className="comment-section">
      <div className="left-comment-side">
      <img src={profileItem.profileLogo} />
      </div>
      <div className="right-comment-side">
      <h1>{comment.user} <span>  {(() => {
    const uploadedDate = new Date(comment.createdAt);
    const currentDate = new Date();
    const timeDifference = Math.abs(currentDate - uploadedDate);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  })()}</span></h1>
</div>
</div>
    </Link>
      ))}     
<p>{comment.commentText}</p> 
 {authenticate && comment.user === authenticate.username && (
  <i 
    className="fa-solid fa-trash" 
    onClick={() => deleteComment(comment._id)}
    title="Delete comment"
  ></i>
)}  
                </div>     
                 ))} 
                </div>
                </div>
            </>
        ) : (
            <h1>Failed to Load Wallpaper Page</h1>
        )}
    </div> 
    )
  }


  export default WallpaperPage;