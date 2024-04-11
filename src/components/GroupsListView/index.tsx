import { Button, Modal, Popconfirm, Space, Table, TableColumnsType, Tag } from 'antd';
import styled from 'styled-components';
import { GroupMemberTable } from './GroupMemberTable';
import { useDialog } from '../../hooks/useDialog';
import { useForm } from 'antd/es/form/Form';
import { GroupItemRegisterForm } from './GroupItemRegisterForm';
import { useState } from 'react';
import { Member } from './Member';
import { useAddGroup, useGroup } from '../../hooks/useGroup';
import { Group, MemberDataType } from '../../utils/types';

// interface TableDataType {
//   name: string;
//   raid: string;
//   difficulty: string;
//   done: boolean;
//   member: MemberTableDataType[];
// }

// interface MemberTableDataType {
//   member: {
//     name: string;
//     CharacterName: string;
//     CharacterClassName: string;
//     ItemMaxLevel: number;
//   };
// }

const Container = styled.div({});

const MemberTableSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  '>Button': {
    width: '70px',
  },
});

export const GroupsListView = () => {
  const [member, setMember] = useState<MemberDataType[]>([
    {
      // member: {
      //   name: '',
      //   CharacterName: '',
      //   CharacterClassName: '',
      //   ItemMaxLevel: 0,
      // },
      name: '',
      CharacterName: '',
      CharacterClassName: '',
      ItemMaxLevel: 0,
    },
  ]);
  const { open: openEditDialog, isOpen: isEditOpen, close: closeEditDialog } = useDialog();
  const { open: openAddDialog, isOpen: isAddOpen, close: closeAddDialog } = useDialog();
  const { open: openMemberDialog, isOpen: isMemberOpen, close: closeMemberDialog } = useDialog();
  const [addForm] = useForm();
  const [editForm] = useForm();

  const { data } = useGroup();
  const { mutate: addGroup } = useAddGroup();

  const handleActionClick = (data: Group, callback: any) => {
    editForm.setFieldsValue(data);
    setMember(data.member);
    callback?.();
  };

  const handleAddGroupAction = () => {
    setMember([]);
    openAddDialog();
  };

  const onEditGroup = () => {
    // const data: JobItem = editForm.getFieldsValue();
    // if (!targetJob) return;
    // if (!user) return;
    // const job: Partial<JobItem> = { ...data, id: targetJob.id };
    // updateJob(
    //   { job },
    //   {
    //     onSuccess: () => {
    //       invalidateCompanyJobDetail();
    //       invalidateCompanyJobsList();
    //     },
    //     onSettled: () => closeEditDialog(),
    //   }
    // );
    alert('수정');
    const data = editForm.getFieldsValue();
    console.log('edited data from Form: ', data);
    console.log('edited Member data: ', member);
    closeEditDialog();
  };
  const onAddGroup = () => {
    const data: Group = {
      ...addForm.getFieldsValue(),
      done: false,
      member: member,
    };

    addGroup(
      { data },
      {
        onSuccess: () => {
          console.log('succeed');
        },
      }
    );
    closeAddDialog();
  };

  const onDeleteGroup = () => {
    console.log('deleted');
    closeEditDialog();
  };

  const columns: TableColumnsType<Group> = [
    {
      title: '공대명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '레이드',
      dataIndex: 'raid',
      key: 'raid',
      render: (_, { raid }) => {
        let color = 'grey';
        switch (raid) {
          case '카양겔':
            color = 'yellow';
            break;
          case '일리아칸':
            color = 'green';
            break;
          case '카멘':
            color = 'blue';
            break;
          case '상아탑':
            color = 'red';
            break;
          default:
            break;
        }
        return (
          <Tag color={color} key={raid}>
            {raid}
          </Tag>
        );
      },
    },
    {
      title: '난이도',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (_, { difficulty }) => {
        const color = difficulty === '노말' ? 'yellow' : 'red';
        return (
          <Tag color={color} key={difficulty}>
            {difficulty}
          </Tag>
        );
      },
    },
    {
      title: '완료여부',
      dataIndex: 'done',
      key: 'done',
      render: (_, { done }) => {
        const color = done ? 'blue' : 'red';
        return <Tag color={color}>{done ? '완료' : '미완료'}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: '',
      render: (_, data: Group) => {
        return (
          <Space size="middle">
            <Button size="small" onClick={() => handleActionClick(data, openEditDialog)}>
              수정
            </Button>
            {/* TODO: 완료처리 누르면 Modal 띄우고, 확인 누르면 완료처리. 그리고 완료 철회 버튼도 만들어야될듯..? 잘못
                누를수있으니까 */}
            <Popconfirm
              title="완료처리"
              description="완료처리 하시겠습니까?"
              onConfirm={() => console.log('confirm')}
              onCancel={() => console.log('cancel')}
              okText="완료"
              cancelText="취소">
              <Button size="small" onClick={() => console.log('완료처리', data)}>
                완료처리
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Container>
      {/* TODO: reset 버튼 만들기 - 수요일에만 활성화..? */}
      <Button onClick={() => console.log('리셋!')}>수요일이다</Button>
      {/* 공격대 생성 버튼 */}
      <Button onClick={() => handleAddGroupAction()}>공격대 생성</Button>
      <Table
        rowKey={'name'}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 800 }}
        expandable={{
          expandedRowRender: d => (
            <div>
              <GroupMemberTable member={d.member} />
            </div>
          ),
        }}
      />
      {isEditOpen && (
        <Modal
          centered
          title="공격대 수정하기"
          open={isEditOpen}
          onOk={closeEditDialog}
          onCancel={closeEditDialog}
          footer={[
            <Button key="back" onClick={closeEditDialog}>
              취소
            </Button>,
            <Button danger key="delete" type="primary" onClick={onDeleteGroup}>
              삭제
            </Button>,
            <Button htmlType="submit" key="submit" type="primary" onClick={onEditGroup}>
              수정
            </Button>,
          ]}>
          <GroupItemRegisterForm form={editForm} onSubmit={onEditGroup} />
          <MemberTableSection>
            <label>멤버</label>
            <Button onClick={openMemberDialog}>수정</Button>
            <GroupMemberTable member={member} />
          </MemberTableSection>
        </Modal>
      )}
      {isAddOpen && (
        <Modal
          centered
          title="공격대 생성하기"
          open={isAddOpen}
          onOk={closeAddDialog}
          onCancel={closeAddDialog}
          footer={[
            <Button key="back" onClick={closeAddDialog}>
              취소
            </Button>,
            <Button htmlType="submit" key="submit" type="primary" onClick={onAddGroup}>
              생성
            </Button>,
          ]}>
          <GroupItemRegisterForm form={addForm} onSubmit={onAddGroup} />
          <MemberTableSection>
            <label>멤버</label>
            <Button onClick={openMemberDialog}>추가</Button>
            <GroupMemberTable member={member} />
          </MemberTableSection>
        </Modal>
      )}
      {isMemberOpen && (
        <Modal
          centered
          title="멤버 수정하기"
          open={isMemberOpen}
          onOk={closeMemberDialog}
          onCancel={closeMemberDialog}
          footer={[
            <Button key="back" onClick={closeMemberDialog}>
              취소
            </Button>,
            <Button htmlType="submit" key="submit" type="primary" onClick={closeMemberDialog}>
              수정
            </Button>,
          ]}>
          <Member member={member} setMember={setMember} />
        </Modal>
      )}
    </Container>
  );
};
