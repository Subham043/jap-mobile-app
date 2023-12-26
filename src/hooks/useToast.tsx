import { ToastOptions, toast } from "react-toastify";

const toastConfig:ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export function useToast(){
    const toastSuccess = (msg:string) => toast.success(msg, toastConfig);
    const toastError = (msg:string) => toast.error(msg, toastConfig);
    const toastInfo = (msg:string) => toast.info(msg, toastConfig);
    return {
        toastSuccess,
        toastError,
        toastInfo
    };
}