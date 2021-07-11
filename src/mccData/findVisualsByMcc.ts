import { findDataInGroupsByMcc } from './findDataInGroupsByMcc';
import { findDataInRangesByMcc } from './findDataInRangesByMcc';

export interface MccVisuals {
  label: string;
  emoji: string;
}

export function findVisualsByMcc(code: number): MccVisuals {
  const group = findDataInGroupsByMcc(code);

  if (group) {
    return {
      label: group.name,
      emoji: group.emoji
    };
  }

  const range = findDataInRangesByMcc(code);

  if (range) {
    return {
      label: range.name,
      emoji: range.emoji
    };
  }

  return {
    label: 'Неизвестный',
    emoji: '❓'
  };
}
