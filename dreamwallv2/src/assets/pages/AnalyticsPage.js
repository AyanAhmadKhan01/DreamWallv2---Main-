import Chart from 'chart.js/auto';
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from 'react';

function Analytics() {
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
                   <div className="left-settings left-all">
                        <div className="left-dashboard">
                                       <div className="left-dash-bar">
                                         <div className="left-section">
                                         <Link to={'/dashboard'}><h3><i class="fas fa-home"></i> Dashbaord</h3>  </Link>
                                         <h3 onClick={handleUploadClick}><i class="fas fa-cloud"></i> Upload</h3> 
                                                    <Link to={'/dashboard/analytics'}><h3><i class="fas fa-chart-line"></i>  Analytics</h3></Link>
                                                    <Link to={'/dashboard/settings'}><h3><i class="fas fa-user-cog"></i> Settings</h3></Link>
                                                    <h3 onClick={handleLogout}  className="log-out-btn"><i class="fas fa-sign-out-alt"></i> Logout</h3> 
                                      </div>
                                      </div>
                                     </div>
                   </div>
                   <div className="right-settings">
                   <h1>Analytics <i className="fas fa-chart-pie"></i></h1>
                   <h2>Under Development</h2>
            
               </div>
               </div>
        </>
    )
}

export default Analytics;