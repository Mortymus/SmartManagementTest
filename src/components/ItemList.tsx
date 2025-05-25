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
                    console.log('Items coming: ', items);
                    console.log('Checking "-4" type: ', typeof(items[0]["-4"]))
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
        <>
            <table className="table table-items">
                <thead>
                    <tr>
                        <th className="table-th">Id</th>
                        <th className="table-th">EPC</th>
                        <th className="table-th">Date</th>
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
                            <td 
                                className="table-td" colSpan={3}>No available items</td>
                        </tr>
                    ) : (
                        itemsData.map((item) => (
                            <tr 
                                key={item.epcString}
                                onClick={() => onItemSelection(item.epcString)}
                            >
                                <td className="table-td table-td-items">{item.id}</td>
                                <td className="table-td table-td-items">{item.epcString}</td>
                                <td className="table-td table-td-items">{new Date(item["-4"]).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>                
            </table>   
        </>
    );
}

export default ItemList;