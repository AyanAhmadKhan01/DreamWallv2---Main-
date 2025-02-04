import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function Documentation() {
    return(
        <>
        <div className="documentation-container">
            <div className="documentation-section">           
                 <SideDoucmentMenu/>
                <div className="right-documentation">
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


function SideDoucmentMenu() {
    return(
        <>
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
        </>
    )
}



export function Introduction() {
    return (
      <>
         <h2>Introduction</h2>
    <p>DreamWall is a premium wallpaper community platform designed for enthusiasts and artists to share,
download, like, comment, and create discussions around wallpapers. Our mission is to provide a seamless experience
for users while fostering a creative environment.</p>
    <ul>
        <li>High-quality wallpaper collection</li>
        <li>Easy upload and sharing system</li>
        <li>Interactive comments and likes</li>
        <li>Profile customization options</li>
        <li>Moderation tools for trusted users</li>
        <li>A responsive design across devices</li>
    </ul>
      </>
    );
  }
  
 export function HowToUpload() {
    return (
      <>
        <h2>How to Upload Wallpapers</h2>
    <p>To upload a wallpaper, follow these steps:</p>
    <ol>
        <li><strong>Login or Register:</strong> Access the DreamWall dashboard using your credentials</li>
        <li><strong>Go to Upload Section:</strong> Click on the "Upload" tab or button located on the
dashboard</li>
        <li><strong>Select Wallpaper:</strong> Browse your device for the wallpaper you wish to upload</li>
        <li><strong>Add Details (Optional):</strong> Fill in title, description, and tags for better
visibility</li>
        <li><strong>Upload Now:</strong> Click "Upload" to submit your creation</li>
    </ol>
      </>
    );
  }
  
export function ManageWallpaper() {
    return (
      <>
        <h2>Managing Your Wallpapers</h2>
    <p>After uploading, you can manage your wallpapers through the dashboard:</p>
    <ul>
        <li>Delete any wallpaper by clicking the delete button</li>
        <li>Copy the download link using the copy icon</li>
        <li>Open the wallpaper directly in a new tab</li>
        <li>Create albums to organize your collection</li>
    </ul>
      </>
    );
  }
  
export function CreateAccount() {
    return (
      <>
      <h2>Create an Account</h2>
    <p>Creating an account on DreamWall is quick and straightforward:</p>
    <div class="highlight">
        <strong>Steps to Create an Account:</strong>
        <br/>
        1. Click on the "Register" option on the homepage
        <br/>
        2. Fill in your personal details including email, username, and password
        <br/>
        3. Confirm registration by clicking on the link sent to your email
        <br/>
        4. Login with your credentials to access the platform
    </div>
      </>
    );
  }
  
 export function ProfileSettings() {
    return (
      <>
       <h2>Profile Settings</h2>
    <ul>
        <li>Update profile picture</li>
        <li>Edit username and password</li>
        <li>Enable/disable notifications</li>
        <li>View wallpaper statistics</li>
        <li>Manage albums and permissions</li>
    </ul>
      </>
    );
  }
  
 export function BecomeModerator() {
    return (
      <>
         <h2>Become a Moderator</h2>
    <p>Becoming a moderator is an honor that comes with great responsibilities. To apply:</p>
    <div class="highlight">
        1. Follow our social media handles: [DevLegend](#) and [Ayan Ahmad Khan](#)<br/>
        2. Join our Discord server through the platform's interface<br/>
        3. Participate in interviews arranged by Ayan Ahmad Khan<br/>
        4. Successful completion of interview leads to moderator status
    </div>
      </>
    );
  }
  
 export function FAQ() {
    return (
      <>
       <h2>FAQ</h2>
    <ul>
        <li><strong>Q: How do I download a wallpaper?</strong> A: Click the download button or copy-paste the
link</li>
        <li><strong>Q: Can I share my wallpaper on social media?</strong> A: Yes, but ensure proper credit is
given</li>
        <li><strong>Q: What are the dimensions available?</strong> A: Various sizes from 1920x1080 to custom
sizes</li>
    </ul>
      </>
    );
  }
  
 export function Support() {
    return (
      <>
        <h2>Support</h2>
    <div class="support-form">
        <h3>Contact Us For:</h3>
        <ul>
            <li>General inquiries - info@dreamwall.com</li>
            <li>Wallpaper removal - abuse@dreamwall.com</li>
            <li>Technical issues - help@dreamwall.com</li>
        </ul>
       
    
    </div>
      </>
    );
  }
  