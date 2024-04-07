import { Button, Modal, Space, Table, TableColumnsType, Tag } from 'antd';
import styled from 'styled-components';
import { groupsMockData } from '../../utils/mock';
import { GroupMemberTable } from './GroupMemberTable';
import { useDialog } from '../../hooks/useDialog';
import { useForm } from 'antd/es/form/Form';
import { GroupItemRegisterForm } from './GroupItemRegisterForm';

interface TableDataType {
  name: string;
  raid: string;
  difficulty: string;
  done: string;
  member: {
    name: string;
    CharacterName: string;
    CharacterClassName: string;
    ItemMaxLevel: number;
  }[];
}

const Container = styled.div({});

export const GroupsListView = () => {
  const { open: openEditDialog, isOpen: isEditOpen, close: closeEditDialog } = useDialog();
  const { open: openAddDialog, isOpen: isAddOpen, close: closeAddDialog } = useDialog();
  const [addForm] = useForm();
  const [editForm] = useForm();

  const handleActionClick = (data: TableDataType, callback: any) => {
    // TODO: use jobDetail data instead of not directly use query data
    // const jobItem: any = queryClient.getQueryData(['jobDetail', data.id]);
    // setTargetJob(data);
    editForm.setFieldsValue(data);
    callback?.();
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
  };
  const onAddGroup = () => {
    // const data: JobItem = addForm.getFieldsValue();
    // if (!user) return;
    // const companyId = user.companyId;
    // const job: Partial<JobItem> = { ...data };
    // postJob(
    //   { companyId, job },
    //   {
    //     onSuccess: () => {
    //       invalidateCompanyJobsList();
    //       addForm.resetFields();
    //       closeAddDialog();
    //     },
    //   }
    // );
    const data = addForm.getFieldsValue();
    console.log(data);
  };
  const columns: TableColumnsType<TableDataType> = [
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
        const color = done === '완료' ? 'blue' : 'red';
        return (
          <Tag color={color} key={done}>
            {done}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: '',
      render: (_, data: TableDataType) => {
        return (
          <Space size="middle">
            <Button size="small" onClick={() => handleActionClick(data, openEditDialog)}>
              수정
            </Button>
            {/* TODO: 완료처리 누르면 Modal 띄우고, 확인 누르면 완료처리. 그리고 완료 철회 버튼도 만들어야될듯..? 잘못
                누를수있으니까 */}
            <Button size="small" onClick={() => console.log('완료처리', data)}>
              완료처리
            </Button>
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
      <Button onClick={openAddDialog}>공격대 생성</Button>
      <Table
        rowKey={'key'}
        columns={columns}
        dataSource={groupsMockData}
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
            <Button htmlType="submit" key="submit" type="primary" onClick={onEditGroup}>
              수정
            </Button>,
          ]}>
          <GroupItemRegisterForm form={editForm} onSubmit={onEditGroup} />
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
        </Modal>
      )}
    </Container>
  );
};
