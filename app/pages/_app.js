import "../styles/globals.css";
import "@fontsource/poppins";
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";
import {ContextProviderWallet} from "../context/ContextProviderWallet"

function MyApp({ Component, pageProps }) {
    // const WalletConnectionProvider = dynamic(
    //     () => import("../context/WalletConnectionProvider"),
    //     { ssr: false }
    // );

    const getLayout = Component.getLayout || ((page) => page);
    return (
        <ContextProviderWallet>
            {getLayout(<Component {...pageProps} />)}
        </ContextProviderWallet>
    );
}

export default MyApp;
