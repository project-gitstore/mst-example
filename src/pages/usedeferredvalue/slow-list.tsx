import React,{useState, useDeferredValue,memo} from 'react';

const SlowList = memo(({text}:any) => {
  let items:any[] = [];
  for (let i = 0; i < 250; i++) {
    let startTime = performance.now();
    while(performance.now() - startTime < 5){
      console.log('time:', performance.now() - startTime)
    }
    items.push(text)
  }

  return (
    <ul>
      {
        items.map((item,index) => {
          return <li key = {index}>text:{item}</li>
        })
      }
    </ul>
  )
})

export default SlowList;
