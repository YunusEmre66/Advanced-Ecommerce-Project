// ** React Imports
import { useGetMeQuery } from '@/services/auth'
import { useGetMenuQuery } from '@/services/menu'
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Defaults
const defaultProvider: any = {}

const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const {} = useGetMeQuery('')
    
    const values = {}

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
