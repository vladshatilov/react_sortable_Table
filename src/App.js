import React from 'react';
import './App.css';

import Table from './Table.js'
import Loader from './Loader/Loader.js';
import PersonInfo from './PersonInfo/PersonInfo.js'
import ArraySelected from './ArraySelected/ArraySelected.js'
import ReactPaginate from 'react-paginate'
		//most comfortable way to chunk massive is to use lodash
import _ from 'lodash';
import SearchBar from './Search/search.js'
import AddingPerson from './AddingPerson/addingPerson.js'
import ChoosePageSize from './ChoosePageSize/choosePageSize.js'

		//server was inreachable sometimes, so i was performing synthetic tests
import array32 from './array32.json'
import array1000 from './array1000.json'

class App extends React.Component{
			//initialisation all base components
	constructor(props){
		super(props);
		this.state = {
			data:[],
			isLoading:false,
			isArraySelected:false,
			sort : 'desc',
			sortKey:'null',
			index :null,
			currentPage:0,
			pageSize:50,
			search :'',
		};
		
				//to provide only Ascending sort on first click
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
	
			//Async loading data; updating state and stop showing loader; Or catch error and show user that
	async loadData(url) {
		
		
		
		const data = (url === 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
		? array32
		: array1000
		console.log(data);
		
		
		// const data = await fetch(url)
		// .then((response) => response.json())
		// .catch(err => alert("Сервер недоступен.")) 
				
		
		// const response = await fetch(url)
		// const data = await response.json()		
		
		this.setState({
			isLoading:false,
			data : data
		})
		// this.onSort(null,'id');
	}
  
			//Perform Sorting through the key from Table.js
	onSort = (event, sortKey) =>{
		
		console.log(this.state.data);
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
	
	
			//Assign user index on table's row click to show user's info under the table  in PersonInfo module
	showCharacter = (index) => {
		this.setState({index})
	}
	
			//Letting user choose the size of array and build html structure inside ArraySelected.js
	chooseArray = (config) => {
		this.setState({
			isArraySelected : true,
			isLoading : true,
		})
		this.loadData(config);
	}
	
			//We are using ready-made ReactPaginate module to perform pagination(don't have to invent a bike).
			//Updating page number in state
	pageChange = ({selected}) => (
		this.setState({currentPage : selected})
	)
	
			//Perform a search in the data and transform the source data to the displayed data
	getParsedData(){		
		const {data, search} = this.state;
		if (!search) {
		  return data
		}
		console.log(data);
		let temp_value = data.filter(item => {
			console.log(typeof item['id']);
			return (
				item["id"].toString().includes(search.toString()) ||
				item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
				item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
				item["email"].toLowerCase().includes(search.toLowerCase()) ||
				item["phone"].toString().includes(search.toString())
			);
		});
				
		// let temp_value = data.map(item => {
			// // let ch_item = item;
			
			// if (
				// item["id"].toString().includes(search.toString()) ||
				// item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
				// item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
				// item["email"].toLowerCase().includes(search.toLowerCase()) ||
				// item["phone"].toString().includes(search.toString())
			// ){
				// let pattern = '(' + search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ')';
				// console.log(pattern);
				// let ch_name = item["firstName"].replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>');
				// item["firstName"] = ch_name;
				// console.log(ch_name);
				// return item;
			// }
		// });
		
		// temp_value = temp_value.filter(item => {
			
			// return (
				// typeof item !== "undefined"				
			// );
		// });
		// console.log(temp_value);
		return temp_value
	}
	
			//Updating current page to perform clean searching and passing search keyword through the search.js module
	onSearch = search => {
		this.setState({search,currentPage : 0})
	}
	
	handleChangePageSize = (value) => {
		this.setState({pageSize:value})
	}
	
			//Adding new person to the data through addingPerson.js module
	setNewPerson = personality => {
		this.setState({data : [personality,...this.state.data]});
	}
	
  render(){
				{/*Show buttons to let user choose array size */}
		if (!this.state.isArraySelected)
			return (<ArraySelected chooseArray={this.chooseArray} />)
		
		
		const pageSize = 50;		
		const parseData = this.getParsedData();
		const pageCount = Math.ceil(parseData.length / this.state.pageSize);
		const selectedData = _.chunk(parseData,this.state.pageSize)[this.state.currentPage];
		
		
		return(
		
		<div className="container">
		{
			
		}
				{/*Search bar to appear only after loading */}
		{
			!this.state.isLoading?
			<SearchBar onSearch = {this.onSearch} />
			:null
		}
				{/*Form to add new person */}
		{
			!this.state.isLoading
			?	<AddingPerson setNewPerson = {this.setNewPerson} />
			:null
		}		
		
		
		{ !this.state.isLoading
			?	<ChoosePageSize value={this.state.pageSize} handleChangePageSize={this.handleChangePageSize} />
			:null}
		
				{/*Show paginate module only if the size if bigget than pageSize(==50)*/}
		{
			!this.state.isLoading?
			this.state.data.length > this.state.pageSize
			? <ReactPaginate
				previousLabel={'<'}
				nextLabel={'>'}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={pageCount}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				onPageChange={this.pageChange}
				containerClassName={'pagination'}
				activeClassName={'active'}
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				nextClassName="page-item"
				previousLinkClassName="page-link"
				nextLinkClassName="page-link"
				currPage={this.state.currentPage}
			/> : null
			:null
		}
				{/*Loading screen and main table then */}
		{
			this.state.isLoading
			? <Loader />
			: <React.Fragment>
			<Table characterData = {selectedData} onSort = {this.onSort} showCharacter={this.showCharacter} sort = {this.state.sort} sortKey = {this.state.sortKey} />
			</React.Fragment>		
		}
				
				{/*Detailed information about a person by the clicked table's row  */}
		{this.state.index ? <PersonInfo person = {this.state.index} /> : null}
		</div>
		
		)
	}	
}

export default App;



