import { Table, TableColumnsType } from 'antd';
import styled from 'styled-components';
import { CharacterTable } from './CharacterTable';
import { characterTableData } from '../../constants/users';
import { UserDataType } from '../../utils/types';

const columns: TableColumnsType<UserDataType> = [
  {
    title: '유저',
    dataIndex: 'name',
    key: 'name',
  },
];

const Container = styled.div({});

export const CharacterListView = () => {
  //TODO: set Loading Page

  //TODO: set Types
  return (
    <Container>
      <Table
        rowKey={'key'}
        pagination={false}
        expandable={{
          expandedRowRender: (d: UserDataType) => (
            <div>
              <CharacterTable characterName={d.characterName} />
            </div>
          ),
        }}
        columns={columns}
        dataSource={characterTableData}
        scroll={{ x: 800 }}
      />
    </Container>
  );
};
