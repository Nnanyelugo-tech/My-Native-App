import Toast, { ToastConfig } from "react-native-toast-message";
import { CustomToastUi } from "./customToastUi";

type props = {
  [key: string]: any;
};

const toastConfig: ToastConfig = {
  success: ({ text1, text2, icon, onClose }: props) => (
    <CustomToastUi
      type="success"
      text1={text1 || ""}
      text2={text2 || ""}
      icon={icon}
      onClose={onClose}
    />
  ),
  error: ({ text1, text2, onClose }: props) => (
    <CustomToastUi type="error" text1={text1} text2={text2} onClose={onClose} />
  ),
  info: ({ text1, text2, onClose }: props) => (
    <CustomToastUi type="info" text1={text1} text2={text2} onClose={onClose} />
  ),
};

export const ToastMassage = () => {
  return <Toast config={toastConfig} />;
};
