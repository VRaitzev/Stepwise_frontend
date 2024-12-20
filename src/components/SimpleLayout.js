import { Link, Outlet } from 'react-router-dom';
const SimpleLayout = () => {
    return (
        <>
            <header></header>
            <main className='container'>
                <Outlet />
            </main>
            <footer>2024</footer>
        </>
    )
}

export { SimpleLayout }