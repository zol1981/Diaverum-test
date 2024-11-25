export const parse = (txt: any) => {
	let comment: boolean = false;
	let i: number = 0;
	let word: string = '';
	let firstRow: boolean = true;
	let recordCounter: number = 0;
	let testObject: any = {};
	const keys: string[] = [];
	const db: any = [];

	while(i < txt.length) {
		if(txt.charAt(i) == '#') {
			comment = true;
		}
		if(comment) {
			if(txt.charAt(i) == '\n') {
				comment = false;
			}
		} else {
			if(firstRow) {
				if(txt.charAt(i) != '|' && txt.charAt(i) != '\n' && txt.charAt(i) != '\r') {
					word += txt.charAt(i);
				} else {
					if(word != '') keys.push(word);
					word = '';
					if(txt.charAt(i) == '\n') firstRow = false;
				}
			} else {
				if(txt.charAt(i) != '|' && txt.charAt(i) != '\n' && txt.charAt(i) != '\r') {
					word += txt.charAt(i);
				} else {
					if(recordCounter < keys.length) testObject[keys[recordCounter]] = word;
					else testObject[keys[keys.length - 1]] += word;
					word = '';
					if(txt.charAt(i) == '\n') {
						db.push(testObject);
						testObject = {};
						recordCounter = 0;
					} else {
						recordCounter ++;
					}

				}
				if(i == txt.length - 1) {
					if(recordCounter < keys.length) testObject[keys[recordCounter]] = word;
					else testObject[keys[keys.length - 1]] += word;
					db.push(testObject);
				}
			}
		}
		i++;
	}

	//console.log(db);
	return([keys, db]);
}



