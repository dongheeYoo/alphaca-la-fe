import { useQuery } from '@tanstack/react-query';
import { Character, CharacterGroupInfo } from '../utils/types';
import api from '../utils/api';

export const useCharacter = (characterName: string) => {
  return useQuery<Character[], Error, Character[]>({
    queryKey: ['characterInfo', characterName],
    queryFn: () => api.getCharacterInfo(characterName),
    select: (d: Character[]) => {
      const sortedCharacterInfoByLv = d.sort((a, b) => {
        const itemMaxLevelA = parseFloat(a.ItemMaxLevel.replace(/,/g, ''));
        const itemMaxLevelB = parseFloat(b.ItemMaxLevel.replace(/,/g, ''));
        return itemMaxLevelB - itemMaxLevelA;
      });
      return sortedCharacterInfoByLv;
    },
    enabled: !!characterName,
  });
};

export const useCharacterGroupInfo = (characterName: string) => {
  return useQuery<CharacterGroupInfo[], Error, CharacterGroupInfo[]>({
    queryKey: ['characterGroupInfo', characterName],
    queryFn: () => api.getCharactersGroupInfo(characterName),
  });
};
