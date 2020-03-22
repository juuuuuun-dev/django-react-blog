import { message } from 'antd';

interface IToastProps {
  type: 'SUCCESS' | 'ERROR';
  text?: string;
}

const toast = (props: IToastProps) => {
  let text;
  switch (props.type) {
    case 'SUCCESS':
      text = props.text || 'Success';
      message.success(text);
      break;
    case 'ERROR':
      text = props.text || 'Request error';
      message.error(text);
      break;
    default:
      console.log('type error');
  }
};

export default toast;
