import React from "react";
import "../../css/footer/SongDetail.css";

const SongDetail = ({ currentSong, isPlaying = false }) => {
  const fallback = {
    name: "Song not selected",
    artist_name: "Not selected",
    image:
      "https://usercontent.jamendo.com?type=album&id=24&width=300&trackid=168",
  };

  const data = currentSong || fallback;

  return (
    <div className="songdetail-root">
      <div className={`songdetail-image-wrapper ${isPlaying ? "is-playing" : ""}`}>
        <img
          src={data.image}
          alt={data.name}
          className={`songdetail-image ${isPlaying ? "spin-slow" : ""}`}
          style={isPlaying ? { borderRadius: "9999px" } : undefined}
        />
        {isPlaying && (
          <span className="songdetail-eq" aria-hidden="true">
            <span className="eq"><span /><span /><span /><span /></span>
          </span>
        )}
      </div>

      <div className="songdetail-text">
        <h3 className="songdetail-title">{data.name}</h3>
        <p className="songdetail-artist">{data.artist_name}</p>
      </div>
    </div>
  );
};

export default SongDetail;
