'use client'; // this make the component CSR
import React from 'react'

const AddToCart = () => {
  return (
    <div className='p-4'>
        <button className='btn btn-primary text-white' onClick={() => console.log("Clicked!")}>Add to Cart</button>
    </div>
  )
}

export default AddToCart