// src/components/Player/TrackInfo.js
import React, { useRef, useEffect, useState } from "react";
import "./TrackInfo.css";

export default function TrackInfo({ title, artist, album }) {
  const fallback =
    "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=400&auto=format&fit=crop";
  const albumSrc = album && album.length ? album : fallback;

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // using a gap between repeated titles so the loop doesn't look cramped.
  const GAP = 48;

  const measure = () => {
    const wrapper = wrapperRef.current;
    const textElement = textRef.current;
    if (!wrapper || !textElement) return;

    const textWidth = textElement.scrollWidth;
    const containerWidth = wrapper.offsetWidth;

    // measuring the actual text width and the visible container width
    //If the text doesn’t fit (textWidth is greater) -> marquee animation
    if (textWidth > containerWidth + 2) {
      // need marquee
      setIsOverflowing(true); // scrolling version of the text instead of static
      const distance = textWidth + GAP; // how much to shift to hide first copy
      const speedPxPerSec = 80; // px per second
      const duration = Math.max(4, distance / speedPxPerSec);

      // setting custom CSS vars so CSS animation uses correct distance & duration
      wrapper.style.setProperty("--marquee-distance", `${distance}px`);
      wrapper.style.setProperty("--marquee-duration", `${duration}s`);
    } else {
      setIsOverflowing(false);
      wrapper.style.removeProperty("--marquee-distance");
      wrapper.style.removeProperty("--marquee-duration");
    }
  };

  useEffect(() => {
    measure();
    // re-measure when window resizes
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [title]);

  return (
    <div className="track-info">
      <img
        className="album"
        src={albumSrc}
        alt={`${title} album`}
        onError={(e) => {
          e.target.src = fallback;
        }}
        width="88"
        height="88"
      />

      <div className="meta">
        {/* title wrapper -> gets the CSS variables and overflow hidden */}
        <div
          className={`title-wrapper ${isOverflowing ? "scroll" : ""}`}
          ref={wrapperRef}
          title={title}
        >
          {/* title-inner -> contains one or two copies of the text */}
          <div className="title-inner" aria-hidden={false}>
            <span className="title" ref={textRef}>
              {title}
            </span>

            {/* duplicate only when overflowing to create seamless loop */}
            {isOverflowing && (
              <span className="title clone" aria-hidden="true">
                {title}
              </span>
            )}
          </div>
        </div>

        <div className="artist" title={artist}>
          {artist}
        </div>
      </div>
    </div>
  );
}
