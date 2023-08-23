import React,{useState, useDeferredValue} from 'react';
import SlowList from './slow-list';


function UseDeferredValue() {
    const [value, setValue] = useState();
    const deferredValue = useDeferredValue(value);

    const change = (e:any) => {
        setValue(e.target.value);
    }
  return (
    <div>
        <input type="text" onChange={change} />
        {/* <div>{deferredValue}</div> */}
        <SlowList  text = {deferredValue}/>
        {/* <SlowList  text = {value}/> */}
    </div>
  );
}

export default UseDeferredValue;
