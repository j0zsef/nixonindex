export const FACTORS = [
  {
    id: 'f1',
    label: 'F1',
    name: 'Benefit Magnitude',
    weight: 3.0,
    desc: 'Dollar value of the benefit received, log-scaled. A steak dinner and a jumbo jet should not score linearly.',
  },
  {
    id: 'f2',
    label: 'F2',
    name: 'Personal Accrual',
    weight: 2.5,
    desc: 'Degree to which the benefit accrues to the official personally versus the state or public.',
  },
  {
    id: 'f3',
    label: 'F3',
    name: 'Source Conflict',
    weight: 2.0,
    desc: "Extent to which the giver has active interests before the official's government.",
  },
  {
    id: 'f4',
    label: 'F4',
    name: 'Process Integrity',
    weight: 1.5,
    desc: 'Whether required legal and oversight processes were followed, bypassed, or disputed.',
  },
  {
    id: 'f5',
    label: 'F5',
    name: 'Concealment',
    weight: 1.0,
    desc: 'Whether the conduct was hidden, denied, or covered up. The cover-up is often the crime.',
  },
];

export function totalNixons(scores) {
  return Math.round(
    FACTORS.reduce((sum, f) => sum + scores[f.id] * f.weight, 0)
  );
}

export function formulaString(scores) {
  return (
    FACTORS.map((f) => `(${scores[f.id]}\u00d7${f.weight.toFixed(1)})`).join(' + ') +
    ` = ${totalNixons(scores)} NIXONS`
  );
}
