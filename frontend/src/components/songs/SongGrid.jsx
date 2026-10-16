import React from "react";
import SongCard from "./SongCard";
import "../../css/songs/SongGrid.css";


const SongGrid = ({ songs, onSelectFavourite, isPlaying = false, currentSongName = null }) =>{
if (!songs || songs.length ===0) {
return (
<div className="song-grid-empty">
<div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/15 text-2xl">💜</div>
<p className="empty-text">No Favourite songs yet</p>
<p className="empty-subtext">
Start exploring and add songs to your favourites!
</p>
</div>
);
}


return (
<div className="song-grid-wrapper">
<h2 className="song-grid-heading">Your Favourites <span className="ml-2 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-gray-200">{songs.length}</span></h2>
<div className="song-grid">
{songs.map((song) => (
<SongCard
key={song.id}
song={song}
onSelectFavourite={() => onSelectFavourite(song)}
isPlaying={isPlaying}
isActive={currentSongName ? song.name === currentSongName : false}
/>
))}
</div>
</div>
);
};

export default SongGrid;
