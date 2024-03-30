import { useQueries, useQuery } from '@tanstack/react-query';
import { Character } from '../utils/types';
import api from '../utils/api';

export const useCharacter = (characterName: string | undefined) => {
  return useQuery<Character[], Error, Character[]>({
    queryKey: ['characterInfo'],
    queryFn: () => api.getCharacterInfo(characterName),
    select: (d: Character[]) => {
      const sortedCharacterInfoByLv = d.sort((a, b) =>
        b.ItemMaxLevel.localeCompare(a.ItemMaxLevel)
      );
      return sortedCharacterInfoByLv.slice(0, 6);
    },
  });
};

export const useCharacters = (characterNames: string[]) => {
  return useQueries({
    queries: characterNames.map((characterName: string) => ({
      queryKey: ['characterInfo', characterName],
      queryFn: () => api.getCharacterInfo(characterName),
      select: (d: Character[]) => {
        // const sortedCharacterInfoByLv = d.sort(
        //   (a, b) => parseInt(b.ItemMaxLevel) - parseInt(a.ItemMaxLevel)
        // );
        const sortedCharacterInfoByLv = d.sort((a, b) => {
          const itemMaxLevelA = parseFloat(a.ItemMaxLevel.replace(/,/g, ''));
          const itemMaxLevelB = parseFloat(b.ItemMaxLevel.replace(/,/g, ''));
          return itemMaxLevelB - itemMaxLevelA;
        });
        return sortedCharacterInfoByLv.slice(0, 6);
      },
    })),
  });
};
