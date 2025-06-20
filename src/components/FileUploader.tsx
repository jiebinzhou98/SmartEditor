'use client'

import { parseFile, ParsedWorkbook } from "@/lib/parseFile"
import { Input } from "./ui/input"
import React, { useState } from "react"

//parent component will pass a data function, and able to recive the parsed table data
type Props ={
    onData: (workbook: ParsedWorkbook) => void
};

//destructuring onData directly form the props
export function FileUploader({ onData }: Props){
    //store name of the upload file
    const [fileName, setFileName] = useState('');

    //Will trigger when user selected a file
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0];
        if(!file) return;

        //await and run the logic from parseFile.ts
        try{
            const workbook = await parseFile(file);
            //result will passed back to the parent using onData
            onData(workbook);
            setFileName(file.name);
        }catch(err){
            alert('Failed to aprse file: '+ (err as Error).message);
        }
    };
    return (
        <div className="space-y-2">
            <label className="font-medium text-sm">Upload a file (.xlsx, .csv, .txt)</label>
            <Input
                type="file"
                accept=".xlsx, .csv, .txt"
                onChange={handleChange}
                className="curosr-pointer"
            />
            {fileName && <p className="text-sm text-muted-foreground">Uploaded: {fileName}</p>}
        </div>
    )
    
}