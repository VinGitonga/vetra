import "../styles/globals.css";
import "@fontsource/poppins";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ContextProviderWallet } from "../context/ContextProviderWallet";
import { ToastProvider } from "../context/ToastContext";
import ToastContainer from "../components/common/ToastContainer";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
    // const getLayout = Component.getLayout || ((page) => page);
    return (
        <ContextProviderWallet>
            <ToastProvider>
                <Layout>
                    <Component {...pageProps} />
                    <ToastContainer />
                </Layout>
                {/* {getLayout(<Component {...pageProps} />)} */}
            </ToastProvider>
        </ContextProviderWallet>
    );
}

export default MyApp;
