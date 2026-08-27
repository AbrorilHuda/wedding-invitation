import React from "react";

export function Ayat() {
  return (
    <section className="bg-cream pad" id="ayat">
      <div className="wrap ayat">
        <div className="gold-line reveal-el" />
        <span
          className="eyebrow reveal-el"
          style={{ display: "block", marginTop: "20px" }}
        >
          QS. Ar-Rum : 21
        </span>
        <p className="arab reveal-el">
          وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا
          لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً
        </p>
        <p className="translate reveal-el">
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
          pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
          merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih
          dan sayang.&rdquo;
        </p>
        <div className="divider reveal-el">
          <span className="bar" />
          <span className="dot" />
          <span className="bar" />
        </div>
      </div>
    </section>
  );
}
