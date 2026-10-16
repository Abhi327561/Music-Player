import React from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import "../../css/songs/SongCard.css";
const SongCard = ({ song, onSelectFavourite, isPlaying = false, isActive = false })=> {
return (
<motion.div
  initial={{ opacity: 0, y: 14 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -6 }}
  transition={{ duration: 0.3 }}
  className={`song-card ${isActive ? "song-card-active" : ""}`}
  onClick={onSelectFavourite}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => { if (e.key === "Enter") onSelectFavourite?.(); }}
>
<div className="song-card-image">
<img src={song.image} alt={song.name} loading="lazy"/>
<span className="song-card-play">
  {isActive && isPlaying ? (
    <span className="eq"><span /><span /><span /><span /></span>
  ) : (
    <FaPlay size={16} />
  )}
</span>
{isActive && <span className="song-card-now">Now playing</span>}
</div>
<div className="song-card-info">
<h4 className="song-title">{song.name}</h4>
<p className="song-artist">{song.artist_name}</p>
</div>
</motion.div>
);
};
export default SongCard;
