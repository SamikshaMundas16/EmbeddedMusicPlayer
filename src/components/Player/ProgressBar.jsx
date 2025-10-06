// visual timeline + draggable thumb + times; SRP: only timeline logic

import React, { useCallback, useRef, useState } from "react";
import "./ProgressBar.css";

function formatTime(s = 0) {
  if (isNaN(s)) return "0:00";
  const mm = Math.floor(s / 60);
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function ProgressBar({ duration = 0, currentTime = 0, onSeek }) {
  const barRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = useCallback(
    (e) => {
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      onSeek(pct * duration);
    },
    [duration, onSeek]
  );

  const handlePointerDown = useCallback(
    (e) => {
      if (!barRef.current) return;
      setIsDragging(true);
      barRef.current.setPointerCapture?.(e.pointerId);
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      onSeek(pct * duration);
    },
    [duration, onSeek]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging || !barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      onSeek(pct * duration);
    },
    [isDragging, duration, onSeek]
  );

  const handlePointerUp = useCallback((e) => {
    if (!barRef.current) return;
    setIsDragging(false);
    try {
      barRef.current.releasePointerCapture?.(e.pointerId);
    } catch {}
  }, []);

  const pct = duration ? Math.max(0, Math.min(1, currentTime / duration)) : 0;

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
        <div className="progress-filled" style={{ width: `${pct * 100}%` }} />
        <div className="thumb" style={{ left: `${pct * 100}%` }} aria-hidden />
      </div>
      <div className="time right">{formatTime(duration)}</div>
    </div>
  );
}
