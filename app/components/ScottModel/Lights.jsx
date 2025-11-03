import React from 'react'

export function Lights() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={1.2} />
      
      {/* Key light from top-back (behind the model) */}
      <directionalLight 
        position={[0, 10, -8]} 
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