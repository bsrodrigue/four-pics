import { Puzzle } from '../../types/index';
import { useState, useEffect } from 'react';
import { getAllProblems } from '../../api';

export function useFetchAllProblems() {
    const [problems, setProblems] = useState<Puzzle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchAllProblems() {
            try {
                setIsLoading(true);
                const result = await getAllProblems();
                if (result.length !== 0) setProblems(result);
            } catch (error) {

            }
            finally {
                setIsLoading(false);
            }
        }
        fetchAllProblems();
    }, []);

    return {
        problems, isLoading
    };
}