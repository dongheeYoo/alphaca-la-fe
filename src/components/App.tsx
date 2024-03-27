import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { MainPage } from './MainPage';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
});
const BodySection = styled.div({
  display: 'flex`',
  position: 'relative',
  width: '100%',
});

function App() {
  return (
    <Container>
      {/* TODO: Navbar */}
      aaaa
      <BodySection>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BodySection>
    </Container>
  );
}

export default App;
