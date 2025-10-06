# Embedded Music Player

## Features

- Play, pause, skip forward and backward through tracks
- Repeat modes: Off, Repeat All, Repeat One
- Shuffle mode toggle
- Display current track info: title, artist, album
- Favorite/unfavorite tracks with visual indicator
- Progress bar with seek support
- Keyboard features: Space to play/pause, arrow keys to seek(jump +5/-5 secs)
- Track list drawer for easy track selection

## Project Structure

- Player.jsx: Main player container composes all smaller components
- useAudioPlayer.js: Custom hook manages audio state, playback, and controls
- TrackInfo.jsx: Displays album/cover, title, and artist info
- Controls.jsx: Playback control buttons and toggles
- ProgressBar.jsx: Shows current playback progress and allows seeking
- TrackList.jsx: Drawer/Modal showing all tracks with selection and play option
- Icons.jsx: Contains reusable icon components
- CSS files for styling each component separately

## Usage

1. Clone the repo:  
   `git clone [repository-url]`
2. Install dependencies:  
   `npm install`
3. Start the development server:  
   `npm run dev`
