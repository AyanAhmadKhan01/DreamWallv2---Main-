import { Link } from "react-router-dom";

function Footer() {
    return(
        <>
         <div className="footer-container">
            <div className="footer-section">
                <div className="footer-sub-section">
                    <h2>DreamWall</h2>
                    <Link to={'/'}><h3>Home</h3></Link>
                    <Link to={'/explore'}><h3>Explore</h3></Link>
                    <Link to={'/updates'}><h3>Updates</h3></Link>
                </div>
                <div className="footer-sub-section">
                    <h2>Accounts</h2>
                    <Link to={'/dashboard'}><h3>Dashboard</h3></Link>
                    <Link to={'/dashboard/settings'}><h3>Account Settings</h3></Link>
                </div>
                <div className="footer-sub-section">
                    <h2>Documentation</h2>
                    <Link to={'/documentation'}><h3>Introduction</h3></Link>
                    <Link to={'/documentation/howtoupload'}><h3>How To Upload</h3></Link>
                    <Link to={'/documentation/becomemoderator'}><h3>Become Moderator</h3></Link>
                    <Link to={'/documentation/faq'}><h3>Faq</h3></Link>
                </div>
                {/* <div className="footer-sub-section">
                <h2>Don’t Be a Stranger! 😏</h2>
<Link to={'https://discord.gg/KTsFkJmVFc'} target="_blank"><h3><i className="fab fa-discord"></i> Join the Cool Kids on Discord</h3></Link>
<Link to={'https://x.com/DevLegend_'} target="_blank"><h3><i className="fab fa-twitter"></i> Got Big Ideas? Share 'Em on Twitter and Watch the Magic Happen!</h3></Link>
<Link to={'www.linkedin.com/in/ayanahmadkhan'} target="_blank"><h3><i className="fab fa-linkedin"></i> Let’s Make Some Boss Moves on LinkedIn!</h3></Link>
<Link to={'https://devlegend.vercel.app/'} target="_blank"><h3><i className="fas fa-globe"></i> Unlock More Secrets on Our Website</h3></Link>
                </div> */}
            </div>
         </div>
        </>
    )
}


export default Footer;