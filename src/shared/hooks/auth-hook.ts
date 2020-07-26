import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../reducers'
import { setCurrentUser, ICurrentUser } from '../../ducks/users'

let logoutTimer: any
export const useAuth = () => {
    const { currentUser } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch()
    useEffect(() => {
        const userData: ICurrentUser | null = JSON.parse(localStorage.getItem('userData')!)
        if (userData && userData.token && new Date(userData.expiration) > new Date()) {
            dispatch(setCurrentUser({ ...userData, expiration: new Date(userData.expiration) }))
        }
    }, [dispatch])

    useEffect(() => {
        if (currentUser?.token && currentUser?.expiration) {
            const remainingTime = currentUser?.expiration.getTime() - new Date().getTime()
            logoutTimer = setTimeout(() => {
                dispatch(setCurrentUser(null))
                localStorage.clear()
            }, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [currentUser, dispatch])
}