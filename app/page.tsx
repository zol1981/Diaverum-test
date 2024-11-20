'use client'

import { useState } from "react";
import { parse } from "./lib/parser";

export default function Home() {
	const [tableHeadData, setTableHeadData] = useState<React.ReactElement>();
	const [tableBodyData, setTableBodyData] = useState<React.ReactElement>();

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.files) {
			const reader = new FileReader();
			reader.readAsText(event.target.files[0]);
			reader.onload = (evt) => {
				if(evt.target) {
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
		}
	}

	return (
		<div className='m-10'>
			<h1 className='mb-10 bg-yellow-400 rounded p-5 text-center w-1/4'>DIAVERUM TEST</h1>
			<input
				className='mb-10 p-5 rounded'
				type="file"
				onChange={handleFileUpload}
			/>
			<table>
				<thead className='bg-yellow-400 text-white'>
					{tableHeadData}
				</thead>
					{tableBodyData}
			</table>
		</div>
	);
}
