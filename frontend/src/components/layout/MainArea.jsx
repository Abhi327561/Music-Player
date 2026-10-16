import React from "react";
import { useSelector } from "react-redux";

import Auth from "../auth/Auth";
import Playlist from "../player/Playlist";
import SearchBar from "../search/SearchBar";
import SongList from "../player/SongList";
import SongGrid from "../songs/SongGrid";

import "../../css/mainArea/MainArea.css";

const MainArea = ({
  view,
  currentIndex,
  onSelectSong,
  onSelectFavourite,
  onSelectTag,
  songsToDisplay,
  setSearchSongs,
  isLoadingSongs = false,
  songsError = "",
  isPlaying = false,
}) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="mainarea-root">
      <div className="mainarea-top">
        <Auth />
        {view === "home" && <Playlist onSelectTag={onSelectTag} />}
        {view === "search" && <SearchBar setSearchSongs={setSearchSongs} />}
      </div>

      <div className="mainarea-scroll">
        {(view === "home" || view === "search") && <SongList songs={songsToDisplay}
          onSelectSong={onSelectSong}
          currentIndex={currentIndex}
          isLoading={isLoadingSongs}
          error={songsError}
          isPlaying={isPlaying} />}

        {view === "favourite" &&
          <SongGrid
            songs={auth.user?.favourites || []}
            onSelectFavourite={onSelectFavourite}
            isPlaying={isPlaying}
            currentSongName={null} />}
      </div>
    </div>
  );
};

export default MainArea;
