import { Calendar } from 'antd';

export const CalenderView = () => {
  const onPanelChange = (value: any, mode: any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return <Calendar onPanelChange={onPanelChange} />;
};
