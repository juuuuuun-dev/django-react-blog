import { message } from 'antd';

interface IToastProps {
  type: 'SUCCESS' | 'ERROR';
  text?: string;
}

export const DefaultSuccessText = 'Success';
export const DefaultErrorText = 'Request error';

const toast = (props: IToastProps) => {
  let text;
  switch (props.type) {
    case 'SUCCESS':
      text = props.text || DefaultSuccessText;
      message.success(text);
      break;
    case 'ERROR':
      text = props.text || DefaultErrorText;
      message.error(text);
      break;
    default:
      console.log('type error');
  }
};

export default toast;
