'use client'

import { useState } from "react"
import { DataTable } from "@/components/DataTable"
import {FileUploader} from "@/components/FileUploader"
import type { ParsedWorkbook } from "@/lib/parseFile"

export default function UploadPage(){
    const [workbook, setWorkbook] = useState<ParsedWorkbook | null>(null)
    const [selectedSheet, setSelectedSheet] = useState<string | null>(null)
    const [data, setData] = useState<string[][] | null>(null);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Import & Edit File</h1>
            <FileUploader onData={(wb) => {
                setWorkbook(wb);
                setSelectedSheet(wb.sheetNames[0]);
            }}
            />

            {workbook && workbook.sheetNames.length > 1 &&(
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Select Sheet</label>
                    <select
                        value={selectedSheet ?? ''}
                        onChange={(e) =>setSelectedSheet(e.target.value)}
                        className="border p-1 rounded text-sm"
                    >
                        {workbook.sheetNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
            )}

            {workbook && selectedSheet && (
                <DataTable
                    data={workbook.sheets[selectedSheet]}
                    setData={(updated) => {
                        if (!workbook || !selectedSheet) return;
                        setWorkbook({
                            ...workbook,
                            sheets:{
                                ...workbook.sheets,
                                [selectedSheet]: updated,
                            }
                        })
                    }}
                />
            )}
        </div>
    )
}