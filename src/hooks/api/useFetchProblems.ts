import { Puzzle } from '../../types/index';
import { useState, useEffect } from 'react';
import { getAllProblems, getFranchiseProblems } from '../../api';
import _ from 'lodash';

export function useFetchProblems(franchise?: string) {
    const [problems, setProblems] = useState<Puzzle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchProblems() {
            try {
                setIsLoading(true);
                const result = franchise ? await getFranchiseProblems(franchise) : await getAllProblems();
                if (result.length !== 0) setProblems(_.shuffle(result));
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