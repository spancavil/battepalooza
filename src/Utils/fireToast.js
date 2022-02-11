import Swal from 'sweetalert2';

const fireToast = (title, time, width) => {
    Swal.fire({
        html: `<h3 style="text-align: center; font-size: 27px;">${title}</h3>`,
        toast: true,
        background: "rgba(1, 73, 219, 0.85)",
        timer: time,
        width,
        position: 'top-center',
        color: "#fff",
        showConfirmButton: false
    })
}

export default fireToast;