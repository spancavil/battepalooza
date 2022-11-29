import { createContext, useEffect, useState } from "react";
import authService from "../Services/auth.service";

export const MaintenanceData = createContext({});

const MaintenanceProvider = ({ children }) => {

    const [maintenance, setMaintenance] = useState(false);
    // const [checkMaintenance, setCheckMaintenance] = useState(false);

    useEffect(()=> {
            const checking = async () => {
                try {
                    const response = await authService.getMaintenanceStatus();
                    if (response?.maintenance) setMaintenance(response.maintenance)
                    if (!response?.maintenance) setMaintenance(false)
                } catch (error) {
                    console.log(error);
                }
            }
            setInterval(checking, 60000)
    }, [])

/*     //Triggers a check for maintenance
    useEffect(()=> {
        const checkMaintenance = async () => {
            try {
                const response = await authService.getMaintenanceStatus();
                if (response?.maintenance) setMaintenance(response.maintenance)
                if (!response?.maintenance) setMaintenance(false)
            } catch (error) {
                console.log(error);
            }
        }
        checkMaintenance()
    }, [checkMaintenance]) */

    return (
        <MaintenanceData.Provider
            value={{
                maintenance,
                setMaintenance,
                // setCheckMaintenance,
            }}
        >
            {children}
        </MaintenanceData.Provider>
    );
};

export default MaintenanceProvider;
