import React from "react";
import "./Controls.css";

// importing reusable icons components
import {
  IconPlayButton,
  IconPauseButton,
  IconPreviousButton,
  IconNextButton,
  IconRepeatButton,
  IconShuffleButton,
  IconTrackListButton,
  IconShareButton,
} from "../../assets/Icons";

// Control buttons component receives props from Player.jsx
export default function Controls({
  isPlaying, //bool -> tracks if music is playing or paused
  onPlayPause, //fn -> toggles play/pause state
  onNext, //fn -> plays next track
  onPrevious, //fn -> plays previous track
  repeatMode, //str -> Can: off, one, all mode
  onToggleRepeat, //fn -> toggles repeat mode
  isShuffle, //bool -> tracks if shuffle is on or off
  onToggleShuffle, //fn -> toggles shuffle mode
  onTrackListClick, //fn -> opens/closes track list
  isTrackListOpen, //bool -> tracks if track list is open
}) {
  return (
    <div className="controls" role="toolbar" aria-label="Playback controls">
      {/* Share Button */}
      <button className="btn small share" title="Share">
        <IconShareButton />
      </button>

      {/* Repeat Button */}
      <button
        className={`btn small repeat${repeatMode !== "off" ? " active" : ""}`}
        onClick={onToggleRepeat}
        aria-pressed={repeatMode !== "off"}
        title={
          repeatMode === "off"
            ? "Repeat off"
            : repeatMode === "one"
            ? "Repeat current track"
            : "Repeat all tracks"
        }
      >
        <IconRepeatButton mode={repeatMode} />
      </button>

      {/* Previous Button */}
      <button
        className="btn small"
        title="Previous"
        onClick={onPrevious}
        aria-label="Previous track"
      >
        <IconPreviousButton />
      </button>

      {/* Play-Pause Button */}
      <button
        className="btn play"
        onClick={onPlayPause}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <div className="play-inner">
          {isPlaying ? (
            <IconPauseButton size={40} />
          ) : (
            <IconPlayButton size={40} />
          )}
        </div>
      </button>

      {/* Next Button */}
      <button
        className="btn small"
        title="Next"
        onClick={onNext}
        aria-label="Next track"
      >
        <IconNextButton />
      </button>

      {/* Shuffle Button */}
      <button
        className={`btn small shuffle${isShuffle ? " active" : ""}`}
        onClick={onToggleShuffle}
        aria-pressed={isShuffle}
        title={isShuffle ? "Shuffle: On" : "Shuffle: Off"}
      >
        <IconShuffleButton active={isShuffle} />
      </button>

      {/* Track List Button */}
      <button
        className={`btn small trackList${isTrackListOpen ? " active" : ""}`}
        onClick={onTrackListClick}
        aria-pressed={isTrackListOpen}
        title="Track List"
      >
        <IconTrackListButton active={isTrackListOpen} />
      </button>
    </div>
  );
}
