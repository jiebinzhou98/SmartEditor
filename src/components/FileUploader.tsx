'use client'

import { parseFile } from "@/lib/parseFile"
import { Input } from "./ui/input"
import React, { useState } from "react"

type Props ={
    onData: (data: string[][]) => void
};

export function FileUploader({ onData }: Props){
    const [fileName, setFileName] = useState('');

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0];
        if(!file) return;

        try{
            const data = await parseFile(file);
            onData(data);
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