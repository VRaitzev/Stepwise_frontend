import { Link, Outlet } from 'react-router-dom';
const MainLayout = () => {
    return (
        <>
            <header className="custom-header">
                <div className="container text-center fs-3 fw-light py-3 ">
                    <div className="row">
                        <div className="col">
                            <Link to="/main/interationWindow" className='custom-link'>Ежедневный план</Link>
                        </div>
                        <div className="col">
                            <Link to="/main/PhysicalPlanSettings" className='custom-link'>Физический план</Link>
                        </div>
                        <div className="col">
                            <Link to="/main/MentalPlanSettings" className='custom-link'>Ментальный план</Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className='container'>
                <Outlet />
            </main>
            <footer className='custom-footer'>2025</footer>
        </>
    )
}

export { MainLayout }