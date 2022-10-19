import Swal from 'sweetalert2';

const fireToast = (text, time, width = '350px', fontSize = '27px') => {
    Swal.fire({
        html: `<h3 style="text-align: center; font-size: ${fontSize}; color: fff">${text}</h3>`,
        toast: true,
        background: "rgba(1, 73, 219, 0.85)",
        color: "white",
        timer: time,
        width,
        position: 'center',
        showConfirmButton: false
    })
}

export const fireAlert = (title, text, width) => {
    Swal.fire({
        html: `<h2 style="text-align: center; font-size: 27px; padding-bottom: 15px; color: fff">${title}</h2>
                <h3 style="text-align: center; font-size: 20px; color: fff">${text}</h3>
        `,
        width,
        background: "rgba(1, 73, 219, 0.85)",
        position: 'center',
        color: "white",
        showConfirmButton: true,
        confirmButtonColor: '#081f91',
    })
}

export const fireAlertAsync = async (title, text, width) => {
    return await Swal.fire({
        html: `<h2 style="text-align: center; font-size: 27px; padding-bottom: 15px; color: fff">${title}</h2>
                <h3 style="text-align: center; font-size: 20px; color: fff">${text ? text : ""}</h3>
        `,
        width,
        background: "rgba(1, 73, 219, 0.85)",
        position: 'center',
        color: "white",
        showConfirmButton: true,
        confirmButtonColor: '#081f91',
    })
}

export default fireToast;