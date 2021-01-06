import React from 'react';

const defineGuards = (layers = [], Component, props)=> {
  if(!layers.length){
    return (
        <Component {...props}/>
    )
  }
  return (
      <>
        {React.createElement(layers[0], props, defineGuards(layers.slice(1), Component, props))}
      </>
  );
};

export default defineGuards;