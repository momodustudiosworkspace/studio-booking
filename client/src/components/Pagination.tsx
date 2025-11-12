// src/components/common/Pagination.tsx

interface PaginationProps {
    currentPage: number | null;
    totalPages: number | null;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handlePrev = () => {
        if (currentPage !== null) {
            return currentPage > 1 && onPageChange(currentPage - 1)
        }
    };
    const handleNext = () => {
        if (currentPage !== null && totalPages !== null) {
            return currentPage < totalPages && onPageChange(currentPage + 1)
        }
    };

    return (
        <div className="w-full flex justify-end">
            <div className="flex items-center gap-5">
                <div className="flex">
                    {currentPage} of {totalPages}
                </div>
                <button className={`${currentPage === 1 ? "bg-black/50" : "bg-black"} text-white disabled:cursor-not-allowed rounded-full text-sm w-[100px] h-[40px]`} onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                <button className={`${currentPage === totalPages ? "bg-black/50" : "bg-black"} text-white disabled:cursor-not-allowed rounded-full text-sm  w-[100px] h-[40px]`} onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
       </div>
        
    );
}
