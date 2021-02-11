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
  message.config({
    duration: 3,
    maxCount: 3,
    rtl: true,
  });
  const style = {
    marginTop: '30px',
    marginRight: '10px',
    width: "auto",
    left: "auto",
    right: "10px",
    position: "fixed",
  };
  switch (props.type) {
    case 'SUCCESS':
      text = props.text || defaultSuccessText;
      message.success({
        content: text,
        style,
      });
      break;
    case 'DELETE':
      text = props.text || defaultDeleteText;
      message.success({
        content: text,
        style,
      });
      break;
    case 'ERROR':
      text = props.text || defaultErrorText;
      message.error({
        content: text,
        style,
      });
      break;
    default:
  }
};

export default toast;
