import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Pins, Sidebar, UserProfile } from "../components";
import logo from "../assets/blacklogo.png";
import { userQuery } from "../utils/data";
import { client } from "../utils/client";
import { fetchUser } from "../utils/fetchUser";

function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const userInfo = fetchUser();
  const scrollRef = useRef(null);

  useEffect(() => {
    const query = userQuery(userInfo?.aud);
    client.fetch(query).then((data) => setUser(data[0]));
  }, [userInfo?.aud]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            size={30}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="sidebar_logo" className="w-28" />
          </Link>
          {user === null ? (
            <FaUserCircle
              fontSize={45}
              color="gray"
              onClick={() => <Link to="/login" />}
            />
          ) : (
            <Link to={`user-profile/${user?._id}`}>
              <figure className="w-12 rounded-full h-12 object-cover overflow-hidden bg-red-400">
                <img
                  src={user === null ? logo : user?.image}
                  alt="sidebar_logo"
                  className="w-20"
                />
              </figure>
            </Link>
          )}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                className="cursor-pointer"
                fontSize={30}
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route
            path="/user-profile/:userId"
            element={<UserProfile user={user && user} />}
          />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
