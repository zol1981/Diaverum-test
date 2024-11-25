'use client'

import { useState } from "react";
import { parse } from "./lib/parser";

export default function Home() {
	const [tableHeadData, setTableHeadData] = useState<React.ReactElement>();
	const [tableBodyData, setTableBodyData] = useState<React.ReactElement>();
	const [fileName, setFileName] = useState<string>();

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.files) {
			if(event.target.files[0].type == 'text/plain') {
				setFileName('Selected file: ' + event.target.files[0].name);
				const reader = new FileReader();
				reader.readAsText(event.target.files[0]);
				reader.onload = (evt) => {
					if(evt.target) {
						//console.log(evt.target.result);
						const [keys, db] = parse(evt.target.result);
						setTableHeadData(
							<tr>
								{keys.map((value: any, index: number) => <td key={index} className='p-5'>{value}</td>)}
							</tr>
						);
						setTableBodyData(
							<tbody>
								{db.map((value: any, index: number) => (
									<tr key={index} className={index % 2 ? 'bg-slate-200' : 'bg-white'}>
										{keys.map((v: any, i: number) => <td key={i} className='p-5'>{value[v]}</td>)}
									</tr>
								))}
							</tbody>
						)
					};
				}
			} else {
				setFileName('Wrong file type, select file with .txt extension!');
			}	
		}
	}

	return (
		<div className='m-10' lang='en'>
			<h1 className='mb-10 bg-yellow-400 rounded p-5 text-center w-1/4 min-w-40'>DIAVERUM TEST</h1>
			<div className='flex flex-row'>
				<div className='bg-yellow-400 rounded w-40 h-8 mb-10'>
					<input
						className='opacity-0 w-40 h-8 absolute'
						type='file'
						accept='text/plain'
						onChange={handleFileUpload}
					/>
					<p className='text-center text-base pt-1'>Browse file</p>
				</div>
				<div className='ml-2'>
					<p className='pt-1'>{fileName}</p>
				</div>
			</div>
			<table>
				<thead className='bg-yellow-400 text-white'>
					{tableHeadData}
				</thead>
				{tableBodyData}
			</table>
		</div>
	);
}
