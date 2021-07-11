import mccRanges from './mccRanges.json';

export interface MccRangeData {
  max: number;
  name: string;
  nameEn: string;
  emoji: string;
}

export function findDataInRangesByMcc(code: number): MccRangeData | undefined {
  return mccRanges.find(({ max }) => max >= code);
}
