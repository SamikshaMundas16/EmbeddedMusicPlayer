import React from "react";
import Player from "./components/Player/Player";
import tracks from "./data/tracks";

export default function App() {
  return <Player tracks={tracks} />;
}