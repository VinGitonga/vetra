import { useState, createContext } from "react"

export const ModalContext = createContext()


export const ModalContextProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [fileDetails, setFileDetails] = useState(null)

    const modalState = {
        modalOpen,
        setModalOpen,
        fileDetails,
        setFileDetails
    }

    return (
        <ModalContext.Provider value={modalState}>
            {children}
        </ModalContext.Provider>
    )
}