import React, {useContext, useEffect, useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from '../firebase';

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider ({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(auth, email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
    }

  return (
    <AuthContext.Provider value={value}>
        {
            loading && 
            <div className='d-flex align-items-center justify-content-center' style={{height:'97vh'}}>
                <h1>Wait a second...</h1>
            </div>
        }
        {
            !loading && 
            children
        }
    </AuthContext.Provider>
  )
}