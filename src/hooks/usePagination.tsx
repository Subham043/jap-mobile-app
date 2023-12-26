import { useCallback, useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState<number>(1)

    const prevHandler = useCallback(():void => setPage(Math.max(1, page-1)),[page])
    
    const nextHandler = useCallback(():void => setPage(page+1), [page])
    
    return {
        page,
        setPage,
        prevHandler,
        nextHandler
    };
};