import { Button, Modal, Popconfirm, Space, Table, TableColumnsType, Tag } from 'antd';
import styled from 'styled-components';
import { GroupMemberTable } from './GroupMemberTable';
import { useDialog } from '../../hooks/useDialog';
import { useForm } from 'antd/es/form/Form';
import { GroupItemRegisterForm } from './GroupItemRegisterForm';
import { useState } from 'react';
import { Member } from './Member';
import {
  useAddGroup,
  useDeleteGroup,
  useGroup,
  useInvalidateGroups,
  useResetDoneGroup,
  useUpdateGroup,
} from '../../hooks/useGroup';
import { Group, MemberDataType } from '../../utils/types';

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
  const { mutate: updateGroup } = useUpdateGroup();
  const { mutate: deleteGroup } = useDeleteGroup();
  const { mutate: resetGroup } = useResetDoneGroup();
  const invalidateGroups = useInvalidateGroups();

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
    const data: Group = {
      ...editForm.getFieldsValue(),
      member: member,
    };

    updateGroup(
      { data },
      {
        onSuccess: () => {
          invalidateGroups();
          closeEditDialog();
        },
        onError: (err: Error) => {
          alert('공격대 수정에 문제가 발생했습니다.');
          console.log(err);
        },
      }
    );
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
          invalidateGroups();
          closeAddDialog();
        },
        onError: (err: Error) => {
          alert('공격대 추가에 문제가 발생했습니다.');
          console.log(err);
        },
        onSettled: () => {
          addForm.resetFields();
        },
      }
    );
  };

  const onDeleteGroup = () => {
    const id = editForm.getFieldValue('_id');

    deleteGroup(id, {
      onSuccess: () => {
        invalidateGroups();
        closeEditDialog();
      },
      onError: (err: Error) => {
        alert('공격대 삭제에 문제가 발생했습니다.');
        console.log(err);
      },
    });
  };

  const onDoneGroup = (d: Group) => {
    const data: Group = {
      ...d,
      done: true,
    };

    updateGroup(
      { data },
      {
        onSuccess: () => {
          invalidateGroups();
          closeEditDialog();
        },
        onError: (err: Error) => {
          alert('공격대 수정에 문제가 발생했습니다.');
          console.log(err);
        },
      }
    );
  };

  const onResetGroup = () => {
    resetGroup(undefined, {
      onSuccess: invalidateGroups,
    });
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
          case '에키드나':
            color = 'pink';
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
              disabled={data.done}
              onConfirm={() => onDoneGroup(data)}
              //onCancel={() => console.log('cancel')}
              okText="완료"
              cancelText="취소">
              <Button size="small" disabled={data.done}>
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
      <Popconfirm
        title="리셋"
        description="리셋처리 하시겠습니까?"
        onConfirm={onResetGroup}
        okText="리셋"
        cancelText="취소">
        <Button className={'resetDoneBtn'}>수요일이다</Button>
      </Popconfirm>
      <Button className={'addGroupBtn'} onClick={() => handleAddGroupAction()}>
        공격대 생성
      </Button>
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
