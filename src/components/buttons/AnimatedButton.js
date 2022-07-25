import React, { useState } from 'react';

const AnimatedButton = () => {
    
    const [shake, setShake] = useState(false);
    
    const animate = () => {
        
        // Button begins to shake
        setShake(true);
        
        // Buttons stops to shake after 2 seconds
        setTimeout(() => setShake(false), 2000);
        
    }
    
    return(
        <button onClick = {animate} className = {shake ? `shake` : null}>Click me</button>
    );
    
}

export default AnimatedButton;
