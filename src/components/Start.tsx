import { useState  } from "react";
import Login from './Login';
import Header from './Header';
import ProjectList from './ProjectList';
import ItemList from './ItemList';
import EventList from './EventList';


function Start() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [activeHeadline, setActiveHeadline] = useState<string>('');
    const [selectedProjectUuid, setSelectedProjectUuid] = useState<string | null>(null);
    const [selectedItemEpcString, setSelectedItemEpcString] = useState<string | null>(null);
    const [showItemEvents, setShowItemEvents] = useState<boolean>(false);

    function handleLogin() {
        setIsLoggedIn(true);       
    }

    function handleProjectSelection(projectUuid: string | null) {
        setSelectedProjectUuid(projectUuid);
        setActiveHeadline('Items');
        setSelectedItemEpcString(null);
        setShowItemEvents(false);
        console.log('Selected project: ', projectUuid);
    }

    function handleItemSelection(itemEpcString: string | null) {
        setSelectedItemEpcString(itemEpcString);
        setActiveHeadline('Events');
        setShowItemEvents(true);
        console.log('project uuid: ', selectedProjectUuid);
        console.log('Setting epcString for item selection = ', itemEpcString);
    }
        
    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    } else {
        return (
            <div className="app-div">
                <Header headline={activeHeadline} />
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
            </div>
        );}
}

export default Start;