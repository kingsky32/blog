import { message } from 'antd';

export default function handleError(error: any) {
  message.error(error?.response?.data?.message ?? error);
}
