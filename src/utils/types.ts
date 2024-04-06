export type Character = {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
};

export type Raid = {
  name: string;
  difficulties: RaidDifficulties[];
};

export type RaidDifficulties = {
  lvLimits: number;
  difficulty: string;
};
