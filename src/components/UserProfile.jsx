import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";

import { client } from "../utils/client";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { MasonryLayout, Spinner } from "../components";

const randomImg =
  "https://source.unsplash.com/1600x900/?nature,photography,technology,animal,food,reading,wallpaper,outdoors,graphic";
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";
function UserProfile() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  let userId = useParams();
  let paramsUserId = userId.userId;
  const navigate = useNavigate();

  useEffect(() => {
    const query = userQuery(paramsUserId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [paramsUserId, user]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(paramsUserId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savePinsQuery = userSavedPinsQuery(paramsUserId);
      client.fetch(savePinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, paramsUserId]);

  const logout = async () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!userId) <Spinner message="Loading profile..." />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImg}
              alt="banner-pic"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />

            <img
              src={user?.image}
              alt="user-pic"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user?.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId.userId === paramsUserId && (
                <button
                  onClick={logout}
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {/* {console.log(pins)} */}
          {pins?.length > 0 ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center items-center font-bold w-full text-xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
