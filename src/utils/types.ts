export type UserDataType = {
  key: number;
  name: string;
  characterName: string;
};

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

export type Group = {
  _id: string;
  name: string;
  raid: string;
  difficulty: string;
  done: boolean;
  member: MemberDataType[];
};

export type MemberDataType = {
  name: string;
  CharacterName: string;
  CharacterClassName: string;
  ItemMaxLevel: number;
};
