import { Table, TableColumnsType } from 'antd';
import styled from 'styled-components';
import { characterTableData } from '../../constants/users';

interface TableDataType {
  name: string | undefined;
  CharacterName: string;
  CharacterClassName: string;
  ItemMaxLevel: number;
}

const Container = styled.div({});

const columns: TableColumnsType<TableDataType> = [
  {
    title: '맴버',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '캐릭터',
    dataIndex: 'CharacterName',
    key: 'CharacterName',
  },
  {
    title: '캐릭터 레벨',
    dataIndex: 'ItemMaxLevel',
    key: 'ItemMaxLevel',
  },
  {
    title: '직업',
    dataIndex: 'CharacterClassName',
    key: 'CharacterClassName',
  },
];

export const GroupMemberTable = ({ member }: { member: TableDataType[] }) => {
  const modifiedMember = member.map(d => {
    const name = d.name;
    return {
      ...d,
      name: characterTableData.find(d => d.characterName === name)?.name,
    };
  });
  return (
    <Container>
      <Table rowKey={'name'} columns={columns} dataSource={modifiedMember} pagination={false} />
    </Container>
  );
};
