import { logOutAmplitude } from "./amplitude";
import { fireAlertAsync } from "./sweetAlert2";
/**
 * 
 * @param response La respuesta de algún servicio
 * @param history Viene del hook useHistory 
 * @return true en caso que no haya error y pueda continuar, false en cualquier otro caso y además dispara los alerts correspondientes.
 */

const checkErrorMiddleware = (response, history) => {
    if (Object.keys(response).length) {
        if (response.error?.num !== 0) {
            if (response.error.text.includes("authorized")) {
                fireAlertAsync("Session expired, please login again.").then(() => {
                    localStorage.removeItem("userBP");
                    logOutAmplitude();
                    if (history) history.push("/");
                    window.location.reload();
                    return false;
                });
            } else {
                fireAlertAsync("Oops, an error ocurred", response.error.text, "500px").then(()=> {
                    return false;
                })
            }
        }
        else {
            return true;
        }
    }
    return false;
}

export default checkErrorMiddleware;