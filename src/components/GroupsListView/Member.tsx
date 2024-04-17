import { Button, List } from 'antd';
import styled from 'styled-components';
import { useCharacter } from '../../hooks/useCharacter';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { characterTableData } from '../../constants/users';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
const ListSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
});
const MemberSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

interface MemberDataType {
  name: string;
  CharacterName: string;
  CharacterClassName: string;
  ItemMaxLevel: number;
}

//const characterNames = ['히도뉴', 'RAFF', '알망고얌', '아키나츠리', '수라로로'];
//const characterNames = characterTableData.map(d => d.characterName);

export const Member = ({ member, setMember }: { member: any; setMember: any }) => {
  const [targetData, setTargetData] = useState<string>('');

  const handleAction = (targetName: string) => {
    setTargetData(targetName);
  };

  const editMemberItems = (d: MemberDataType) => {
    setMember(member.filter((member: MemberDataType) => member.CharacterName !== d.CharacterName));
  };

  return (
    <Container>
      <ListSection>
        <List
          size="small"
          header={<div>이름</div>}
          bordered
          dataSource={characterTableData.map(d => d.characterName)}
          renderItem={item => (
            <List.Item>
              <Button style={{ border: 'none' }} onClick={() => handleAction(item)}>
                {characterTableData.find(d => d.characterName === item)?.name}
              </Button>
            </List.Item>
          )}
        />
        <MemberDetails characterName={targetData} setMember={setMember} />
      </ListSection>
      <MemberSection>
        {member?.map((d: any, i: any) => (
          <Button style={{ border: 'none' }} key={i} onClick={() => editMemberItems(d)}>
            {d.CharacterName}
            <CloseOutlined />
          </Button>
        ))}
      </MemberSection>
    </Container>
  );
};

const MemberDetails = ({ characterName, setMember }: { characterName: string; setMember: any }) => {
  const { data } = useCharacter(characterName);

  const handleAction = (item: any) => {
    setMember((prev: any) => [
      ...prev,
      {
        name: characterName,
        CharacterName: item.CharacterName,
        CharacterClassName: item.CharacterClassName,
        ItemMaxLevel: parseInt(item.ItemMaxLevel.replace(/,/g, '')),
      },
    ]);
  };

  return (
    <List
      size="small"
      header={<div>캐릭터</div>}
      bordered
      dataSource={data?.slice(0, 6)}
      renderItem={item => (
        <List.Item>
          <Button style={{ border: 'none' }} onClick={() => handleAction(item)}>
            {item.CharacterName}
          </Button>
        </List.Item>
      )}
    />
  );
};
