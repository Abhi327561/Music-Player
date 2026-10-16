import { motion } from "framer-motion";
import "../../css/mainArea/SongList.css";
import { formatTime } from "../utils/helper";

const SkeletonRows = () => (
  <div className="space-y-2 p-1">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
        <div className="skeleton h-11 w-11 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-2/5 rounded" />
          <div className="skeleton h-2.5 w-1/4 rounded" />
        </div>
        <div className="skeleton hidden h-3 w-16 rounded sm:block" />
        <div className="skeleton h-3 w-10 rounded" />
      </div>
    ))}
  </div>
);

const SongList = ({ songs,
onSelectSong,
currentIndex,
isLoading = false,
error = "",
isPlaying = false, }) => {
  if (isLoading) {
    return (
      <div className="songlist-root">
        <SkeletonRows />
      </div>
    );
  }

  if (error) {
    return (
      <div className="songlist-root">
        <div className="songlist-empty">
          <p className="songlist-empty-text">⚠️ {error}</p>
          <span className="songlist-empty-subtext">
            Please retry — your backend may be waking up on Render.
          </span>
        </div>
      </div>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <div className="songlist-root">
        <div className="songlist-empty">
          <p className="songlist-empty-text">🎵 No songs found</p>
          <span className="songlist-empty-subtext">
            Try searching with a different keyword
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="songlist-root">
      <div className="songlist-scroll">
        {songs.length === 0 && (
          <p className="searchbar-empty">Search songs to display 🎧</p>
        )}

        <table className="songlist-table">
          <colgroup>
            <col className="col-index" />
            <col className="col-name" />
            <col className="col-artist" />
            <col className="col-year" />
            <col className="col-duration" />
          </colgroup>

          <thead>
            <tr>
              <th className="songlist-th th-index">No</th>
              <th className="songlist-th">Name</th>
              <th className="songlist-th">Artist</th>
              <th className="songlist-th">Year</th>
              <th className="songlist-th th-duration">Duration</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song, index) => {
              const isActive = currentIndex === index;
              return (
              <motion.tr key={song.id ?? index}
              onClick={()=> onSelectSong(index)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
              whileHover={{ scale: 1.005 }}
              className={`songlist-row ${isActive ? "songlist-row-active": ""}`}
              >
                <td className="songlist-td td-index">
                  {isActive && isPlaying ? (
                    <span className="eq"><span /><span /><span /><span /></span>
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="songlist-td">
                  <span className="inline-flex items-center gap-3">
                    {song.image ? (
                      <img src={song.image} alt="" loading="lazy" className={`h-9 w-9 rounded-lg object-cover ring-1 ${isActive ? "ring-purple-400/60" : "ring-white/10"}`} />
                    ) : null}
                    <span className="font-medium text-white">{song.name}</span>
                  </span>
                </td>
                <td className="songlist-td">{song.artist_name}</td>
                <td className="songlist-td">{song.releasedate}</td>
                <td className="songlist-td td-duration">
                  {formatTime(song.duration)}
                  </td>
              </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongList;
