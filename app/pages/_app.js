import "../styles/globals.css";
import "@fontsource/poppins";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ContextProviderWallet } from "../context/ContextProviderWallet";
import { ToastProvider } from "../context/ToastContext";
import ToastContainer from "../components/common/ToastContainer";
import Layout from "../components/layout";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
    // const getLayout = Component.getLayout || ((page) => page);
    console.log(process.env.MORALIS_APP_ID)
    return (
        <ContextProviderWallet>
            <MoralisProvider
                appId={"9QyL2E4sqSfNOKKyDV2u89uW6hP2jAcnBlMenOpp"}
                serverUrl={"https://yehs8xcvym2g.usemoralis.com:2053/server"}
            >
                <ToastProvider>
                    <Layout>
                        <Component {...pageProps} />
                        <ToastContainer />
                    </Layout>
                    {/* {getLayout(<Component {...pageProps} />)} */}
                </ToastProvider>
            </MoralisProvider>
        </ContextProviderWallet>
    );
}

export default MyApp;
