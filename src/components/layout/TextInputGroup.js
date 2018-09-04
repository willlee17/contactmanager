import React from 'react';

const TextInputGroup = ({label, type, name, value, placeholder, onChange}) => {
  return(
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} className="form-control form-control-lg"
        placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  )
}


export default TextInputGroup
