import { Table, TableColumnsType } from 'antd';
import styled from 'styled-components';
import { CharacterTable } from './CharacterTable';

interface DataType {
  key: number;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '유저',
    dataIndex: 'name',
    key: 'name',
  },
];
const tableData: DataType[] = [
  {
    key: 1,
    name: '히도뉴',
  },
  {
    key: 2,
    name: 'RAFF',
  },
  {
    key: 3,
    name: '알망고얌',
  },
  {
    key: 4,
    name: '아키나츠리',
  },
  {
    key: 5,
    name: '수라로로',
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
          expandedRowRender: (d: DataType) => (
            <div>
              <CharacterTable characterName={d.name} />
            </div>
          ),
        }}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 800 }}
      />
    </Container>
  );
};
