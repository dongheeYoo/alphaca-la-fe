import { Table, TableColumnsType } from 'antd';
import { useCharacter } from '../../hooks/useCharacter';
import { Character } from '../../utils/types';

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
];

export const CharacterTable = ({ characterName }: { characterName: string }) => {
  const { data } = useCharacter(characterName);
  return (
    <Table
      rowKey={'key'}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 7,
      }}
    />
  );
};
