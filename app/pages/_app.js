import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/globals.css";
import "@fontsource/poppins";
import { ContextProviderWallet } from "../context/ContextProviderWallet";
import ToastContainer from "../components/common/ToastContainer";
import Layout from "../components/layout";
import { MoralisProvider } from "react-moralis";
import AppContextProvider from "../context/AppContextProvider";

function MyApp({ Component, pageProps }) {
    console.log(process.env.MORALIS_APP_ID);
    return (
        <ContextProviderWallet>
            <MoralisProvider
                appId={"9QyL2E4sqSfNOKKyDV2u89uW6hP2jAcnBlMenOpp"}
                serverUrl={"https://yehs8xcvym2g.usemoralis.com:2053/server"}
            >
                <AppContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                        <ToastContainer />
                    </Layout>
                </AppContextProvider>
            </MoralisProvider>
        </ContextProviderWallet>
    );
}

export default MyApp;
