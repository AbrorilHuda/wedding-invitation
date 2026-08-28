import React, { forwardRef } from "react";
import { WEDDING_CONFIG } from "../config/wedding";

export interface AudioPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
}

interface AudioPlayerProps {
  src?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: () => void;
}

export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ src = WEDDING_CONFIG.musicUrl, onPlay, onPause, onEnded, onError }, ref) => {
    return (
      <audio
        id="bgm"
        loop
        preload="auto"
        ref={ref}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onError={onError}
      >
        <source src={src} type="audio/mpeg" />
      </audio>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
