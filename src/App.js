import React from 'react';
import logo from './logo.svg';
import './App.css';
import Load from './load.js'
import Table from './Table.js'
import Loader from './Loader/Loader.js';
import PersonInfo from './PersonInfo/PersonInfo.js'
import ArraySelected from './ArraySelected/ArraySelected.js'
import array32 from './array32.json'
import ReactPaginate from 'react-paginate'
import _ from 'lodash';
import SearchBar from './Search/search.js'
import AddingPerson from './AddingPerson/addingPerson.js'

class App extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			data:[],
			isLoading:false,
			isArraySelected:false,
			sort : 'desc',
			sortKey:'id',
			index :null,
			currentPage:0,
			search :'',
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
		// const response = await fetch(url)
		// const data = await response.json()
		// const data = array32;
		// console.log(data);
		
		
		const data = await fetch(url)
		.then((response) => response.json())
		.catch(err => alert("Сервер недоступен.")) 
		// .catch(err => alert("Сервер недоступен.")) 
		// if (data.status >= 300) {
			// throw new Error('Ответ сети был не ok.');
		  // }
		// .then(res => {
		  // if (res.status >= 300) { // error http status code range
			// throw new Error(res.status) // throw a error to the catch block
		  // }
		  // return res.json();
		// })
		// .catch(err => {
		  // throw new Error(err) // catch and throw to the error of previous `.then` block
		// })
		
		await this.setState({
			isLoading:false,
			data : data
		})
		await this.onSort(null,'id');
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
	
	pageChange = ({selected}) => (
		this.setState({currentPage : selected})
	)
	
	getParsedData(){		
		const {data, search} = this.state;
		if (!search) {
		  return data
		}
		
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
		return temp_value
	}
	
	onSearch = search => {
		this.setState({search,currentPage : 0})
	}
	
	setNewPerson = personality => {
		this.setState({data : [personality,...this.state.data]});
			// console.log(personality);
			//setNewPerson = {this.setNewPerson}
	}
	
  render(){
		if (!this.state.isArraySelected)
			return (<ArraySelected chooseArray={this.chooseArray} />)
		
		const people = this.state.data;
		const pageSize = 50;
		
		const parseData = this.getParsedData();
		const pageCount = Math.ceil(parseData.length / pageSize);
		const selectedData = _.chunk(parseData,pageSize)[this.state.currentPage];
		
		
		return(
		
		<div className="container">
		{
			
		}
		{
			!this.state.isLoading?
			<SearchBar onSearch = {this.onSearch} />
			:null
		}
		{
			!this.state.isLoading
			?	<AddingPerson setNewPerson = {this.setNewPerson} />
			:null
		}		
		{
			!this.state.isLoading?
			this.state.data.length > pageSize
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
		{
			this.state.isLoading
			? <Loader />
			: <React.Fragment>
			<Table characterData = {selectedData} onSort = {this.onSort} showCharacter={this.showCharacter} sort = {this.state.sort} sortKey = {this.state.sortKey} />
			</React.Fragment>		
		}
		
		
		
		{this.state.index ? <PersonInfo person = {this.state.index} /> : null}
		</div>
		
		)
	}	
}

export default App;



