"use strict";
const printItemObj = {
	rate: 0,
	rateUnit: "gram",
	weight: 0,
	weightUnit: "gram",
	purity: 0,
	quantity: 0,
	wastage: 0,
	wastageUnit: "milligram",
}
const printItemObjs = [];
const getprintItemObjSequence = () => {
	let i = 0;
	return {
		rate:i++,
		weight:i++,
		purity:i++,
		quantity:i++,
		wastage:i++
	}
}
const printItemObjSequence = getprintItemObjSequence();
const cells = {}
const printColumns ={
		sno:'',
		name:'',
		rate:'',
		weight:'',
		purity:'',
		quatity:'',
		wastage:'',
		total:''
		
}
const unitMultiplier = {
	gram: 1,
	tola: 10,
	milligram: 0.001,
	kilo: 1000
}
function updatePrintObj() {
	const calculatable = this;
	const itemId = calculatable.id;
	if(printItemObj[itemId]==0){
		printItemObj[itemId] = calculatable.value;
		const index = createNewPrintItem(itemId);
		printItemObj.index = index;
	}
	else{
		const cellId = itemId + 'cell' + printItemObj.index;
		updatePrintItem(itemId, cellId);
	}
}
function createNewPrintItem(itemId) {
	const columnValues = printColumns[itemId];
	const index = columnValues.getElementsByTagName('li').length;
	const cellId = itemId + 'cell' + index;
	const cell = document.createElement('li');
	cell.setAttribute('id', cellId);
	cells[cellId] = cell;
	cell.innerHTML = printItemObj[itemId];
	columnValues.appendChild(cell);
	return index;
}
function createNewPrintItemEle(itemId, cellId){
	const printItemEle = document.createElement('div');
	printItemEle.setAttribute('id', itemId+cellId);
	printItemEle.setAttribute('style', 'width:16.66%;float:left');
	printItemEle.innerHTML = printItemObj[itemId];
	return printItemEle;
}

function updatePrintItem(itemId, cellId){
	const cell = cells[cellId];
	cell.innerHTML = printItemObj[itemId];
}

function loader(){
	const printable = document.getElementById('printable');
	Object.entries(printColumns).forEach(name => {
		const column =  document.createElement('div');
		column.setAttribute('style', 'width:12.5%;float:left');
		printable.appendChild(column);
		const columnValues = document.createElement('ul');
		printColumns[name[0]] = columnValues;
		column.appendChild(columnValues);
		columnValues.style = 'list-style-type: none;';
		const columnName = document.createElement('li');
		columnName.innerHTML = name[0];
		columnValues.appendChild(columnName);
	});
	addListeners();
}
function addListeners() {
	var calculatables = document.getElementsByClassName('calculatable');
	for (var i = 0; i < calculatables.length; i++) {
		calculatables[i].addEventListener('input', updatePrintObj);
	}
}
function moveUp(element) {
	console.log("moving element up");
  if(element.previousElementSibling)
    element.parentNode.insertBefore(element, element.previousElementSibling);
  return Array.from(element.parentNode.children).indexOf(element);
}
function moveDown(element) {
	console.log("moving element down");
  if(element.nextElementSibling)
    element.parentNode.insertBefore(element.nextElementSibling, element);
  return Array.from(element.parentNode.children).indexOf(element);
}

