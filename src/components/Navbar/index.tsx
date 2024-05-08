import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/alphaca-mango.png';
import classnames from 'classnames';
import { Switch } from 'antd';
import { MoonFilled, SunFilled } from '@ant-design/icons';

const tabs = [
  {
    key: 'characters',
    value: 'characters',
    name: '원정대 캐릭',
  },
  {
    key: 'groups',
    value: 'groups',
    name: '공격대 관리',
  },
  {
    key: 'calender',
    value: 'calender',
    name: '스케쥴 관리',
  },
];

const NavHeader = styled.header({
  width: '100%',
  height: '30px',
});
const Container = styled.div({
  display: 'flex',
  width: '100%',
  color: 'white',
  backgroundColor: '#312f2f',
  justifyContent: 'space-between',
  height: '50px',
  lineHeight: '50px',
  position: 'sticky',
  alignContent: 'center',
  alignItems: 'center',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 200,
  padding: '11px 25px',
});
const LogoSection = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  width: '100px',
  marginTop: '20px',
});
const MenuSection = styled.div({
  display: 'flex',
  flex: 14,
  gap: '20px',
  padding: '0 10px',
  '>a': {
    color: 'white',
    textDecoration: 'none',
  },
});

const DarkModeSection = styled.div({
  display: 'flex',
  flex: 1,
});

const SubMenuSection = styled.div`
  &:hover {
    box-shadow: inset 0 -2px #ddd;
  }

  &.--active {
    box-shadow: inset 0 -2px #dddr;
    -webkit-box-shadow: inset 0 -2px #ddd;
  }
`;

export const Navbar = ({ themeMode, toggleTheme }: { themeMode: any; toggleTheme: any }) => {
  const location = useLocation();

  const [activeTabIndex, setActiveTabIndex] = useState<number>(-1);

  useEffect(() => {
    const index = tabs.findIndex(d => d.value && location.pathname.includes(d.value));
    setActiveTabIndex(location.pathname === '/' ? -1 : index);
  }, [location]);

  return (
    <NavHeader>
      <Container>
        <LogoSection>
          <Link to={'/'}>
            <img src={logo} style={{ width: 60, height: 60 }} />
          </Link>
        </LogoSection>
        <MenuSection>
          {tabs.map((d, i) => (
            <Link key={d.key} to={d.value} onClick={() => setActiveTabIndex(i)}>
              <SubMenuSection className={classnames({ '--active': activeTabIndex === i })}>
                {d.name}
              </SubMenuSection>
            </Link>
          ))}
        </MenuSection>
        <DarkModeSection>
          {/* <Button onClick={toggleTheme}>
            {themeMode === 'light' ? '일반모드로 테마 변경하기' : '다크모드로 테마 변경하기'}
          </Button> */}
          <Switch
            checkedChildren={<MoonFilled />}
            unCheckedChildren={<SunFilled />}
            defaultChecked={themeMode === 'dark' ? true : false}
            onChange={toggleTheme}
          />
        </DarkModeSection>
      </Container>
    </NavHeader>
  );
};
