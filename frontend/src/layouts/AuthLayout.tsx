import Footer from "@/components/footer";
import Header from "@/components/header";
import React, {useEffect} from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']})

interface Props {
    children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({children}) => {
    useEffect(() => {
        console.log('AuthLayout');
    }, [])

    return (
        <div className={`min-h-screen ${inter.className}`}>
            {children}
        </div>
    );
}

export default AuthLayout;
