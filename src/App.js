import React from 'react';
import logo from './logo.svg';
import './App.css';
import Load from './load.js'
import Table from './Table.js'
import Loader from './Loader/Loader.js';
import PersonInfo from './PersonInfo/PersonInfo.js'
import ArraySelected from './ArraySelected/ArraySelected.js'

class App extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			data:null,
			isLoading:false,
			isArraySelected:false,
			sort : 'desc',
			sortKey:'null',
			index :null,
		};
		
		this.ppp = [];
		this.sorted = 	{'id':false,
						'firstName':false,
						'lastName':false,
						'email':false,
						'phone':false,
						'address.streetAddress':false,
						'address.city':false,
						'address.state':false,
						'address.zip':false,
						'description':false,
						};
	}
	
	
	async loadData(url) {
		const response = await fetch(url)
		const data = await response.json()
		this.setState({
			isLoading:false,
			data : data
		})
	}
  
		
	onSort = (event, sortKey) =>{
		const isSorted = this.sorted[sortKey];
		if (!isSorted) {
			for (let item of Object.keys(this.sorted)){
				this.sorted[item] = false;
			}			
		}
		let direction = isSorted ? -1 : 1;
		const sortType = direction === 1 ? 'asc' : 'desc';		
		const dataSort = this.state.data;
		
		dataSort.sort((a,b) => {
			return a[sortKey] > b[sortKey] ? direction: direction * -1;
		})
			  this.setState({data : dataSort,
							sort: sortType,
							sortKey : sortKey
							})
			  this.sorted[sortKey] = !isSorted;
	}	
	
	showCharacter = (index) => {
		this.setState({index})		
	}
	
	
	chooseArray = (config) => {
		this.setState({
			isArraySelected : true,
			isLoading : true,
		})
		this.loadData(config);
	}
  
  render(){
		
		const people = this.state.data
		if (!this.state.isArraySelected)
			return (<ArraySelected chooseArray={this.chooseArray} />)
		
		
		return(
		
		<div className="container">
		{
			
		}
		{
			this.state.isLoading
			? <Loader />
			: <Table characterData = {people} onSort = {this.onSort} showCharacter={this.showCharacter} sort = {this.state.sort} sortKey = {this.state.sortKey} />
				
		}
		{this.state.index ? <PersonInfo person = {this.state.index} /> : null}
		</div>
		
		)
	}	
}

export default App;



