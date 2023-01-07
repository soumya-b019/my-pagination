import React, {useEffect, useState} from 'react'
import ReactPaginate from 'react-paginate';
import './Page.css'

const Page = () => {
    const [usersPage_1, setUsersPage_1] = useState([]);
    const [usersPage_2, setUsersPage_2] = useState([]);

    useEffect(() => {
        fetch('https://reqres.in/api/users?page=1')
        .then((res) => res.json())
        .then((output) => setUsersPage_1(output.data));
    }, [])

    useEffect(() => {
        fetch('https://reqres.in/api/users?page=2')
        .then((res) => res.json())
        .then((output) => setUsersPage_2(output.data));
    }, [])

    const overallUsers = ([...usersPage_1, ...usersPage_2]);

    const[pageNumber, setPageNumber] = useState(0);
    
    const userPerPage = 1;
    const pagesVisited = pageNumber * userPerPage;

    const displayUsers = overallUsers
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((user) =>{
        return(
            <div key={user.id}>
            <p><strong>{user.first_name} {user.last_name}</strong></p>
            <p>{user.email}</p>
            <img key={user.avatar} src={user.avatar} alt={"user_image"} />
            </div>
        )
    })

    const pageCount = Math.ceil(overallUsers.length / userPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    return(
        <>
            <h1>Click any buttuon to view data!!</h1>

            {displayUsers}
            
            <ReactPaginate 
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                activeClassName={"paginationActive"}
            />
        </>
    )
}

export default Page