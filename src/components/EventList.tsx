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
        <div className="table-div">
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-th table-td-id">Id</th>
                        <th className="table-th table-td-epc">EPC</th>
                        <th className="table-th  table-td-service-name">Service name</th>
                        <th className="table-th table-td-user">User</th>
                        <th className="table-th table-td-user-timestamp">User timestamp</th>
                        <th className="table-th table-td-value">Value</th>
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
                                <td className="table-td table-td-id">{itemEvent.id}</td>
                                <td className="table-td table-td-epc">{itemEvent.epc}</td>
                                <td className="table-td table-td-service-name">{itemEvent.service.name}</td>
                                <td className="table-td table-td-user">{itemEvent.user}</td>
                                <td className="table-td table-td-user-timestamp">{itemEvent.userTimestamp}</td>
                                {!Array.isArray(itemEvent.value) && typeof itemEvent.value != 'object' ? (
                                    <td className="table-td table-td-value">{itemEvent.value}</td>
                                ) : (
                                    <td className="table-td table-td-value">N/A</td>
                                )}
                            </tr>                          
                        ))
                    )}
                </tbody>                
            </table>   
        </div>
    );
}

export default EventList;