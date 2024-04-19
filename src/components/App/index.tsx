import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { MainPage } from '../MainPage';
import { Navbar } from '../Navbar';
import { CharacterListView } from '../CharacterListView';
import { GroupsListView } from '../GroupsListView';
import { CalenderView } from '../CalenderView';
import { dark, light } from '../../style/theme';
import { useTheme } from '../../hooks/useTheme';

const Container = styled.div`
  width: 100%;
  height: 250vh;
  background-color: ${props => props.theme.colors.bgColor};
`;

//.css-dev-only-do-not-override-42nv3w).ant-table-wrapper .ant-table

const BodySection = styled.div`
  display: flex;
  position: relative;
  top: 50px;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  //flex-direction: column; 중앙정렬?

  .addGroupBtn,
  .resetDoneBtn {
    background-color: ${props => props.theme.colors.btnBgColor};
    color: ${props => props.theme.colors.btnFontColor};
    border: none;
  }

  //table 전체 css
  .ant-table {
    background-color: ${props => props.theme.colors.tableColor};
    color: ${props => props.theme.colors.fontColor};

    //table row hover시 css
    .ant-table-row-level-0:hover > td {
      background-color: ${props => props.theme.colors.hoverBgColor};
      color: ${props => props.theme.colors.hoverFontColor};
    }

    //table action button
    .ant-table-row-level-0 .ant-table-cell button {
      background-color: ${props => props.theme.colors.btnBgColor};
      color: ${props => props.theme.colors.btnFontColor};
    }

    //table action button : disabled
    .ant-table-row-level-0 .ant-table-cell button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .ant-table-thead > tr > th {
    background-color: ${props => props.theme.colors.tableColor};
    color: ${props => props.theme.colors.fontColor};
  }

  //table + icon css
  .ant-table-row-expand-icon {
    background-color: ${props => props.theme.colors.expandIconBgColor};
    color: ${props => props.theme.colors.expandIconFontColor};
  }

  //calendar
  .ant-picker-body,
  .ant-picker-calendar {
    background-color: ${props => props.theme.colors.bgColor};
    color: white;
  }
  .ant-picker-calendar-date-value,
  .ant-picker-content > thead > tr > th {
    color: ${props => props.theme.colors.calendarColor};
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
