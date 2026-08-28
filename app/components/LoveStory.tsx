import React from "react";
import type { StoryMoment } from "../types/invitation";

const STORY_MOMENTS: StoryMoment[] = [
  {
    chapter: "I",
    when: "Maret 2021",
    title: "Awal Pertemuan",
    desc: "Takdir mempertemukan kami di sebuah acara kampus. Sebuah percakapan singkat yang tak disangka menjadi awal dari segalanya.",
    image:
      "https://images.unsplash.com/photo-1758727654358-a90614d694eb?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    alt: "Pertemuan",
  },
  {
    chapter: "II",
    when: "Desember 2022",
    title: "Semakin Dekat",
    desc: "Hari demi hari kami lalui bersama. Saling mengenal, memahami, dan menemukan kenyamanan dalam kehadiran satu sama lain.",
    image:
      "https://images.unsplash.com/photo-1785033156412-d70febb5caa9?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    alt: "Dekat",
  },
  {
    chapter: "III",
    when: "Februari 2026",
    title: "Sebuah Janji",
    desc: "Dengan restu kedua keluarga, sebuah cincin menjadi tanda janji untuk melangkah ke jenjang yang lebih serius dan suci.",
    image:
      "https://images.unsplash.com/photo-1776266100731-b70a9211e081?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    alt: "Lamaran",
  },
  {
    chapter: "IV",
    when: "September 2026",
    title: "Menuju Halal",
    desc: "Kini kami siap menyatukan dua hati dalam ikatan pernikahan, memohon doa restu dari orang-orang tercinta.",
    image:
      "https://images.unsplash.com/photo-1775126964671-43b4c1a1c5ce?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    alt: "Menuju halal",
  },
];

export function LoveStory() {
  return (
    <section className="bg-beige pad" id="story">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span className="num-tag reveal-el">02 — Perjalanan</span>
          <h2 className="title reveal-el" style={{ marginTop: "10px" }}>
            Love Story
          </h2>
        </div>

        <div className="story-timeline">
          {STORY_MOMENTS.map((item, index) => (
            <div
              key={item.chapter}
              className="story-item reveal-el"
            >
              <div className="story-photo">
                <div className="story-chapter serif">{item.chapter}</div>
                <img src={item.image} alt={item.alt} loading="lazy" />
              </div>
              <div className="story-body">
                <div className="when">{item.when}</div>
                <h3 className="serif">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

