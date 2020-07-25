import React from 'react'
import styles from './arrayStyle.css'

export default props => {
	const array32 = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
	const array1000 = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
	return (
		<div className = 'buttonHolderStyle'>
			<button onClick={()=> props.chooseArray(array32)} className = "buttonStyle">Маленький массив</button>
			<button onClick={()=> props.chooseArray(array1000)} className = "buttonStyle">Большой массив</button>			
		</div>
	)
}