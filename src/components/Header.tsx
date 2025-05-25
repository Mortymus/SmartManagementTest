interface Props {
    showEvents: boolean;
    onItemsButtonClick: () => void;
}

function Header({ showEvents, onItemsButtonClick }: Props) {
    return (
        <header className="app-header">
            <h1 className="app-header-h1">Taghub file explorer</h1>
            <button 
                className="app-header-button"
                onClick={onItemsButtonClick}
            >
                Items
            </button>
            {showEvents ? 
                <button className="app-header-button">\Events</button> : null}
        </header>
    );
}

export default Header;