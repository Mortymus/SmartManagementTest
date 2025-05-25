interface Props {
    showEvents: boolean;
    onItemsButtonClick: () => void;
    onLogOutButtonClick: () => void;
 }

function Header({ showEvents, onItemsButtonClick, onLogOutButtonClick }: Props) {

    return (
        <header className="app-header">
            <h1 className="app-header-h1">Taghub file explorer</h1>
            <div className="app-header-btn-div">
                <div>
                    <button 
                        className="app-header-btn"
                        onClick={onItemsButtonClick}
                    >
                        Items
                    </button>
                    {showEvents ? <button className="app-header-btn">\Events</button> : null}
                </div>
                <button 
                    className="app-header-btn log-out-btn"
                    onClick={onLogOutButtonClick}
                >
                    Log out
                </button>
            </div>
        </header>
    );
}

export default Header;