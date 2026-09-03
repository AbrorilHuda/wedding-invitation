import React from "react";
import { WEDDING_CONFIG } from "../config/wedding";
import type { GalleryPhoto } from "../types/invitation";

export const GALLERY_PHOTOS: GalleryPhoto[] = WEDDING_CONFIG.galleryPhotos;

interface GalleryProps {
  onPhotoClick: (index: number) => void;
}

export function Gallery({ onPhotoClick }: GalleryProps) {
  const photos = WEDDING_CONFIG.galleryPhotos;

  return (
    <section className="bg-cream pad" id="galeri">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <span className="num-tag reveal-el">04 — Momen</span>
          <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
            Galeri Foto
          </h2>
          <p
            className="lede reveal-el"
            style={{ margin: "16px auto 0", textAlign: "center" }}
          >
            Setiap potret mengabadikan kehangatan, kebahagiaan, dan ketulusan
            cinta yang kami syukuri.
          </p>
        </div>

        <div className="gal-editorial reveal-el">
          {/* Featured Large Photo */}
          {photos.length > 0 && (
            <figure
              className="gal-featured"
              data-src={photos[0].fullSrc}
              onClick={() => onPhotoClick(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onPhotoClick(0);
                }
              }}
            >
              <img src={photos[0].thumbSrc} alt={photos[0].alt} loading="lazy" />
              <div className="gal-overlay">
                <span className="gal-zoom-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </span>
              </div>
            </figure>
          )}

          {/* Grid of Remaining Photos */}
          <div className="gal-grid">
            {photos.slice(1).map((photo, sliceIdx) => {
              const actualIndex = sliceIdx + 1;
              return (
                <figure
                  key={photo.id}
                  className={`gal-thumb ${photo.tall ? "tall" : ""}`}
                  data-src={photo.fullSrc}
                  onClick={() => onPhotoClick(actualIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onPhotoClick(actualIndex);
                    }
                  }}
                >
                  <img src={photo.thumbSrc} alt={photo.alt} loading="lazy" />
                  <div className="gal-overlay">
                    <span className="gal-zoom-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </span>
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

