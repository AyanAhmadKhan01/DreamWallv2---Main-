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
        <h1>Dream Wall Introduction</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, itaque ab...</p>
      </>
    );
  }
  
 export function HowToUpload() {
    return (
      <>
        <h1>How To Upload</h1>
        <p>Here’s how you can upload wallpapers...</p>
      </>
    );
  }
  
export function ManageWallpaper() {
    return (
      <>
        <h1>Manage Wallpaper</h1>
        <p>Learn how to manage your wallpapers...</p>
      </>
    );
  }
  
export function CreateAccount() {
    return (
      <>
        <h1>Create Account</h1>
        <p>Follow these steps to create an account...</p>
      </>
    );
  }
  
 export function ProfileSettings() {
    return (
      <>
        <h1>Profile Settings</h1>
        <p>Here’s how you can adjust your profile settings...</p>
      </>
    );
  }
  
 export function BecomeModerator() {
    return (
      <>
        <h1>Become a Moderator</h1>
        <p>Steps to become a moderator...</p>
      </>
    );
  }
  
 export function FAQ() {
    return (
      <>
        <h1>FAQ</h1>
        <p>Frequently asked questions and answers...</p>
      </>
    );
  }
  
 export function Support() {
    return (
      <>
        <h1>Support</h1>
        <p>Need help? Here’s how to get support...</p>
      </>
    );
  }
  