import { useState, useEffect} from 'react';
import { getEvents } from '@taghub/api';
import type { ItemEvent } from '@taghub/api';

interface Props {
    projectUuid: string | null;
    itemEpcString: string | null;
}

function EventList({ projectUuid, itemEpcString }: Props) {
    const [itemEventsData, setItemEventsData] = useState<ItemEvent[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            if (projectUuid && itemEpcString) {
                try {
                    const events = await getEvents(projectUuid, itemEpcString);
                    setItemEventsData(events);
                    console.log('Events: ', events);
                } catch (error) {
                    console.error(error);
                }
            } else {
                throw new Error('Cannot fetch events because projectUuid or itemEpcString is null.');
            }
        }
        if (projectUuid && itemEpcString) {
            fetchEvents();
        }
    }, [projectUuid, itemEpcString]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>EPC</td>
                        <td>Service name</td>
                    </tr>
                </thead>
                <tbody>
                    {itemEventsData.length === 0 ? (
                        <tr>
                            <td colSpan={3}>No available events</td>
                        </tr>
                    ) : (
                        itemEventsData.map((itemEvent) => (                            
                            <tr key={`${itemEvent.epc}-${itemEvent.id}`}>
                                <td>{itemEvent.id}</td>
                                <td>{itemEvent.epc}</td>
                                <td>{itemEvent.service.name}</td>
                            </tr>                          
                        ))
                    )}
                </tbody>                
            </table>   
        </>
    );


}

export default EventList;