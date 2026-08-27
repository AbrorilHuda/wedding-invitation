import React, { forwardRef } from "react";
import { WEDDING_CONFIG } from "../config/wedding";

export interface AudioPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
}

interface AudioPlayerProps {
  src?: string;
}

export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ src = WEDDING_CONFIG.musicUrl }, ref) => {
    return (
      <audio id="bgm" loop preload="auto" ref={ref}>
        <source src={src} type="audio/mpeg" />
      </audio>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
