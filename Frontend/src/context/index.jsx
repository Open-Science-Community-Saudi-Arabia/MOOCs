import React, { createContext, useEffect, useReducer, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { LOGOUT_KEY, TOKEN_KEY } from '../utils/constants'
import { getToken } from '../utils'
import Spinner from '../components/Spinner'

const initialState = {
    isLoggedIn: false,
}

const AppContext = createContext(initialState)
const AuthActionsContext = createContext({
    logout: () => {
        
    },
})


const reducer = (_, action) => {
    switch (action.type) {
        case 'login': {
            return { ...action.payload }
        }
        default: {
            throw new Error('Invalid app reducer action type')
        }
    }
}

function useAuthChanged() {
    const location = useLocation()

    const syncLogout = (event) => {
        if (event.key === LOGOUT_KEY) {
            return <Navigate to="/login" state={{ redirect: location }} />
        } 
            return null   

    }

    useEffect(() => {
        window.addEventListener('storage', syncLogout)

        return () => {
            window.removeEventListener('storage', syncLogout)
            window.localStorage.removeItem(LOGOUT_KEY)
        }
    }, [])
}

export function AppProvider({ children }) {
    useAuthChanged()

    const [state, dispatch] = useReducer(reducer, initialState)
    const location = useLocation()
    const token = getToken()

    if (!token) {
        return <Navigate to="/login" state={{ redirect: location }} />
    }
    const logout = async () => {
        axios.defaults.headers.common.Authorization = ''
        window.localStorage.removeItem(TOKEN_KEY)

        // to support logging out from all windows
        window.localStorage.setItem(LOGOUT_KEY, Date.now().toString())
        window.location.assign('/login')
    }

    useEffect(() => {
        async function initialize() {
            try {
                if (token) {
                    const isLoggedIn = true

                    dispatch({
                        type: 'login',
                        payload: {
                            isLoggedIn,
                        },
                    })
                } else {
                    const error = {
                        message: "You are not logged in"
                    }
                    throw error.message
                }
            } catch (error) {
                logout()
            }
        }
        initialize()
    }, [])


    return (
        <AuthActionsContext.Provider value={{ logout }}>
            <AppContext.Provider
                value={{
                    isLoggedIn: state.isLoggedIn,
                }}
            >
                {state.isLoggedIn ? (
                    children
                ) : (
                    <div className="h-screen flex flex-col items-center justify-center">
                        <Spinner />
                    </div>
                )}
            </AppContext.Provider>
        </AuthActionsContext.Provider>
    )

}

export const useAppContext = () => {
    const context = useContext(AppContext)

    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}

export const useAuthActions = () => {
    const context = useContext(AuthActionsContext)

    if (context === undefined) {
        throw new Error('useAuthActions must be used within an AuthActionsContext Provider')
    }
    return context
}

export default AppProvider