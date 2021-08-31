import { MccVisuals } from './findVisualsByMcc';
import mccCategories from './mccCategories.json';
import mccCategoryEmoji from './mccCategoryEmoji.json';

export const FALLBACK_EMOJI = '💸';

export function findVisualsByMccV2(mcc: number): MccVisuals {
  const category = mccCategories.find(({ mcc: mccsList }) =>
    mccsList.includes(mcc)
  );

  if (!category) {
    return {
      label: 'Інше',
      emoji: FALLBACK_EMOJI
    };
  }

  return {
    label: category.name,
    emoji:
      mccCategoryEmoji[category.name as keyof typeof mccCategoryEmoji] ??
      FALLBACK_EMOJI
  };
}
