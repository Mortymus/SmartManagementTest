import { useState, useEffect } from 'react';
import { getItems } from '@taghub/api';
import type { Item } from '@taghub/api';

interface Props {
    projectUuid: string | null;
    onItemSelection: (itemEpcString: string | null) => void;
}

function ItemList({ projectUuid, onItemSelection}: Props) {
    
    const [itemsData, setItemsData] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchItems() {
            if (projectUuid) {
                try {
                    setIsLoading(true);
                    const items = await getItems(projectUuid);
                    setItemsData(items);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                throw new Error('Cannot fetch items because projectUuid is null.');
            }
        }
        if (projectUuid) {
            fetchItems();
        }
    }, [projectUuid]);

    return (
        <div className="table-div">
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-th table-td-id">Id</th>
                        <th className="table-th table-td-epc">EPC</th>
                        <th className="table-th table-td-date">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td 
                                className="table-td" colSpan={3}>Loading items...</td>
                        </tr>
                    ) : itemsData.length === 0 ? (
                        <tr>
                            <td className="table-td" colSpan={3}>No available items</td>
                        </tr>
                    ) : (
                        itemsData.map((item) => (
                            <tr 
                                key={item.epcString}
                                onClick={() => onItemSelection(item.epcString)}
                            >
                                <td className="table-td table-td-items table-td-id">{item.id}</td>
                                <td className="table-td table-td-items table-td-epc">{item.epcString}</td>
                                <td className="table-td table-td-items table-td-date">{new Date(item["-4"]).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>                
            </table>   
        </div>
    );
}

export default ItemList;