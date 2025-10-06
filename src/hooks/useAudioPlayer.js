// central hook for audio state & controls

import { useEffect, useRef, useState, useCallback } from "react";

export default function useAudioPlayer(
  tracks = [],
  repeatMode = "off",
  isShuffle = false
) {
  const audioRef = useRef(null); // will be bound to <audio> element
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [favorites, setFavorites] = useState(() => new Set());

  // loads track source into audio element when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks.length) return;
    // reset and load only when the track truly changes:
    audio.src = tracks[currentIndex].src;
    audio.load();
    setCurrentTime(0);
    setDuration(0);

    // Automatically play if isPlaying is true (e.g. user clicks a new song)
    // .play() only if a new track is requested WHILE playing:
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [currentIndex, tracks]);

  // event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);

    // "all": when at end of list, resets index to zero and plays.(play full playlist once)
    // "one": always repeats current song.
    // "off": stops or advances as usual. (normal flow)
    const onEnded = () => {
      if (repeatMode === "one") {
        // Loop current track
        audio.currentTime = 0;
        audio.play();
        setIsPlaying(true);
      } else if (currentIndex < tracks.length - 1) {
        // Advance to next track
        setCurrentIndex((i) => i + 1);
        setIsPlaying(true); // ensures auto play
        // automatically plays the next track
      } else if (repeatMode === "all") {
        // Loop playlist: go back to first track, play
        setCurrentIndex(0);
        setIsPlaying(true);
        setTimeout(() => audio.play(), 0);
      } else {
        // stop at end
        setIsPlaying(false);
        audio.currentTime = 0;
      }
    };
    const onError = () => {
      console.warn("Audio playback error");
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [currentIndex, tracks.length, repeatMode]);

  // control functions
  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
    setCurrentTime(audio.currentTime);
  }, []);

  const next = useCallback(() => {
    if (isShuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * tracks.length);
      } while (tracks.length > 1 && nextIndex === currentIndex);
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex((i) => (i < tracks.length - 1 ? i + 1 : i));
    }
  }, [isShuffle, tracks.length, currentIndex]);

  const previous = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((previous) => {
      const set = new Set(previous);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return set;
    });
  }, []);

  return {
    audioRef,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    play,
    pause,
    togglePlay,
    seek,
    next,
    previous,
    duration,
    currentTime,
    favorites,
    toggleFavorite,
    tracks,
  };
}
