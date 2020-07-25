import React, {Component} from 'react';
import styles from './table.css';

const TableHeader = (props) => {
	return (
		<thead>
			<tr>
				<th onClick={e => props.onSort(e,'id')}>ID {props.sortKey === 'id' ? <small>{props.sort}</small>:null}</th>
				<th onClick={e => props.onSort(e,'firstName')} >First Name {props.sortKey === 'firstName' ? <small>{props.sort}</small>:null}</th>
				<th onClick={e => props.onSort(e,'lastName')} >Last Name {props.sortKey === 'lastName' ? <small>{props.sort}</small>:null}</th>
				<th onClick={e => props.onSort(e,'email')}>E-mail {props.sortKey === 'email' ? <small>{props.sort}</small>:null}</th>
				<th onClick={e => props.onSort(e,'phone')}>Phone {props.sortKey === 'phone' ? <small>{props.sort}</small>:null}</th>
			</tr>
		</thead>
	)
}



const TableBody = (props) => {
	
	if (props.characterData != null) {
		let rows = []
		{/*props.characterData.map(item =>(
		console.log(item.id)))*/}
			for (let person of props.characterData){
				rows.push(<tr onClick={props.showCharacter.bind(null, person)} key={person.id+person.phone}>
					<td> {person.id}</td>
					<td> {person.firstName}</td>
					<td> {person.lastName}</td>
					<td> {person.email}</td>
					<td> {person.phone}</td>
				</tr>)
			}
		
	
	
	return <tbody>{rows}</tbody>}
	else { 
	console.log('nothing to show!')
	return <tbody></tbody>}
}




const columns = [
  { key: "id", header: "ID", width: 50 },
  { key: "firstName", header: "First", width: 120 },
  { key: "lastName", header: "Last", width: 120 },
  { key: "email", header: "Email", width: 250 },
  { key: "phone", header: "Last", width: 220 },
  { key: "address", header: "Last", width: 220 },
  { key: "description", header: "Last", width: 420 }
];



const Table = (props) => {

		const {characterData, onSort, showCharacter, sort, sortKey} = props;
		
		if (props.characterData != null) {
			
		}
		else {console.log('пусто!')}
		return(
			<table className="fl-table">
				<TableHeader onSort = {onSort} sort = {sort} sortKey = {sortKey} />
				<TableBody characterData = {characterData} showCharacter ={showCharacter}/>
			</table>
				
				
			
			
		)
	}


export default Table