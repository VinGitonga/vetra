import { cloneElement } from "react";
import { ModalContextProvider } from "./ShareModalContext";
import { ToastProvider } from "./ToastContext";
import { AuthProvider } from "./UserContextProvider";

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight(
        (kids, parent) => cloneElement(parent, { children: kids }),
        children
    );
}

export default function AppContextProvider({ children }) {
    return (
        <ProviderComposer
            contexts={[
                <AuthProvider />,
                <ToastProvider />,
                <ModalContextProvider />,
            ]}
        >
            {children}
        </ProviderComposer>
    );
}
