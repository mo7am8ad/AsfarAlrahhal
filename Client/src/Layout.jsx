import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";

const Layout = ({children}) =>{
  return(
    <div className="AppWrapper">
      <Navbar style="position:sticky"/>
      <main className="MainWrapper">
        {children}
        <WhatsAppFloatingButton/>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout;