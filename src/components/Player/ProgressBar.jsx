// visual timeline + draggable thumb + times; SRP: only timeline logic

import React, { useCallback, useRef, useState } from "react";
import "./ProgressBar.css";

// Converts seconds into MM:SS format for display.
// default val 0 sec to avoid undefined
function formatTime(s = 0) {
  if (isNaN(s)) return "0:00";
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function ProgressBar({ duration = 0, currentTime = 0, onSeek }) {
  // References to the progress bar DOM element for measuring width and pointer events.
  const barRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // will allow seeking(jumping) by clicking on the progress bar
  const handleClick = useCallback(
    (e) => {
      const rect = barRef.current.getBoundingClientRect(); //getting bar dimensions and position
      const x = e.clientX - rect.left; //Mouse X coordinate relative to the bar
      const percentage = Math.max(0, Math.min(1, x / rect.width)); //% of bar clicked (0–1)
      onSeek(percentage * duration); //update currentTime in parent
    },
    [duration, onSeek]
  );

  // handle dragging the thumb by mouse to seek
  //Ensures the element receives pointer events even if cursor moves outside
  const handlePointerDown = useCallback(
    (e) => {
      if (!barRef.current) return;
      setIsDragging(true);
      barRef.current.setPointerCapture?.(e.pointerId);
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      onSeek(percentage * duration);
    },
    [duration, onSeek]
  );

  //Updates playback time as the thumb is dragged.
  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging || !barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      onSeek(percentage * duration);
    },
    [isDragging, duration, onSeek]
  );

  //Stops dragging when user releases mouse button.
  //Release pointer capture when done dragging
  const handlePointerUp = useCallback((e) => {
    if (!barRef.current) return;
    setIsDragging(false);
    try {
      barRef.current.releasePointerCapture?.(e.pointerId);
    } catch {}
  }, []);

  //Calculate how much the bar should be filled
  const percentage = duration
    ? Math.max(0, Math.min(1, currentTime / duration))
    : 0;

  return (
    <div className="progress-wrap">
      <div className="time left">{formatTime(currentTime)}</div>
      <div
        className="progress-bar"
        ref={barRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={duration || 0}
        aria-valuenow={currentTime}
        tabIndex={0}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="progress-filled"
          style={{ width: `${percentage * 100}%` }}
        />
        <div
          className="thumb"
          style={{ left: `${percentage * 100}%` }}
          aria-hidden
        />
      </div>
      <div className="time right">{formatTime(duration)}</div>
    </div>
  );
}
