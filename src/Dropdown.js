import React, { useState, useEffect } from 'react'

function Dropdown({ title, value, options, onChange, onClick }) {
    return (
        <button className="dropdownContainer" disabled={true}>
        <button className="dropdown" onClick={onClick}>
        {title}
        </button>
        <select className="dropdown arrow" value={value} onChange={onChange}>
            {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        </button>
    )
}

export default Dropdown