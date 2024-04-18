import { Table } from 'antd';
import { useCharacter, useCharacterGroupInfo } from '../../hooks/useCharacter';
import { Character } from '../../utils/types';
//import { Character } from '../../utils/types';

const columns = [
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
    title: '공격대 현황',
    dataIndex: '',
    key: '',
    render: (_: any, record: Character) => {
      return <CharacterDetailTable characterName={record.CharacterName} />;
    },
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

const CharacterDetailTable = ({ characterName }: { characterName: string }) => {
  const { data: groupInfo } = useCharacterGroupInfo(characterName);
  console.log(groupInfo?.length);
  return groupInfo?.length ? (
    <div>
      {groupInfo.map((d, i) => {
        return (
          <div key={i}>
            {d.groupName}-{d.raid}
            {''}
            {d.difficulty} - {d.done ? '완료' : '미완료'}
          </div>
        );
      })}
    </div>
  ) : (
    <div>포함된 공격대가 없습니다</div>
  );
};
