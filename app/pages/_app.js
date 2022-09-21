import "../styles/globals.css";
import "@fontsource/poppins";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ContextProviderWallet } from "../context/ContextProviderWallet";
import { ToastProvider } from "../context/ToastContext";
import ToastContainer from "../components/common/ToastContainer";
import { ModalContextProvider as ShareModalProvider } from "../context/ShareModalContext";
import Layout from "../components/layout";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
    console.log(process.env.MORALIS_APP_ID)
    return (
        <ContextProviderWallet>
            <MoralisProvider
                appId={"9QyL2E4sqSfNOKKyDV2u89uW6hP2jAcnBlMenOpp"}
                serverUrl={"https://yehs8xcvym2g.usemoralis.com:2053/server"}
            >
                <ShareModalProvider>
                <ToastProvider>
                    <Layout>
                        <Component {...pageProps} />
                        <ToastContainer />
                    </Layout>
                </ToastProvider>
                </ShareModalProvider>
            </MoralisProvider>
        </ContextProviderWallet>
    );
}

export default MyApp;
