export function chunkArray(myArray: Array<any>, chunkSize: number, exception?: number[]) {
	const arrayLength = myArray.length;
	const tempArray = [];
	let myChunk = [];
	for (let index = 0; index < arrayLength; index += chunkSize) {
		if (exception?.length && exception.includes(index + 1)) {
			myChunk = myArray.slice(index, index + 1);
			index -= chunkSize;
			index += 1;
		} else {
			myChunk = myArray.slice(index, index + chunkSize);
		}
		// Do something if you want with the group
		tempArray.push(myChunk);
	}

	return tempArray;
}
