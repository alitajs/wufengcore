import { wufengController } from './index';

test('emitter', () => {
 const fn = jest.fn();
 wufengController.useSubscription('core-test',(val:any)=>{
    fn(val);
 });
 wufengController.emit('core-test','Hello!');
 expect(fn).toHaveBeenCalled();
 expect(fn).toHaveBeenCalledWith('Hello!');
});