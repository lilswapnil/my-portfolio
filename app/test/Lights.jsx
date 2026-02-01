import React from 'react'

export default function Lights() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.5} />
      
      {/* Key light from top-back (behind the model) */}
        {/* Key light from directly above the model */}
        <directionalLight 
          position={[0, 10, 0]} 
          intensity={3}
          castShadow
        />
      
      {/* Fill light from front-side */}
      <directionalLight 
        position={[4, 3, 5]} 
        intensity={1.5}
      />
      
      {/* Subtle side accent */}
      <directionalLight 
        position={[-3, 5, 2]} 
        intensity={0.6}
      />
    </>
  )
}