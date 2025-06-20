import * as XLSX from 'xlsx'
import Papa from 'papaparse'

//use library to read the .xlsx, .csv, .txt,  and return as string [][](2D array)
export async function parseFile(file: File): Promise<string[][]>{

    //split the file name, and get extension => converts to lowercase
    const extension = file.name.split('.').pop()?.toLowerCase();

    
    return new Promise((resolve, reject) => {

        //create new file reader
        const reader = new FileReader();

        //when file is load
        reader.onload = (e) =>{
            //result will be file content
            const result = e.target?.result;
            if(!result) return reject ('No file content');

            try{
                //base on extension, for excel
                if(extension === 'xlsx'){
                    //read file as binary
                    const workbook = XLSX.read(result, {type: 'binary'});
                    //load first sheet in the excel file
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    //convert to 2D array
                    const data = XLSX.utils.sheet_to_json(sheet, {header:1}) as string[][];
                    resolve(data)
                    //for csv file
                }else if (extension === 'csv'){
                    //use the library PapaParse to parse the csv string
                    const parsed = Papa.parse(result as string, {skipEmptyLines: true});
                    //return 2D array and ignores blank rows
                    resolve(parsed.data as string[][]);
                    //for txt file
                }else if (extension === 'txt'){
                    const text = result as string;
                    //assume the file is tab-separated(TSV format)
                    //splits line by \n,  splits each line by tab \t
                    const rows = text.split('\n').map((line) => line.split('\t'));
                    resolve(rows)
                }else{
                    //if the file is not one of the extension above, return err
                    reject('Unsupported file type');
                }
            }catch (err){
                reject(err);
            }
        };
        //choose how to read the file 
        if (extension === 'xlsx'){
            //excel need binary string format for sheetJS 
            reader.readAsBinaryString(file);
        }else{
            //others files read as plain text
            reader.readAsText(file);
        }
    });
}