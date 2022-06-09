import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cards from "../components/cards";
import Adds from "../components/adds";

const Home = () => {
    return (
        <div>
            {/* nav bar */}
     <Navbar />

           
            <div className="layOut">
                {/* side bar */}
                <Sidebar/>
                {/* card componnents */}
                <Cards/>
                {/* adds */}
                <Adds/>
            
            </div>
            

        </div>
    )
}

export default Home