import Toast, { ToastConfig } from "react-native-toast-message";
import { CustomToastUi } from "./customToastUi";

interface ToastParams {
  text1?: string;
  text2?: string;
  props: {
    icon?: React.ReactNode;
    onClose?: () => void;
  };
}

const toastConfig: ToastConfig = {
  success: (params: any) => {
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
  error: (params: any) => {
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
  info: (params: any) => {
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

export const ToastMassage = () => {
  return <Toast config={toastConfig} />;
};
