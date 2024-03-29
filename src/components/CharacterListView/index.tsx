import { Card } from 'antd';
import styled from 'styled-components';

const tabs = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const Container = styled.div({});

export const CharacterListView = () => {
  return (
    <Container>
      <Card>카드</Card>
    </Container>
  );
};
