import { useState, useEffect } from 'react'
import { getUser } from '../api/user'

const useUserData = (userId) => {
    const [user, setUser] = useState(null)

    const handleLoad = async () => {
        const response = await getUser(userId)
        setUser(response.data[0])
    }

    useEffect(() => {
        handleLoad()
    }, [])

    return [user]
}

export default useUserData
