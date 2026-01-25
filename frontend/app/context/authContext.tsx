import { createContext } from "react-router";

interface AuthContextType {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;