import { Question } from '../types';

export const questions: Question[] = [
  // === Extraversion (E) vs Introversion (I) ===
  {
    id: 1,
    text: "Saya merasa terisi energi setelah berkumpul dengan banyak orang dalam suatu acara sosial.",
    dimension: "EI",
    direction: "positive" // Agree -> E
  },
  {
    id: 2,
    text: "Saya lebih menikmati akhir pekan santai sendirian atau bersama satu-dua orang terdekat saja daripada pergi ke pesta besar.",
    dimension: "EI",
    direction: "negative" // Agree -> I
  },
  {
    id: 3,
    text: "Saat mendapatkan kabar menarik atau sedang bahagia, dorongan pertama saya adalah langsung membagikannya kepada orang lain.",
    dimension: "EI",
    direction: "positive" // Agree -> E
  },
  {
    id: 4,
    text: "Dalam diskusi kelompok atau rapat, saya cenderung mendengarkan dengan saksama sebelum mulai berbicara.",
    dimension: "EI",
    direction: "negative" // Agree -> I
  },
  {
    id: 5,
    text: "Saya merasa nyaman dan percaya diri untuk memulai obrolan dengan orang baru yang baru saja saya temui.",
    dimension: "EI",
    direction: "positive" // Agree -> E
  },
  {
    id: 6,
    text: "Setelah seharian berinteraksi secara sosial dengan banyak orang, saya membutuhkan waktu menyendiri untuk memulihkan energi.",
    dimension: "EI",
    direction: "negative" // Agree -> I
  },

  // === Sensing (S) vs Intuition (N) ===
  {
    id: 7,
    text: "Saya lebih menyukai fakta-fakta nyata dan detail praktis dibanding teori-teori abstrak yang belum terbukti kegunaannya.",
    dimension: "SN",
    direction: "positive" // Agree -> S
  },
  {
    id: 8,
    text: "Saya sering berimajinasi tentang masa depan dan menyukai ide-ide kreatif serta pemikiran di luar kebiasaan (out-of-the-box).",
    dimension: "SN",
    direction: "negative" // Agree -> N
  },
  {
    id: 9,
    text: "Saya merasa lebih nyaman mengikuti petunjuk pengerjaan langkah-demi-langkah yang jelas daripada mencari tahu jalannya sendiri.",
    dimension: "SN",
    direction: "positive" // Agree -> S
  },
  {
    id: 10,
    text: "Saya cenderung mencari makna tersembunyi atau pola tersembunyi di balik suatu peristiwa dibanding menerima hal apa adanya.",
    dimension: "SN",
    direction: "negative" // Agree -> N
  },
  {
    id: 11,
    text: "Saya lebih menghargai pengalaman nyata yang telah terbukti berhasil dibanding mencoba cara baru yang belum pernah diuji.",
    dimension: "SN",
    direction: "positive" // Agree -> S
  },
  {
    id: 12,
    text: "Saya cepat merasa bosan dengan tugas-tugas rutin yang berulang dan lebih menyukai tantangan baru yang memicu imajinasi.",
    dimension: "SN",
    direction: "negative" // Agree -> N
  },

  // === Thinking (T) vs Feeling (F) ===
  {
    id: 13,
    text: "Saat mengambil keputusan penting, saya lebih mendahulukan analisis logis yang objektif daripada perasaan personal atau empati.",
    dimension: "TF",
    direction: "positive" // Agree -> T
  },
  {
    id: 14,
    text: "Saya sangat mempertimbangkan perasaan orang lain dan berusaha keras menjaga keharmonisan kelompok ketika memutuskan sesuatu.",
    dimension: "TF",
    direction: "negative" // Agree -> F
  },
  {
    id: 15,
    text: "Dalam berdiskusi, menyampaikan kebenaran objektif jauh lebih penting bagi saya daripada bersikap manis demi menjaga perasaan orang.",
    dimension: "TF",
    direction: "positive" // Agree -> T
  },
  {
    id: 16,
    text: "Saya mudah berempati dan secara refleks ikut merasakan kebahagiaan atau kesedihan orang-orang di sekitar saya.",
    dimension: "TF",
    direction: "negative" // Agree -> F
  },
  {
    id: 17,
    text: "Saya lebih menghargai argumentasi yang logis, rasional, dan masuk akal dibanding penjelasan yang berbasis simpati atau nilai sentimental.",
    dimension: "TF",
    direction: "positive" // Agree -> T
  },
  {
    id: 18,
    text: "Saya lebih suka dihargai karena kehangatan emosional dan ketulusan hati saya daripada keunggulan intelektual atau analitis.",
    dimension: "TF",
    direction: "negative" // Agree -> F
  },

  // === Judging (J) vs Perceiving (P) ===
  {
    id: 19,
    text: "Saya merasa jauh lebih tenang dan teratur saat memiliki rencana atau jadwal harian yang tersusun dengan rapi.",
    dimension: "JP",
    direction: "positive" // Agree -> J
  },
  {
    id: 20,
    text: "Saya menyukai kebebasan spontan dan lebih suka membiarkan berbagai opsi terbuka hingga menit-menit terakhir.",
    dimension: "JP",
    direction: "negative" // Agree -> P
  },
  {
    id: 21,
    text: "Saya selalu berusaha menyelesaikan tugas-tugas penting jauh sebelum tenggat waktu (deadline) berakhir.",
    dimension: "JP",
    direction: "positive" // Agree -> J
  },
  {
    id: 22,
    text: "Saya merasa bekerja dengan lebih produktif, kreatif, dan fokus ketika berada di bawah tekanan tenggat waktu yang sangat ketat.",
    dimension: "JP",
    direction: "negative" // Agree -> P
  },
  {
    id: 23,
    text: "Kerapian, ketertiban, dan kebersihan di sekitar saya (seperti kamar atau meja kerja) sangat memengaruhi ketenangan pikiran saya.",
    dimension: "JP",
    direction: "positive" // Agree -> J
  },
  {
    id: 24,
    text: "Saya lebih menikmati perjalanan liburan yang spontan tanpa rencana kaku daripada mengikuti jadwal perjalanan (itinerary) yang padat.",
    dimension: "JP",
    direction: "negative" // Agree -> P
  }
];
