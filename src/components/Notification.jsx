import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successNotification = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};
const ErrorNotification = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};
export { successNotification, ErrorNotification };
