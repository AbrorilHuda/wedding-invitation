import React, { forwardRef } from "react";

export interface AudioPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
}

interface AudioPlayerProps {
  src?: string;
}

export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  (
    {
      src = "https://cdn.pixabay.com/download/audio/2022/03/10/audio_2c8d4f4b8f.mp3",
    },
    ref
  ) => {
    return (
      <audio id="bgm" loop preload="none" ref={ref}>
        <source src={src} type="audio/mpeg" />
      </audio>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
