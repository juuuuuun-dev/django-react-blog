import { message } from 'antd';

interface IToastProps {
  type: 'SUCCESS' | 'DELETE' | 'ERROR';
  text?: string;
}

export const DefaultSuccessText = 'Success';
export const DefaultErrorText = 'Request error';
export const DefaultDeleteText = 'Successful delete';

const toast = (props: IToastProps) => {
  let text;
  switch (props.type) {
    case 'SUCCESS':
      text = props.text || DefaultSuccessText;
      message.success(text);
      break;
    case 'DELETE':
      text = props.text || DefaultDeleteText;
      message.success(text);
    case 'ERROR':
      text = props.text || DefaultErrorText;
      message.error(text);
      break;
    default:
      console.log('type error');
  }
};

export default toast;
