import { createContext } from "react"
import useAuth from "../hooks/useAuthentication"

export const AuthContext = createContext({
    authUser: null,
    hasAccount: false,
    setHasAccount: () => {},
    signup: async () => {}
})

export function AuthProvider({ children }){
    const auth = useAuth()
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}