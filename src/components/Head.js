import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toggleMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { Youtube_Search_Api } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
const Head = () => {
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    // make an api call after every key press
    // but if the diff between 2 api calls is < 200ms decline the api call

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 2000);

    return () => {
      console.log("clear time out called");
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await axios.get("https://ytserver-tau.vercel.app/api", {
      params: { q: searchQuery },
    });
    const json = data;
    localStorage.setItem("data", JSON.stringify(json.data.items));
    setSuggestions(json.data.items);
    setShowSuggestions(true);
    // update cache
    dispatch(
      cacheResults({
        // [searchQuery]:json.data.items,
      })
    );
  };
  console.log(suggestions);
  return (
    <div className="grid grid-flow-col p-3 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className=" h-7 cursor-pointer"
          alt="menuicon"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"
          onClick={() => toggleMenuHandler()}
        />
        <img
          className="h-8 w-28 ml-4"
          alt="youtube-icon"
          src="https://static.india.com/wp-content/uploads/2023/06/youtube-1.jpg?impolicy=Medium_Resize&w=1200&h=800"
        />
      </div>

      <div className=" col-span-10">
        <div>
          <input
            type="text"
            placeholder="Search by Youtube Video ID"
            className=" w-3/4 py-1 px-4 border border-gray-400 rounded-l-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-3 py-1 rounded-r-full bg-slate-200">
            🔍
          </button>
        </div>
        {localStorage?.getItem("data") && (
          <>
            <div>
              <a
                href={`https://www.youtube.com/watch?v=${suggestions?.[0]?.id}`}
              >
                {suggestions?.[0]?.snippet?.title}
              </a>
            </div>
          </>
        )}
        {showSuggestions && (
          <div className=" fixed bg-white px-5 py-2 w-[50rem] rounded-lg shadow-lg "></div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className=" h-8 w-9"
          alt="user-photo"
          src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
        />
      </div>
    </div>
  );
};
export default Head;
