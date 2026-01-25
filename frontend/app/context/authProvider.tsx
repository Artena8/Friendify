import { useContext, useEffect, useState } from "react";
import AuthContext from "./authContext";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fbAuth, (user: User | null) => {
            setUser(user ? {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid
            } : null);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
