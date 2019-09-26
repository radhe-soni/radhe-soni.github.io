"use strict";
const printItemObj = {
	printItemId:'',
	rate: 0,
	rateUnit: "gram",
	weight: 0,
	weightUnit: "gram",
	purity: 0,
	quantity: 0,
	wastage: 0,
	wastageUnit: "milligram",
	setRate : (value, printItemId) => {
		this.rate = value;
		
	}
}

const getprintItemObjSequence = () => {
	let i = 1;
	return {
		rate:i++,
		weight:i++,
		purity:i++,
		quantity:i++,
		wastage:i++
	}
}
const printItemObjSequence = getprintItemObjSequence();
const printObjs = {}
const unitMultiplier = {
	gram: 1,
	tola: 10,
	milligram: 0.001,
	kilo: 1000
}
function updatePrintObj() {
	const calculatable = this;
	const itemId = calculatable.id;
	printItemObj[itemId] = calculatable.value;
	if (!printItemObj.printItemId) {
		const printItemId = createNewPrintItem(itemId);
		printItemObj.printItemId = printItemId;
	} else {
		const printItemId = printItemObj.printItemId;
		let printItemEle = document.getElementById(itemId+printItemId);
		if(printItemEle){
			printItemEle.innerHTML = calculatable.value;
		}
		else{
			const printItem = printObjs[printItemId];
			const printItemEle = createNewPrintItemEle(itemId, printItemId);
			printItem.appendChild(printItemEle);
			let index = Array.from(printItem.children).indexOf(printItemEle);
			if(printItemObjSequence[itemId] > index){
				while(index && printItemObjSequence[itemId] != index){
					index = moveUp(printItemEle);
				}
			}
			else if(printItemObjSequence[itemId] < index){
				while(index && printItemObjSequence[itemId] != index){
					index=moveDown(printItemEle);
				}
			}
		}
	}
}
function createNewPrintItem(itemId) {
	const printItems = document.getElementById('printItems');
	const printItemsSize = printItems.getElementsByTagName('li').length;
	const printItemId = 'printItem' + printItemsSize;
	const printItem = document.createElement('li');
	printItem.setAttribute('id', printItemId);
	printObjs[printItemId] = printItem;
	printItems.appendChild(printItem);
	const printItemEle = createNewPrintItemEle(itemId, printItemId);
	printItem.appendChild(printItemEle);
	return printItemId;
}
function createNewPrintItemEle(itemId, printItemId){
	const printItemEle = document.createElement('div');
	printItemEle.setAttribute('id', itemId+printItemId);
	printItemEle.setAttribute('style', 'width:16.66%;float:left');
	printItemEle.innerHTML = printItemObj[itemId];
	return printItemEle;
}
function loader(){
	const printable = document.getElementById('printable');
	const printItems = document.createElement('ol');
	printItems.setAttribute('id', 'printItems');
	printable.appendChild(printItems);
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
