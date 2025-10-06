import React from "react";
import "./TrackList.css";

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

const fallback =
  "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=400&auto=format&fit=crop";

export default function TrackList({
  tracks,
  currentIndex,
  setCurrentIndex,
  play,
}) {
  // Moves the currently playing track to the front of the array(1st position)
  // and keeps the rest of the order the same.
  // renders the list with the "active" track/song on top.
  const reorderedTracks = [
    tracks[currentIndex],
    ...tracks.slice(0, currentIndex),
    ...tracks.slice(currentIndex + 1),
  ];

  // Helper to map reordered index back to original
  const getRealIndex = (idx) =>
    idx === 0 ? currentIndex : idx <= currentIndex ? idx - 1 : idx;

  return (
    <div className="track-list-container">
      <div className="track-list-scroll">
        {reorderedTracks.map((track, idx) => (
          <div
            key={track.id}
            className={`track-item${idx === 0 ? " active" : ""}`}
            onClick={() => {
              setCurrentIndex(getRealIndex(idx));
              play();
            }}
            tabIndex={0}
            aria-selected={idx === 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setCurrentIndex(getRealIndex(idx));
                play();
              }
            }}
          >
            <img
              src={track.album && track.album.length ? track.album : fallback}
              alt={track.title}
              className="track-thumb"
            />
            <div className="track-info-small">
              <p className="track-title-small" title={track.title}>
                {truncate(track.title, 22)}
              </p>
              <p className="track-artist-small" title={track.artist}>
                {truncate(track.artist, 18)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
