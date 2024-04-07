import { Table, TableColumnsType } from 'antd';
import styled from 'styled-components';

interface TableDataType {
  name: string;
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
  return (
    <Container>
      <Table key={'name'} columns={columns} dataSource={member} pagination={false} />
    </Container>
  );
};
