import Toast, { ToastConfig } from "react-native-toast-message";
import { CustomToastUi } from "./CustomToastUi";

interface ToastParams {
  text1?: string;
  text2?: string;
  props: {
    icon?: React.ReactNode;
    onClose?: () => void;
  };
}

const toastConfig: ToastConfig = {
  success: (params) => {
    const { text1, text2, props } = params as ToastParams;
    return (
      <CustomToastUi
        type="success"
        text1={text1 || ""}
        text2={text2 || ""}
        icon={props?.icon}
        onClose={props?.onClose}
      />
    );
  },
  error: (params) => {
    const { text1, text2, props } = params as ToastParams;
    return (
      <CustomToastUi
        type="error"
        text1={text1 || ""}
        text2={text2 || ""}
        icon={props?.icon}
        onClose={props?.onClose}
      />
    );
  },
  info: (params) => {
    const { text1, text2, props } = params as ToastParams;
    return (
      <CustomToastUi
        type="info"
        text1={text1 || ""}
        text2={text2 || ""}
        icon={props?.icon}
        onClose={props?.onClose}
      />
    );
  },
};

export const ToastMessage = () => {
  return <Toast config={toastConfig} />;
};
