import React from "react";
import {Inter} from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useGetMeQuery } from "@/services/auth";

const inter = Inter({subsets: ['latin']})

interface Props {
    children: React.ReactNode;
}

// const FullLayout: FC = ({children}) => {
const FullLayout: React.FC<Props> = ({ children }) => {
    const {} = useGetMeQuery('');

    return (
        <div className={`min-h-screen ${inter.className}`}>
            <Header/>
            <div className="w-full p-10">
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default FullLayout;
