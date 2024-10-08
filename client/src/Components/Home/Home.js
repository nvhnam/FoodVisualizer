import React from "react";
import Header from "./Header";
import MainHome from "./MainHome";
import About from "./About";
import Footer from "./Footer";
import "./Home.css";
import { ScrollProvider } from "./ScrollContext";

const Home = () => {
  return (
    <div className="home">
      <ScrollProvider>
        <Header />
        <MainHome />
        <div id="about">
          <About />
        </div>

        <Footer />
      </ScrollProvider>
    </div>
  );
};

export default Home;
