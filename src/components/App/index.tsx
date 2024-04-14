import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { MainPage } from '../MainPage';
import { Navbar } from '../Navbar';
import { CharacterListView } from '../CharacterListView';
import { GroupsListView } from '../GroupsListView';
import { CalenderView } from '../CalenderView';
import { dark, light } from '../../style/theme';
import { useTheme } from '../../hooks/useTheme';

// const Container = styled.div({
//   width: '100%',
//   height: '100%',
//   backgroundColor:
//   background-color: ${props => props.theme.colors.bgColor};
// });

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.bgColor};
`;

//.css-dev-only-do-not-override-42nv3w).ant-table-wrapper .ant-table

// const BodySection = styled.div((props: any) => ({
//   display: 'flex',
//   position: 'relative',
//   top: '50px',
//   width: '100%',
//   overflow: 'hidden',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   '.ant-table': {
//     backgroundColor: 'black',
//     color: 'white',
//   },
//   '.ant-table-thead>tr>th': {
//     backgroundColor: 'black',
//     color: 'white',
//   },
// }));

const BodySection = styled.div`
  display: flex;
  position: relative;
  top: 50px;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  //flex-direction: column; 중앙정렬?

  .ant-table {
    background-color: ${props => props.theme.colors.tableColor};
    color: ${props => props.theme.colors.fontColor};
  }

  .ant-table-thead > tr > th {
    background-color: ${props => props.theme.colors.tableColor};
    color: ${props => props.theme.colors.fontColor};
  }
`;

function App() {
  const [themeMode, toggleTheme] = useTheme(); // hook 함수 하용
  const theme = themeMode === 'light' ? light : dark; // 테마 환경에 맞는 테마 컬러 가져오기.

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* TODO: Navbar */}
        <Navbar themeMode={themeMode} toggleTheme={toggleTheme} />
        <BodySection>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/characters" element={<CharacterListView />} />
            <Route path="/groups" element={<GroupsListView />} />
            <Route path="/calender" element={<CalenderView />} />
          </Routes>
        </BodySection>
      </Container>
    </ThemeProvider>
  );
}

export default App;
