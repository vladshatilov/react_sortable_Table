import React, {useState} from 'react'

export default props => {
    const [value, setValue] = useState(0);    
	const checkIfNotNanAndAddHim = () => {
		 // event.preventDefault();
		 if(document.getElementById('id_input').value!=='' &&
		 document.getElementById('name_input').value!=='' &&
		 document.getElementById('surname_input').value!=='' &&
		 document.getElementById('email_input').value!=='' &&
		 document.getElementById('phone_input').value!==''		 
		 ){
			 let keyUser = {
				 id:document.getElementById('id_input').value,
				 firstName:document.getElementById('name_input').value,
				 lastName:document.getElementById('surname_input').value,
				 email:document.getElementById('email_input').value,
				 phone:document.getElementById('phone_input').value,
					address: {streetAddress:'',
					city:'',
					state:'',
					zip:''},
					description:''
			 };
			 props.setNewPerson(keyUser);
		 }
		 // props.setNewPerson(document.getElementById('name_input').value);
		 // console.log(document.getElementById('name_input').value);
		 
		 
	 }
	
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
		
			
			
			<fieldset>
			<div className = "blockNewPerson">
			<div id ="columnLike">
				<p><label for="name" >ID <em>*</em></label>
				<input 
					id = "id_input"
					type="text" 
					className="button-control"
					autofocus = "true"
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
				/>
				<input 
					id = "surname_input"
					type="text" 
					className="button-control"
					autofocus = "true"
					style={{float:"left"}}
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
				/></p>
			</div>		
			<div className = "btn_correct" >
				
				 <button 
                    className="btn btn-outline-secondary"
                    onClick={checkIfNotNanAndAddHim} >Add to list</button>
			</div>	
			
			</div>
			</fieldset>
    )
}





