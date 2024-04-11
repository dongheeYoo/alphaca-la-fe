import { useQuery } from '@tanstack/react-query';
import { Character } from '../utils/types';
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
