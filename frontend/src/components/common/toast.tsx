import { message } from 'antd';

interface IToastProps {
  type: 'SUCCESS' | 'DELETE' | 'ERROR';
  text?: string;
}

export const defaultSuccessText = 'Success';
export const defaultErrorText = 'Request error';
export const defaultDeleteText = 'Successful delete';

const toast = (props: IToastProps) => {
  let text;
  switch (props.type) {
    case 'SUCCESS':
      text = props.text || defaultSuccessText;
      message.success(text);
      break;
    case 'DELETE':
      text = props.text || defaultDeleteText;
      message.success(text);
      break;
    case 'ERROR':
      text = props.text || defaultErrorText;
      message.error(text);
      break;
    default:
  }
};

export default toast;
