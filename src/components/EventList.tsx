import { useState, useEffect} from 'react';
import { getEvents } from '@taghub/api';
import type { ItemEvent } from '@taghub/api';

interface Props {
    projectUuid: string | null;
    itemEpcString: string | null;
}

function EventList({ projectUuid, itemEpcString }: Props) {
    const [itemEventsData, setItemEventsData] = useState<ItemEvent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchEvents() {
            if (projectUuid && itemEpcString) {
                try {
                    setIsLoading(true);
                    const events = await getEvents(projectUuid, itemEpcString);
                    setItemEventsData(events);
                    console.log('Events: ', events);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
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
            <table className="table table-events">
                <thead>
                    <tr>
                        <th className="table-th">Id</th>
                        <th className="table-th">EPC</th>
                        <th className="table-th">Service name</th>
                    </tr>
                </thead>
                <tbody>
                    { isLoading ? (
                        <tr>
                            <td colSpan={3}  className="table-td">Loading events...</td>
                        </tr>
                    ) : itemEventsData.length === 0 ? (
                        <tr>
                            <td colSpan={3}  className="table-td">No available events</td>
                        </tr>
                    ) : (
                        itemEventsData.map((itemEvent) => (                            
                            <tr key={`${itemEvent.epc}-${itemEvent.id}`}>
                                <td className="table-td">{itemEvent.id}</td>
                                <td className="table-td">{itemEvent.epc}</td>
                                <td className="table-td">{itemEvent.service.name}</td>
                            </tr>                          
                        ))
                    )}
                </tbody>                
            </table>   
        </>
    );


}

export default EventList;