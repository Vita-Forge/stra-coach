"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DEMO_USERS, ROLE_ROUTES, type UserRole, type AppUser } from "@/lib/data";

interface AuthContextType {
    user: AppUser | null;
    isLoaded: boolean;
    signIn: (email: string, password: string) => { ok: boolean; error?: string; route?: string };
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoaded: false,
    signIn: () => ({ ok: false }),
    signOut: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AppUser | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem("sc_user");
            if (saved) setUser(JSON.parse(saved));
        } catch { }
        setIsLoaded(true);
    }, []);

    const signIn = (email: string, password: string): { ok: boolean; error?: string; route?: string } => {
        const match = DEMO_USERS.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!match) return { ok: false, error: "Email o password non corretti" };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _p, ...safe } = match;
        setUser(safe);
        localStorage.setItem("sc_user", JSON.stringify(safe));
        return { ok: true, route: ROLE_ROUTES[safe.role] };
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("sc_user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoaded, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export type { UserRole, AppUser };
