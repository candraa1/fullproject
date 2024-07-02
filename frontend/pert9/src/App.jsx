// import React, { useState } from 'react';

// const Counter= () => {
//   // Mendeklarasikan state "count" dengan nilai awal 0
//   const [count, setCount] = useState(0);

// return (
//   <div>
//     <p>Count: {count} </p>
//     <button onClick={() => setCount(count + 1)} >Increment</button>
//   </div>
//   );
// };
// export default Counter;

import React from 'react';
import ProductList from './ProductList';

const App = () => {
  const products = [
    {id: 1, name: 'laptop', price: 1000},
    {id: 1, name: 'smartphone', price: 500},
    {id: 1, name: 'tablet', price: 300},
  ];

  return (
    <div className='App'>
      <h1>Product List</h1>
      <ProductList products={products}/>
    </div>
  );
}

export default App;
