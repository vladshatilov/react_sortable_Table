import React, {useState} from 'react'

export default props => {
			//using react hook to perform "state" in non-class module
    const [value, setValue] = useState('')
    const valueChangeHandler = event => {
        setValue(event.target.value)
      }

    return (
        <div className="input-group mb-3 mt-3" >
             <div className="input-group-prepend">
                 <button 
                    className="btn btn-outline-secondary"
                    onClick={() => props.onSearch(value)} >Search</button>
            </div>
            <input 
                type="text" 
				placeholder="Type here..."
                className="form-control"
                onChange={valueChangeHandler} 
                value={value}
            />
        </div>
    )
}