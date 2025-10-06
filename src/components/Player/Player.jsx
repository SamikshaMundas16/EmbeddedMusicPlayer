// top-level player container — composes the smaller components
import React, { useState, useEffect, useRef } from "react";
import "./Player.css";
import TrackInfo from "./TrackInfo";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { IconFavoriteButton } from "../../assets/Icons";
import TrackList from "./TrackList";

// prop - tracks - array of objects -> contains metadata (title, artist, album, audio URL, id)
//from data/tracks.js
export default function Player({ tracks }) {
  // Three possible modes/values for repeatMode: off, one, all
  const [repeatMode, setRepeatMode] = useState("off");
  //shuffle songs
  const [isShuffle, setIsShuffle] = useState(false);

  // TrackList Drawer, attached beneath
  const [isTrackListOpen, setTrackListOpen] = useState(false);

  // Repeat Mode: off -> all -> one -> off
  const toggleRepeat = () => {
    setRepeatMode((previous) =>
      previous === "off" ? "all" : previous === "all" ? "one" : "off"
    );
  };
  //shuffle
  const toggleShuffle = () => setIsShuffle((previous) => !previous);

  // Destructuring returns from the custom audio hook(useAudioPlayer)
  const {
    audioRef, // Reference to hidden <audio> element.
    currentIndex, // Current track index in the playlist.
    setCurrentIndex, //fn to update track index.
    isPlaying, //bool -> true if music is playing
    togglePlay, //fn -> toggles play/pause state
    play, //fn -> plays current track
    next, //fn -> plays next track
    previous, //fn -> plays previous track
    duration, //num -> total duration of the current track
    currentTime, //num -> current playback time
    seek, //fn -> seeks/to jump to a specific time
    favorites, //Set -> contains ID's of favorite track
    toggleFavorite, //fn -> adds/removes track from favorites
  } = useAudioPlayer(tracks, repeatMode, isShuffle);

  // keyboard accessibility for the player, which creates a reference to the outer div of the player for keyboard focus
  const containerRef = useRef(null);
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const onKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault(); // prevents default action of scrolling page
        togglePlay();
      } else if (e.key === "ArrowRight") {
        // seek +5s
        seek((currentTime || 0) + 5);
      } else if (e.key === "ArrowLeft") {
        seek((currentTime || 0) - 5);
      }
    };

    element.addEventListener("keydown", onKey);
    return () => element.removeEventListener("keydown", onKey);
  }, [togglePlay, seek, currentTime]);

  return (
    <div
      className="player-outer"
      ref={containerRef} //allows keyboard handling
      tabIndex={0} // Makes div focusable with for keyboard navigation.
      aria-label="Embedded music player"
    >
      {/* hidden audio element which plays actual music — controlled using audioRef from custom hook */}
      <audio ref={audioRef} />

      {/* Player Card UI */}
      <div className="player-wrapper">
        <div
          className="player-card"
          role="region"
          aria-label="Music player controls"
        >
          {/* top section: album + title + favorite btn */}
          <div className="player-top">
            <TrackInfo
              title={tracks[currentIndex].title}
              artist={tracks[currentIndex].artist}
              album={tracks[currentIndex].album}
            />
            <button
              className={`btn favorite ${
                favorites.has(tracks[currentIndex].id) ? "active" : ""
              }`}
              onClick={() => toggleFavorite(tracks[currentIndex].id)}
              aria-pressed={favorites.has(tracks[currentIndex].id)}
              title={
                favorites.has(tracks[currentIndex].id)
                  ? "Favorited"
                  : "Favorite"
              }
            >
              <IconFavoriteButton
                filled={favorites.has(tracks[currentIndex].id)}
              />
            </button>
          </div>

          {/* middle section: progress bar */}
          <div className="player-middle-progress-bar">
            <ProgressBar
              duration={duration}
              currentTime={currentTime}
              onSeek={seek}
            />
          </div>

          {/* bottom section: controls buttons*/}
          <div className="player-bottom-controls">
            <Controls
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
              onNext={next}
              onPrevious={previous}
              repeatMode={repeatMode}
              onToggleRepeat={toggleRepeat}
              isShuffle={isShuffle}
              onToggleShuffle={toggleShuffle}
              onFavorite={() => toggleFavorite(tracks[currentIndex].id)}
              onTrackListClick={() => setTrackListOpen((open) => !open)}
              isTrackListOpen={isTrackListOpen}
            />
          </div>
        </div>
        {/* Drawer, attached directly beneath */}
        {isTrackListOpen && (
          <div className="tracklist-drawer">
            <TrackList
              tracks={tracks}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              play={play}
            />
          </div>
        )}
      </div>
    </div>
  );
}
