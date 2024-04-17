import React from 'react';
import './AnimalBox.css';

function AnimalBox({ image, name, threatLevel, setThreatLevel }) {
    return (
        <div className="animal-box">
            <img src={image} alt={name} className="animal-image" />
            <div className="animal-info">
                <h3 style={{ textTransform: 'lowercase' }}>{name}</h3>
                <label>
                    Threat Level:
                    <select value={threatLevel} onChange={(e) => setThreatLevel(name, e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
            </div>
        </div>
    );
}


export default AnimalBox;
