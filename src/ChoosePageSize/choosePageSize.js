import React from 'react'

export default (props) => {
	return (
	<select value={props.value} onChange={(event)=>props.handleChangePageSize(event.target.value)}>
		<option value="5">5</option>
		<option value="20">20</option>
		<option value="50">50</option>
	</select>)
}