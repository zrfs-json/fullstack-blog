import { Outlet } from "react-router-dom";
import Navbar from "../components/molecules/Navbar";
import Footer from "../components/molecules/Footer";

import React from 'react'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="bg-slate-900 ">
        <Outlet/>
      </main>
      <Footer />
    </>
  )
}

export default MainLayout