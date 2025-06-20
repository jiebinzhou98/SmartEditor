'use client'

import { useState } from "react"
import { DataTable } from "@/components/DataTable"
import {FileUploader} from "@/components/FileUploader"

export default function UploadPage(){
    const [data, setData] = useState<string[][] | null>(null);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Import & Edit File</h1>
            <FileUploader onData={setData}/>
            {data && <DataTable data={data} setData={setData}/>}
        </div>
    )
}