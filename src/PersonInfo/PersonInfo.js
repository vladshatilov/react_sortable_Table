import React from 'react'

		//simple html structure to show person's detail info
export default ({person}) => {
return (
	<div className = 'divPerson'>
	
	<dl>
	<dt>Контактная информация:</dt> 
	<dd>{person.firstName + ' ' + person.lastName}</dd>
	
	<dt>E-mail:</dt> 
	<dd>{person.email}</dd>
	
	<dt>Телефон:</dt> 
	<dd>{person.phone}</dd>
	
	<dt>Штат:</dt> 
	<dd>{person.address.state}</dd>
	
	<dt>Город:</dt> 
	<dd>{person.address.city}</dd>
	
	<dt>Адрес проживания:</dt> 
	<dd>{person.address.streetAddress}</dd>
	<dt>Индекс:</dt> 
	<dd>{person.address.zip}</dd>
	Описание: <br />
    <textarea value={person.description} />
	
	</dl>
	    
  </div>
)}

