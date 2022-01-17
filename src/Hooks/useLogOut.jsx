import { useHistory } from "react-router-dom";
import { logOutAmplitude } from '../Utils/amplitude';
/**
 * Custom hook for logout on session expired
 */
export default function useLogOutExpired(){

    const history = useHistory();
    return () => {        
        alert ('Session expired, please login again.');
        localStorage.removeItem ('userBP');
        logOutAmplitude();
        history.push ('/');
        window.location.reload ();
    }
}