import React, {useState} from 'react'

export default props => {
    const [value, setValue] = useState(0);
    const valueChangeHandler = event => {
        setValue(event.target.value)
      }
	 const checkIfNotNan = event => {
		 console.log(document.getElementById('name_input').value);
		 // setValue(event.target.value)
	 }
	 const checkIfNotNanAndAddHim = (event,props) => {
		 event.preventDefault();
		 props.setNewPerson = document.getElementById('name_input').value;
		 console.log(document.getElementById('name_input').value);
		 
		 // setValue(event.target.value)
	 }
	//onClick={() => props.onSearch(value)}
	//id | firstName | lastName | email | phone
    return (
	
		!value?
        <div className="input-group mb-3 mt-3" >
             <div className="input-group-prepend">
                 <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setValue(1)} >Add person</button>
            </div>            
        </div>
		:
		
			<form>
			<fieldset>
			<div className = "blockNewPerson">
			<div id ="columnLike">
				<p><label for="name" >ID <em>*</em></label>
				<input 
					id = "id_input"
					type="text" 
					className="button-control"
					autofocus = "true"
					onChange={checkIfNotNan} 
				/></p>
			</div>
			<div id ="columnLike">
				<p><label for="name" style={{float:"left"}}>First and Last name <em>*</em></label>
				<input 
					id = "name_input"
					type="text" 
					className="button-control"
					autofocus = "true"
					style={{float:"left"}}
					onChange={checkIfNotNan} 
				/>
				<input 
					id = "surname_input"
					type="text" 
					className="button-control"
					autofocus = "true"
					style={{float:"left"}}
					onChange={checkIfNotNan} 
				/></p>
			</div>
			
			<div id ="columnLike">
				<p><label for="name" style={{float:"left"}}>Email <em>*</em></label>
				<input 
					id = "email_input"
					type="text" 
					className="button-control"
					autofocus = "true"
					style={{float:"left"}}
					onChange={checkIfNotNan} 
				/></p>
			</div>	
				
			<div id ="columnLike">
				<p><label for="name" style={{float:"left"}}>Phone <em>*</em></label>
				<input 
					id = "phone_input"
					type="text" 
					className="button-control"
					autofocus = "true"
					style={{float:"left"}}
					onChange={checkIfNotNan} 
				/></p>
			</div>		
			<div className = "btn_correct" >
				<button 
				className = "btn_temp"
				value="Add"
				onclick = {() => this.checkIfNotNanAndAddHim }
				 />
				 <button 
                    className="btn btn-outline-secondary"
                    onClick={() => props.setNewPerson(value)} >Search</button>
			</div>	
			
			</div>
			</fieldset>
			</form>
    )
}





