import React, {useState} from 'react'
import styles from "./Paginator.module.css";

// TypeScript
type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalUsersCount,pageSize,currentPage,onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={styles.pagesCount}>
        {portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1)}}>Prev</button>
        }

        {pages
            .filter(p => p >=leftPortionPageNumber && p<=rightPortionPageNumber)
            .map(p => {
                return <span
                key={p}
                    // @ts-ignore
                className={currentPage === p && styles.selectedPage}
                onClick={() => {
                    onPageChanged(p)
                }}>{p}
                    </span>
        })}
        { portionCount > portionNumber &&
        <button onClick={() => { setPortionNumber(portionNumber + 1)}}>Next</button>}

    </div>

}

export default Paginator