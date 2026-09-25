export interface ComboTier {
  minCombo: number;
  multiplier: number;
  label: string;
  color: string;
}

export const COMBO_WINDOW_MS = 700;
export const MILESTONE_STEP = 100;

const comboTiers: ComboTier[] = [
  { minCombo: 100, multiplier: 10, label: "LENDÁRIO!!!", color: "#ff003c" },
  { minCombo: 50, multiplier: 5, label: "INSANO!!", color: "#faff00" },
  { minCombo: 25, multiplier: 3, label: "GREAT!", color: "#ff2bd6" },
  { minCombo: 10, multiplier: 2, label: "NICE!", color: "#00f0ff" },
  { minCombo: 0, multiplier: 1, label: "", color: "#c9b6ff" },
];

export function getComboTier(combo: number) {
  return comboTiers.find((tier) => combo >= tier.minCombo) ?? comboTiers[comboTiers.length - 1];
}
