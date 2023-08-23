import React, {useState, useTransition} from 'react';


function UseTransition() {
    const [count, setCount] = useState<number>(0);
    const [isPending, startTransition] = useTransition()

    const add = () => {
        startTransition(() => {
            setCount(count + 1)
        })
    }

  return (
    <div>
        <div onClick={() => add()}>add</div>
        <div>
            {
                isPending ? <div>loading...</div> : count
            }
        </div>
    </div>
  );
}

export default UseTransition;
