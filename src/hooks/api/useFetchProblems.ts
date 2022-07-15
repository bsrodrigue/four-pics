import { Problem } from './../../interfaces/index';
import { useState, useEffect } from 'react';
import { getAllProblems, getFranchiseProblems } from '../../api';

export function useFetchProblems(franchise?: string) {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchProblems() {
            try {
                setIsLoading(true);
                const result = franchise ? await getFranchiseProblems(franchise) : await getAllProblems();
                if (result.length !== 0) setProblems(result);
            } catch (error) {

            }
            finally {
                setIsLoading(false);
            }
        }
        fetchProblems();
    }, [franchise]);

    return {
        problems, isLoading
    };
}