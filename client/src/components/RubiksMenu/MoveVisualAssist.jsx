import React from 'react';

const MoveVisualAssist = ({ instructionImageCode }) => { 
    return (
        <div className = "direction-image"> 
            {instructionImageCode ? <img src={require(`../../images/rubiks_directions_${instructionImageCode}.png`)} alt="Logo" className="header__logo" /> : <div></div>}
        </div>
    )
}

export default MoveVisualAssist