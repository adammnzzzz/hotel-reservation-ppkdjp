import Swal from "sweetalert2";

export const showToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({ icon, title });
};

export const showAlert = (icon, title, text) => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonColor: "#4f46e5", // Indigo Mewah
    // Parameter borderRadius gue hapus total karena bikin warning
  });
};

export const showLoading = (title = "Loading...", text = "Mohon tunggu sebentar") => {
  Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeSwal = () => Swal.close();