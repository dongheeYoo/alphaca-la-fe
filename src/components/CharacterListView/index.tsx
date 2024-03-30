import { Table } from 'antd';
import styled from 'styled-components';
import { useCharacters } from '../../hooks/useCharacter';
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
];

const Container = styled.div({});

const characterNames = ['희도뉴', 'RAFF', '알망고얌', '아키나츠리'];

export const CharacterListView = () => {
  const result = useCharacters(characterNames);
  console.log(result);

  //TODO: set Loading Page

  //TODO: set Types
  return (
    <Container>
      {result.map((d: any) => (
        <Table columns={columns} dataSource={d.data} />
      ))}
    </Container>
  );
};
