import { useEffect, useState } from 'react'
import { getFranchises } from '../../api'

export function useFetchFranchises() {
    const [franchises, setFranchises] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        async function fetchProblems() {
            try {
                setIsLoading(true)
                const result = await getFranchises()
                if (result.length !== 0) setFranchises(result)
            } catch (error) {
            } finally {
                setIsLoading(false)
            }
        }
        fetchProblems()
    }, [])

    return {
        franchises,
        isLoading,
    }
}
