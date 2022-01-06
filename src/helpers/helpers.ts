import Swal, { SweetAlertIcon } from "sweetalert2";

interface fireToastProps {
  message: string;
  icon: SweetAlertIcon;
  duration?: number;
}

function fireToast({ icon, message, duration }: fireToastProps) {
  Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration ?? 3000,
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  }).fire({
    icon: icon,
    title: message,
  });
}

interface confirmDialogProps {
  question: string;
  onConfirm: () => void;
  confirmButtonColor?: string;
}

export default class Helpers {
  static errorToast = (message: string, duration?: number) => {
    fireToast({
      icon: "error",
      message: message,
      duration: duration,
    });
  };

  static infoToast = (message: string, duration?: number) => {
    fireToast({
      icon: "info",
      message: message,
      duration: duration,
    });
  };

  static textInputAlert = (
    question: string,
    onConfirm: (value: any) => void
  ) => {
    Swal.fire({
      icon: "question",
      title: question,
      input: "text",
      showCancelButton: true,
    }).then((value) => {
      if (value.isConfirmed) {
        onConfirm(value.value);
      }
    });
  };

  static fileInputAlert = (
    question: string,
    accept: string,
    onConfirm: (value: any) => void
  ) => {
    Swal.fire({
      title: question,
      input: "file",
      inputAttributes: {
        accept: accept,
      },
      showCancelButton: true,
    }).then((value) => {
      if (value.isConfirmed) {
        onConfirm(value.value);
      }
    });
  };

  static successToast = (message: string, duration?: number) => {
    fireToast({
      icon: "success",
      message: message,
      duration: duration,
    });
  };

  static successAlert = (message: string) => {
    Swal.fire({
      icon: "success",
      title: message,
    });
  };

  static showLoading = (message: string) => {
    Swal.fire({
      title: message,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  static confirmDialog = ({
    question,
    onConfirm,
    confirmButtonColor,
  }: confirmDialogProps) => {
    Swal.fire({
      icon: "question",
      title: question,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor ?? "red",
    }).then((value) => {
      if (value.isConfirmed) {
        onConfirm();
      }
    });
  };

  static getById = (id: string) => {
    return document.getElementById(id);
  };
  static inputGetter = (id: string) => {
    return (document.getElementById(id) as HTMLInputElement)!.value;
  };

  static getFirebaseError = (error: any) => {
    let errorMessage = (error as any).code;
    return errorMessage.substring(
      errorMessage.indexOf("/") + 1,
      errorMessage.length
    );
  };
}
