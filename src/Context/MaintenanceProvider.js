import { createContext, useState } from "react";

export const MaintenanceData = createContext({});

const MaintenanceProvider = ({ children }) => {
    const [maintenance, setMaintenance] = useState(true);

    return (
        <MaintenanceData.Provider
            value={{
                maintenance,
                setMaintenance,
            }}
        >
            {children}
        </MaintenanceData.Provider>
    );
};

export default MaintenanceProvider;
