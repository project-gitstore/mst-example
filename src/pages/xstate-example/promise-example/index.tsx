import { createMachine, interpret, assign } from 'xstate';





const Counter = () => {
    const increment = (context:any) => context.count + 1;
    const decrement = (context:any) => context.count - 1;

    const counterMachine = createMachine({
        initial: 'active',
        context: {
          count: 0 
        },
        states: {
          active: {
            on: {
              INC: { actions: assign({ count: increment }) },
              DEC: { actions: assign({ count: decrement }) }
            }
          }
        }
      });
      
      const counterService = interpret(counterMachine)
        .onTransition((state) => console.log(state.context.count))
        .start();
      // => 0
    return (
        <div>
            <div onClick={() => {
                 counterService.send('INC');
            }}>加</div>
            <div onClick={() => {
                counterService.send('DEC');
            }}>减</div>
        </div>
    )
}

export default Counter;