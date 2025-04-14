import './AppHeader.css';
// import MainNav from './MainNav';

function AppHeader() {
    return (
        <header className="appHeader">
            <div className='appHeaderLogoContainer'>
            <img alt="local loop logo" className="appHeaderLogo" src="./LocalLoopLogo.png" />
            <p className="appHeaderTitle">Local Loop</p>
            </div>
            {/* <MainNav /> */}
        </header>
    )
}

export default AppHeader;