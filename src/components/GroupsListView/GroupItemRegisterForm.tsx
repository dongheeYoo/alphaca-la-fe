import { Input, Form, Select } from 'antd';
import { Raids } from '../../utils/raids';
import { Raid } from '../../utils/types';
import { GroupMemberTable } from './GroupMemberTable';

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
        <GroupMemberTable member={member} />
      </Form.Item>
    </Form>
  );
};
