import Footer from "@/components/footer";
import Header from "@/components/header";
import React, {useEffect} from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']})

interface Props {
    children: React.ReactNode
}

const BaseLayout: React.FC<Props> = ({children}) => {
    return (
        <div className={`min-h-screen ${inter.className}`}>
            <div className="flex">
                <div className="flex-none xl:w-80 md:w-60">
                    Menu
                </div>
                <div className="flex-grow">
                    <Header/>
                    <div className="w-full p-10">
                        {children}
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default BaseLayout;
