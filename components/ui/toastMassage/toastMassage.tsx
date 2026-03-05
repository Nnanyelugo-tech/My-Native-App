import Toast, { ToastConfig } from "react-native-toast-message";
import { CustomToastUi } from "./customToastUi";

type props = {
  [key: string]: any;
};

const toastConfig: ToastConfig = {
  success: ({ text1, text2, props }: props) => (
    <CustomToastUi
      type="success"
      text1={text1 || ""}
      text2={text2 || ""}
      icon={props?.icon}
      onClose={props?.onClose}
    />
  ),
  error: ({ text1, text2, props }: props) => (
    <CustomToastUi
      type="error"
      text1={text1 || ""}
      text2={text2 || ""}
      icon={props?.icon}
      onClose={props?.onClose}
    />
  ),
  info: ({ text1, text2, props }: props) => (
    <CustomToastUi
      type="info"
      text1={text1 || ""}
      text2={text2 || ""}
      icon={props?.icon}
      onClose={props?.onClose}
    />
  ),
};

export const ToastMassage = () => {
  return <Toast config={toastConfig} />;
};
