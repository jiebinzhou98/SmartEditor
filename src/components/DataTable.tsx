'use client'

type Props = {
    //data table content is in 2D array
    data: string [][];
    //function from parent component (update table when users type in a cell)
    setData: (data: string [][]) => void;
};

//define react components and use props (data, setData)
export function DataTable ({data, setData}: Props){

    //clones the data array and to avoid directly mutating(变种) state
    const handleChange = (row: number, col: number, value: string) =>{
        //update correct row and column with new value
        const updated = [...data];
        if(!updated [row]) updated[row] = [];
        updated[row][col] = value;
        //setData is to update the parents'state
        setData(updated);
    };

    return(
        <div className="overflow-auto border rounded">
            <table className="w-full border-collapse text-sm">
                <tbody>
                    {/* give us row  */}
                    {data.map((row,rowIndex) => (
                        <tr key={rowIndex} className="even:bg-gray-50">
                            {/* gives each table cell */}
                            {row.map((cell, colIndex) =>(
                                <td key={colIndex} className="border p-1">
                                    <input
                                        className="w-full px-1 bg-transparent outline-none"
                                        value={cell}
                                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    )
}