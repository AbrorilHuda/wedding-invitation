export interface Wish {
  id?: string;
  n: string;
  h: "Hadir" | "Tidak Hadir" | string;
  p: string;
  createdAt?: string;
}

export interface StoryMoment {
  chapter: string;
  title: string;
  when: string;
  desc: string;
  image: string;
  alt: string;
}

export interface GalleryPhoto {
  id: number;
  fullSrc: string;
  thumbSrc: string;
  alt: string;
  tall?: boolean;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountHolder: string;
  testId: string;
}
