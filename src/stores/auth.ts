import create from 'zustand'
import { getAuth, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import type { Credentials } from '../types'
import { firebase } from '../config'

interface AuthStore {
    isLoggedIn: boolean,
    loginError: string,
    setAuthStatus: (active: boolean) => void,
    login: (credentials: Credentials) => void,
    logout: () => void
}

const auth = getAuth(firebase)

const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    loginError: '',
    setAuthStatus: (active: boolean) => set(() => ({isLoggedIn: active})),
    login: async (credentials: Credentials) => {
        const { email, password } = credentials
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => set({isLoggedIn: true}))
            .catch((e) => {

                const message = e.code === 'auth/user-not-found'
                    ? 'New phone who dis'
                    : 'I am 4 parallel universes ahead of you.'
                set({loginError: message})
            })
    },

    logout: () => {
       signOut(auth)
       set({isLoggedIn: false})
    }
}))

export default useAuthStore