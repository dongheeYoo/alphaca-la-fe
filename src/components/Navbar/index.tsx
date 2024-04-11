import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
  width: '100px',
});
const MenuSection = styled.div({
  display: 'flex',
  gap: '20px',
  padding: '0 10px',
  '>a': {
    color: 'white',
    textDecoration: 'none',
  },
});

export const Navbar = () => {
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  useEffect(() => {
    const index = tabs.findIndex(d => d.value && location.pathname.includes(d.value));
    setActiveTabIndex(location.pathname === '/' ? 0 : index);
  }, [location]);

  return (
    <NavHeader>
      <Container>
        <LogoSection>LOGO</LogoSection>
        <MenuSection>
          {tabs.map((d, i) => (
            <Link key={d.key} to={d.value} onClick={() => setActiveTabIndex(i)}>
              {d.name}
            </Link>
          ))}
        </MenuSection>
      </Container>
    </NavHeader>
  );
};
