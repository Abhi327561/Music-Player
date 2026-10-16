import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import useAudioPlayer from "../hooks/useAudioPlayer";

import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";
import Modal from "../components/common/Modal";
import EditProfile from "../components/auth/EditProfile";

import "../css/pages/HomePage.css";

const Homepage = () => {
  const [view, setView] = useState("home");
  const [songs, setSongs] = useState([]);
  const [searchSongs, setSearchSongs] = useState([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(true);
  const [songsError, setSongsError] = useState("");
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const auth = useSelector((state) => state.auth);
  const songsToDisplay = view === "search" ? searchSongs : songs;

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const {
    audioRef,
    currentIndex,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume,
    playSongAtIndex,
    handleTogglePlay,
    handleNext,
    handlePrev,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    handleToggleMute,
    handleToggleLoop,
    handleToggleShuffle,
    handleSeek,
    handleChangeVolume,
    handleChangeSpeed,
  } = useAudioPlayer(songsToDisplay);

  const playerState = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume,
  };
  const playerControls = {
    playSongAtIndex,
    handleTogglePlay,
    handleNext,
    handlePrev,
    handleSeek
  };

  const playerFeatures = {
    onToggleMute: handleToggleMute,
    onToggleLoop: handleToggleLoop,
    onToggleShuffle: handleToggleShuffle,
    onSeek: handleSeek,
    onChangeVolume: handleChangeVolume,
    onChangeSpeed: handleChangeSpeed,
  };

  useEffect(() => {
    const fetchInitalSongs = async () => {
      try {
        setIsLoadingSongs(true);
        setSongsError("");
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/songs`,
        );
        setSongs(res.data.results || []);
      } catch (error) {
        console.error("Error while fetching the songs", error);
        setSongs([]);
        setSongsError("Couldn't load songs. Check your connection and retry.");
      } finally {
        setIsLoadingSongs(false);
      }
    };
    fetchInitalSongs();
  }, []);

  const loadPlaylist = async (tag) => {
    if (!tag) {
      console.warn("No tag is provided");
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/songs/playlistByTag/${tag}`,
      );
      setSongs(res.data.results || []);
    } catch (error) {
      console.error("Failed to load playlist", error);
      setSongs([]);
    }
  };

  // When user clicks on a song in a table
  const handleSelectSong = (index) => {
    playSongAtIndex(index);
  };

  const handlePlayFavourite = (song) => {
    const favourites = auth.user?.favourites || [];
    if (!favourites.length) return;

    const index = auth.user.favourites.findIndex((fav) => fav.id === song.id);
    setSongs(auth.user.favourites);
    setView("home");

    setTimeout(() => {
      if (index !== -1) {
        playSongAtIndex(index);
      }
    }, 0);
  };

  return (
    <div className="homepage-root">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#14141c", color: "#fff", border: "1px solid rgba(168,85,247,0.35)" },
        }}
      />
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        {currentSong && <source src={currentSong.audio}
          type="audio/mpeg" />}
      </audio>
      <div className="homepage-main-wrapper">
        {/* Sidebar */}
        <div className="homepage-sidebar">
          <SideMenu setView={setView} view={view}
            onOpenEditProfile={() => setOpenEditProfile(true)}
          />
        </div>
        {/* Main Content */}
        <div className="homepage-content">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="ambient-blob left-[-80px] top-[-80px] h-64 w-64 bg-purple-600/25" />
            <div className="ambient-blob right-[-60px] top-[30%] h-72 w-72 bg-pink-600/20" />
            <div className="ambient-blob bottom-[-100px] left-[30%] h-64 w-64 bg-blue-600/15" />
          </div>
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 mb-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-purple-600/25 via-pink-600/15 to-blue-600/20 p-5 backdrop-blur-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-200/80">{greeting}{auth.user?.name ? `, ${auth.user.name.split(" ")[0]}` : ""}</p>
            <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  Feel the <span className="text-gradient">beat</span> tonight
                </h1>
                <p className="mt-1 text-sm text-gray-300">
                  {isLoadingSongs ? "Loading your library…" : `${songsToDisplay.length} tracks ready · ${currentSong ? `Now playing: ${currentSong.name}` : "Pick a song to start"}`}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-200">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur">{view === "home" ? "Home" : view === "search" ? "Search" : "Favourites"}</span>
                {isPlaying && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1.5">
                    <span className="eq"><span /><span /><span /><span /></span> Playing
                  </span>
                )}
              </div>
            </div>
          </motion.header>
          <MainArea view={view} currentIndex={currentIndex}
            onSelectSong={handleSelectSong}
            onSelectFavourite={handlePlayFavourite}
            onSelectTag={loadPlaylist}
            songsToDisplay={songsToDisplay}
            setSearchSongs={setSearchSongs}
            isLoadingSongs={isLoadingSongs}
            songsError={songsError}
            isPlaying={isPlaying} />
        </div>
      </div>
      {/* Footer Player */}
      <Footer
        playerState={playerState}
        playerControls={playerControls}
        playerFeatures={playerFeatures}
      />

      {openEditProfile && (
        <Modal onClose={() => setOpenEditProfile(false)}>
          <EditProfile onClose={() => setOpenEditProfile(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Homepage;
