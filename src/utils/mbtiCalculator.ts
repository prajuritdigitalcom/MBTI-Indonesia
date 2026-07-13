import { questions } from '../data/questions';

export interface CalculatedScores {
  mbtiType: string;
  EI: { E: number; I: number; ePercent: number; iPercent: number; dominant: 'E' | 'I'; percent: number };
  SN: { S: number; N: number; sPercent: number; nPercent: number; dominant: 'S' | 'N'; percent: number };
  TF: { T: number; F: number; tPercent: number; fPercent: number; dominant: 'T' | 'F'; percent: number };
  JP: { J: number; P: number; jPercent: number; pPercent: number; dominant: 'J' | 'P'; percent: number };
}

export function calculateMBTI(answers: Record<number, number>): CalculatedScores {
  let E_points = 0;
  let I_points = 0;
  let S_points = 0;
  let N_points = 0;
  let T_points = 0;
  let F_points = 0;
  let J_points = 0;
  let P_points = 0;

  questions.forEach((q) => {
    const choice = answers[q.id] || 3; // default to Netral (3) if not answered

    let firstPolePoints = 0; // E, S, T, J
    let secondPolePoints = 0; // I, N, F, P

    if (choice === 5) {
      firstPolePoints = 2;
    } else if (choice === 4) {
      firstPolePoints = 1;
    } else if (choice === 3) {
      firstPolePoints = 0;
      secondPolePoints = 0;
    } else if (choice === 2) {
      secondPolePoints = 1;
    } else if (choice === 1) {
      secondPolePoints = 2;
    }

    const isPositive = q.direction === 'positive';
    const pointsForFirst = isPositive ? firstPolePoints : secondPolePoints;
    const pointsForSecond = isPositive ? secondPolePoints : firstPolePoints;

    switch (q.dimension) {
      case 'EI':
        E_points += pointsForFirst;
        I_points += pointsForSecond;
        break;
      case 'SN':
        S_points += pointsForFirst;
        N_points += pointsForSecond;
        break;
      case 'TF':
        T_points += pointsForFirst;
        F_points += pointsForSecond;
        break;
      case 'JP':
        J_points += pointsForFirst;
        P_points += pointsForSecond;
        break;
    }
  });

  // Calculate percentages safely (avoiding division by zero)
  const calcDimension = (first: number, second: number, labelFirst: string, labelSecond: string) => {
    const total = first + second;
    if (total === 0) {
      return {
        firstPct: 50,
        secondPct: 50,
        dominant: labelFirst as any,
        percent: 50
      };
    }
    const firstPct = Math.round((first / total) * 100);
    const secondPct = 100 - firstPct;
    const dominant = first >= second ? labelFirst : labelSecond;
    const percent = first >= second ? firstPct : secondPct;

    return {
      firstPct,
      secondPct,
      dominant,
      percent
    };
  };

  const eiRes = calcDimension(E_points, I_points, 'E', 'I');
  const snRes = calcDimension(S_points, N_points, 'S', 'N');
  const tfRes = calcDimension(T_points, F_points, 'T', 'F');
  const jpRes = calcDimension(J_points, P_points, 'J', 'P');

  const mbtiType = `${eiRes.dominant}${snRes.dominant}${tfRes.dominant}${jpRes.dominant}`;

  return {
    mbtiType,
    EI: {
      E: E_points,
      I: I_points,
      ePercent: eiRes.firstPct,
      iPercent: eiRes.secondPct,
      dominant: eiRes.dominant as 'E' | 'I',
      percent: eiRes.percent
    },
    SN: {
      S: S_points,
      N: N_points,
      sPercent: snRes.firstPct,
      nPercent: snRes.secondPct,
      dominant: snRes.dominant as 'S' | 'N',
      percent: snRes.percent
    },
    TF: {
      T: T_points,
      F: F_points,
      tPercent: tfRes.firstPct,
      fPercent: tfRes.secondPct,
      dominant: tfRes.dominant as 'T' | 'F',
      percent: tfRes.percent
    },
    JP: {
      J: J_points,
      P: P_points,
      jPercent: jpRes.firstPct,
      pPercent: jpRes.secondPct,
      dominant: jpRes.dominant as 'J' | 'P',
      percent: jpRes.percent
    }
  };
}
