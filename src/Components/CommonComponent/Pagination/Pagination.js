import { useEffect, useState } from "react"
import { Button } from "semantic-ui-react"
import "./Pagination.scss"

const Pagination = ({ TotalPage, activePage, itemsCountPerPage, onClick = () => {} , isLoading}) => {
    TotalPage = TotalPage || 0;
    activePage = activePage || 1
    itemsCountPerPage = itemsCountPerPage || 10
    const [pagination, setPagination] = useState([])
    const [shownext, setShownext] = useState(0)

    useEffect(()=>{
        if (isLoading === true) {
            setShownext(0)
        }
    },[isLoading])

    const Getpage = () => {
        var Pages = Math.round(Math.ceil(TotalPage / itemsCountPerPage))
        let paginationContent = [], i = 1;
        while (i <= Pages) {
            if (i <= 2 || //the first three pages
                (i >= (Pages - 2)) || //the last three pages
                ((i >= (activePage - 1)) && i <= activePage + 1)) { //the currentPage, the page before and after
                paginationContent.push(i);
                i++;
            } else { //any other page should be represented by ...
                paginationContent.push("...");
                //jump to the next page to be linked in the navigation
                i = i < activePage ? activePage - 1 : Pages - 1;
            }
        }
        setPagination(paginationContent)
        return paginationContent;
    }

    useEffect(() => {
        if (TotalPage !== 0) {
            Getpage()
        }
         // eslint-disable-next-line
    }, [TotalPage, shownext ,  activePage]) 

    useEffect(()=>{
        onClick((shownext / itemsCountPerPage) + 1  )
         // eslint-disable-next-line
    },[shownext ])
    const currentPage = (e) => {
        if (e.target.textContent !== "...") {
            setShownext(Number(e.target.textContent) * itemsCountPerPage - itemsCountPerPage)
        }
    }

    const NextPage = () => {
        if (TotalPage >= shownext) {
            setShownext(shownext + 15)  // change addition number here and button html
        }
    }
    const PreviousPage = () => {
        setShownext(shownext - 15) // change addition number here and button html
    }

   

    return (
        
        <div className='d-flex pagination-inner'>
            <Button onClick={shownext !== 0 ? () => PreviousPage() : null} className={shownext !== 0 ? 'active-pagination-footer-btn' : "disable-pagination-footer-btn"} type="button">Previous</Button>
            {
                pagination.map((pageNumber, index) => {
                    return <Button key={index} type="button" className={pageNumber === activePage ? "active-footer-btn" : "disable-footer-btn"} onClick={(e) => currentPage(e)}>{pageNumber}</Button>
                })
            }
            <Button onClick={TotalPage > shownext + 10 ? () => NextPage() : null} className={TotalPage > shownext + 15 ? 'active-pagination-footer-btn' : "disable-pagination-footer-btn"} type="button">Next</Button>
        </div>
    )
}

export default Pagination