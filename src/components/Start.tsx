import { useState  } from "react";
import Login from './Login';
import ProjectList from './ProjectList';


function Start() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [selectedProjectUuid, setSelectedProjectUuid] = useState<string>('');

    function handleLogin() {
        setIsLoggedIn(true);        
    }

    function handleProjectSelection(projectUuid: string) {
        setSelectedProjectUuid(projectUuid);
        console.log('Selected project: ', projectUuid);
    }
        
    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }
    else {
        return <ProjectList onProjectSelection={handleProjectSelection} />;
    }
}

export default Start;