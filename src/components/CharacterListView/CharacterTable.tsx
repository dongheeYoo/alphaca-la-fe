import { Table, TableColumnsType } from 'antd';
import { useCharacter } from '../../hooks/useCharacter';
import { Character } from '../../utils/types';
import { Raids } from '../../utils/raids';

const columns: TableColumnsType<Character> = [
  {
    title: '캐릭명',
    dataIndex: 'CharacterName',
    key: 'CharacterName',
  },
  {
    title: '레벨',
    dataIndex: 'ItemMaxLevel',
    key: 'ItemMaxLevel',
  },
  {
    title: '직업',
    dataIndex: 'CharacterClassName',
    key: 'CharacterClassName',
  },
  {
    title: '레이드',
    dataIndex: 'raid',
    key: 'raid',
  },
];

export const CharacterTable = ({ characterName }: { characterName: string }) => {
  const { data } = useCharacter(characterName);
  return (
    <Table
      rowKey={'key'}
      columns={columns}
      dataSource={data?.map((d: Character) => ({
        ...d,
        raid: Raids.filter(raid => {
          return raid.difficulties.some(
            difficulty => difficulty.lvLimits < parseInt(d.ItemMaxLevel.replace(/,/g, ''))
          );
        }),
        // .sort((a, b) => {
        //   return b.difficulties[0].lvLimits - a.difficulties[0].lvLimits;
        // })
        // .slice(0, 3)
        // .map(d => {
        //   return d.name + d.difficulties[0].difficulty;
        // }),
      }))}
      pagination={{
        pageSize: 7,
        //hideOnSinglePage: true,
      }}
    />
  );
};
