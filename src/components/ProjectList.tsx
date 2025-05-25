import { useState, useEffect} from 'react';
import { getProjects } from '@taghub/api';
import type { Project } from '@taghub/api';

interface Props {
    onProjectSelection: (projectUuid: string) => void;
}

function ProjectList({ onProjectSelection }: Props) {

    const [projectsData, setProjectsData] = useState<Project[]>([]);
    const [selectedProjectUuid, setSelectedProjectUuid] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchProjects() {
            try {
                setIsLoading(true);
                const projects = await getProjects();            
                setProjectsData(projects);
                if (projects.length > 0) {
                    onProjectSelection(projects[0].uuid);
                    setSelectedProjectUuid(projects[0].uuid);
                }
                console.log(projects);
                console.log(projects[0]);
                console.log(projects[0].id);
            } catch (error) {
                console.error("Error loading projects: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProjects();
    }, []);

    function handleSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        onProjectSelection(event.target.value);
        setSelectedProjectUuid(event.target.value); 
    }

    return (
        <>
            <select 
                onChange={handleSelection} 
                value={selectedProjectUuid} 
                disabled={projectsData.length === 0}
                className="select-project"
            >
                {isLoading ? (
                    <option value="">Loading projects...</option>
                ) : projectsData.length === 0 ? (
                    <option value="">No available projects</option>
                ) : (
                projectsData.map((project) => (<option key={project.uuid} value={project.uuid}>Project {project.id}</option>)))}
            </select>
        </>
    );
    
}

export default ProjectList;