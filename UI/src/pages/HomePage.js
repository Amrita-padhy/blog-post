import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <div>
            {/* nav bar */}
            <Navbar />
            <div className="body_content">
                
            </div>
           
                {/* side bar */}
                <Sidebar/>

        </div>
    )
}

export default Home