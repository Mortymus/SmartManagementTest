import { useState  } from "react";
import Login from './Login';
import Header from './Header';
import ProjectList from './ProjectList';
import ItemList from './ItemList';
import EventList from './EventList';


function Start() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [selectedProjectUuid, setSelectedProjectUuid] = useState<string | null>(null);
    const [selectedItemEpcString, setSelectedItemEpcString] = useState<string | null>(null);
    const [showItemEvents, setShowItemEvents] = useState<boolean>(false);

    function handleLogin() {
        setIsLoggedIn(true);       
    }

    function handleProjectSelection(projectUuid: string | null) {
        setSelectedProjectUuid(projectUuid);
        setSelectedItemEpcString(null);
        setShowItemEvents(false);
    }

    function handleItemSelection(itemEpcString: string | null) {
        setSelectedItemEpcString(itemEpcString);
        setShowItemEvents(true);
    }

    function handleItemsButtonClick() {
        setShowItemEvents(false);
    }

    function handleLogOutButtonClick() {
        setIsLoggedIn(false);
    }
        
    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    } else {
        return (
            <>              
                    <Header 
                        showEvents={showItemEvents}
                        onItemsButtonClick={handleItemsButtonClick}
                        onLogOutButtonClick={handleLogOutButtonClick} 
                    />
                    <ProjectList 
                        onProjectSelection={handleProjectSelection} 
                    />
                    {!showItemEvents ? (
                        <ItemList 
                            projectUuid={selectedProjectUuid} 
                            onItemSelection={handleItemSelection} 
                        />
                    ) : (
                        <EventList 
                            projectUuid={selectedProjectUuid}
                            itemEpcString={selectedItemEpcString}
                        />
                    )
                    }            
            </>
        );}
}

export default Start;