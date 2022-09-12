import { useLocalStorage } from "@solana/wallet-adapter-react";
import { createContext, useContext } from "react";



export const AutoConnectContext = createContext({
    autoConnect: false,
    setAutoConnect: (autoConnect) => {}
})

export function useAutoConnect() {
    return useContext(AutoConnectContext);
}



export const AutoConnectProvider = ({ children }) => {
    const [autoConnect, setAutoConnect] = useLocalStorage("autoConnect", true);

    return (
        <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
            {children}
        </AutoConnectContext.Provider>
    );
};
