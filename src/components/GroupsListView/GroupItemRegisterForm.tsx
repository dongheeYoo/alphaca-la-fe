import { Input, Form, Select, Tag, Button, Modal } from 'antd';
import { Raids } from '../../utils/raids';
import { Raid } from '../../utils/types';
import { GroupMemberTable } from './GroupMemberTable';
import { Member } from './Member';
import { CloseOutlined } from '@ant-design/icons';
import { useDialog } from '../../hooks/useDialog';
import { useState } from 'react';

export const GroupItemRegisterForm = ({
  form,
  initialValues,
  member,
  onSubmit,
}: {
  form: any;
  initialValues?: any;
  member: any;
  onSubmit?: ((values: any) => void) | undefined;
}) => {
  const { open, isOpen, close } = useDialog();
  const [memberItems, setMemberItems] = useState(member);
  const raidNameOptions = Raids.map((d: Raid, i: number) => ({
    value: i ? d.name : '',
    label: d.name,
  }));
  const raidDifficultyOptions = ['노말', '하드'].map((d, i) => ({
    value: i ? d : '',
    label: d,
  }));
  const onFinishFailed = (errorInfo: any) => {
    console.log('Form Failed:', errorInfo);
  };
  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout={'vertical'}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}>
      <Form.Item name="name" label="공대명">
        <Input size="large" placeholder="공대명" />
      </Form.Item>
      <Form.Item name="raid" label="레이드">
        <Select
          //defaultValue={academyTypeFilterItems[0]}
          style={{ width: 120 }}
          //onChange={handleTypeChange}
          options={raidNameOptions}
          size={'large'}
        />
      </Form.Item>
      <Form.Item name="difficulty" label="난이도">
        <Select
          //defaultValue={academyTypeFilterItems[0]}
          style={{ width: 120 }}
          //onChange={handleTypeChange}
          options={raidDifficultyOptions}
          size={'large'}
        />
      </Form.Item>
      <Form.Item name="member" label="맴버">
        {/*Replace GroupMemberTable with Selector */}
        <Button onClick={open}>수정</Button>
        <GroupMemberTable member={memberItems} />
      </Form.Item>
      {isOpen && (
        <Modal
          centered
          title="멤버 수정하기"
          open={isOpen}
          onOk={close}
          onCancel={close}
          footer={[
            <Button key="back" onClick={close}>
              취소
            </Button>,
            <Button htmlType="submit" key="submit" type="primary">
              수정
            </Button>,
          ]}>
          <Member member={memberItems} setMember={setMemberItems} />
        </Modal>
      )}
    </Form>
  );
};
