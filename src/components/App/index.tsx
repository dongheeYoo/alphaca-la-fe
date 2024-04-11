import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { MainPage } from '../MainPage';
import { Navbar } from '../Navbar';
import { CharacterListView } from '../CharacterListView';
import { GroupsListView } from '../GroupsListView';
import { CalenderView } from '../CalenderView';

const Container = styled.div({
  width: '100%',
  height: '100%',
});
const BodySection = styled.div({
  display: 'flex',
  position: 'relative',
  top: '50px',
  width: '100%',
  overflow: 'hidden',
  justifyContent: 'center',
});

function App() {
  return (
    <Container>
      {/* TODO: Navbar */}
      <Navbar />
      <BodySection>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/characters" element={<CharacterListView />} />
          <Route path="/groups" element={<GroupsListView />} />
          <Route path="/calender" element={<CalenderView />} />
        </Routes>
      </BodySection>
    </Container>
  );
}

export default App;
