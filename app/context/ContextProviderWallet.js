import { AutoConnectProvider } from "./AutoConnectProvider"
import WalletConnectionProvider from "./WalletConnectionProvider"

export const ContextProviderWallet = ({ children }) => {
    return (
        <AutoConnectProvider>
            <WalletConnectionProvider>
                {children}
            </WalletConnectionProvider>
        </AutoConnectProvider>
    )
}