import { useFetchFranchises } from '../../../hooks/api'
import { LoadingDialog } from '../../components'

export default function UniverseListPage() {
    const { franchises, isLoading } = useFetchFranchises()

    return (
        <>
            {isLoading ? (
                <LoadingDialog loadingMessage="Chargement..." />
            ) : (
                <></>
            )}
        </>
    )
}
