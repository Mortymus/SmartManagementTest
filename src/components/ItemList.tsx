import { useState, useEffect } from 'react';
import { getItems } from '@taghub/api';
import type { Item } from '@taghub/api';

interface Props {
    projectUuid: string | null;
    onItemSelection: (itemEpcString: string | null) => void;
}

function ItemList({ projectUuid, onItemSelection}: Props) {
    
    const [itemsData, setItemsData] = useState<Item[]>([]);

    useEffect(() => {
        async function fetchItems() {
            if (projectUuid) {
                try {
                    const items = await getItems(projectUuid);
                    setItemsData(items);
                    console.log('Items coming: ', items);
                    console.log('Checking "-4" type: ', typeof(items[0]["-4"]))
                } catch (error) {
                    console.error(error);
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
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>EPC</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    {itemsData.length === 0 ? (
                        <tr>
                            <td colSpan={3}>No available items</td>
                        </tr>
                    ) : (
                        itemsData.map((item) => (
                            <tr 
                                key={item.id}
                                onClick={() => onItemSelection(item.epcString)}
                            >
                                <td>{item.id}</td>
                                <td>{item.epcString}</td>
                                <td>{new Date(item["-4"]).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>                
            </table>   
        </>
    );
}

export default ItemList;