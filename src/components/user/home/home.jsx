import React from "react";
import NavBar from "../navBar/navBar";
import HomeContent from "../homecontent/homecontent";
import Footer from "../footer/footer";

function Home() {
  return (
    <>
      <NavBar />
      <div>
        <HomeContent />
      </div>
      <Footer />
    </>
  );
}

export default Home;
