import React from "react";
import type { GalleryPhoto } from "../types/invitation";

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 0,
    tall: true,
    fullSrc:
      "https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    thumbSrc:
      "https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    alt: "Foto Pernikahan 1",
  },
  {
    id: 1,
    tall: false,
    fullSrc:
      "https://images.unsplash.com/photo-1758727654358-a90614d694eb?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    thumbSrc:
      "https://images.unsplash.com/photo-1758727654358-a90614d694eb?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    alt: "Foto Pernikahan 2",
  },
  {
    id: 2,
    tall: false,
    fullSrc:
      "https://images.unsplash.com/photo-1541679368093-5c967ac6de11?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    thumbSrc:
      "https://images.unsplash.com/photo-1541679368093-5c967ac6de11?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    alt: "Foto Pernikahan 3",
  },
  {
    id: 3,
    tall: false,
    fullSrc:
      "https://images.unsplash.com/photo-1785033156412-d70febb5caa9?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    thumbSrc:
      "https://images.unsplash.com/photo-1785033156412-d70febb5caa9?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    alt: "Foto Pernikahan 4",
  },
  {
    id: 4,
    tall: true,
    fullSrc:
      "https://images.unsplash.com/photo-1775126964671-43b4c1a1c5ce?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    thumbSrc:
      "https://images.unsplash.com/photo-1775126964671-43b4c1a1c5ce?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    alt: "Foto Pernikahan 5",
  },
  {
    id: 5,
    tall: false,
    fullSrc:
      "https://images.unsplash.com/photo-1776266100731-b70a9211e081?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    thumbSrc:
      "https://images.unsplash.com/photo-1776266100731-b70a9211e081?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    alt: "Foto Pernikahan 6",
  },
  {
    id: 6,
    tall: false,
    fullSrc:
      "https://images.unsplash.com/photo-1619422306166-ac08c06b02e3?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    thumbSrc:
      "https://images.unsplash.com/photo-1619422306166-ac08c06b02e3?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    alt: "Foto Pernikahan 7",
  },
];

interface GalleryProps {
  onPhotoClick: (index: number) => void;
}

export function Gallery({ onPhotoClick }: GalleryProps) {
  return (
    <section className="bg-cream pad" id="galeri">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <span className="num-tag reveal-el">04 — Momen</span>
          <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
            Galeri
          </h2>
        </div>

        <div className="gal reveal-el">
          {GALLERY_PHOTOS.map((photo, index) => (
            <figure
              key={photo.id}
              className={photo.tall ? "tall" : undefined}
              data-src={photo.fullSrc}
              onClick={() => onPhotoClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onPhotoClick(index);
                }
              }}
            >
              <img src={photo.thumbSrc} alt={photo.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
