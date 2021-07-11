import mccGroups from './mccGroups.json';

export interface MccGroupData {
  emoji: string;
  mccs: number[];
  name: string;
  image: { name: string };
}

export function findDataInGroupsByMcc(code: number): MccGroupData | undefined {
  return Object.values(mccGroups).find(({ mccs }) => mccs.includes(code));
}
