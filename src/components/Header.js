import React from "react";
import { Link } from "react-router-dom";

function Header({currentUser, handleLogOut}) {
    return (
        <div className="header">
            <div className="banner">
                <h2>Visualizers</h2>
            </div>
            <div className="navBar">
                {currentUser ? 
                (<>
                    <Link to="/account" className="navBarElement">Account</Link>
                    <Link to="/graphs" className="navBarElement">Graphs</Link>
                    <button className="navBarElement" onClick={handleLogOut}>Log Out</button>
                </>):(<> </>)}
            </div>
        </div>
    );
  }
  
  export default Header;
  