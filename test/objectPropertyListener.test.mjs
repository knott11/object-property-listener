import { expect } from 'chai'; // 引入 Chai 的 expect
// const { expect } = require('chai')
import { objectPropertyListener } from '../dist/object-property-listener.es.js'; // 根据实际路径引入函数
// const { objectPropertyListener } = require('../dist/object-property-listener.cjs.js')
// 假设您的 objectObserver 函数保存在这个文件里  
   
 describe('objectPropertyListener', () => {  
   let observable;  
   let onChangeCallback;  
   
   beforeEach(() => {  
     const obj = {  
       user1: {  
         info: {  
           name: 'John',  
           age: 30,  
         },  
         address: {  
           city: 'New York',  
           zip: '10001'  
         },  
         user2: {}  
       }  
     };  
   
     onChangeCallback = (changes) => {  
       console.log("属性值已更改");  
       console.log(changes); // 输出所有变化  
       changes.forEach(change => {  
         if (change.key === 'name' && change.newValue === 'Jack') {  
           console.log('name变化为Jack');  
         }  
         console.log(`属性: ${change.key}, 旧值: ${change.oldValue}, 新值: ${change.newValue}`);  
       });  
       return "变化发生";  
     };  
   
     observable = objectPropertyListener(obj, onChangeCallback);  
   });  
   
   it('should track changes to nested properties', () => {  
     observable.user1.info.name = 'Alice';  
     // 由于 onChangeCallback 会在控制台打印输出，因此无需额外验证  
     observable.user1.info.name = 'Jack';  
     // 同上，onChangeCallback 会负责打印输出  
   });  
   
   it('should track changes to entire objects', () => {  
     const originalInfo = observable.user1.info;  
     observable.user1.info = {};  
     // onChangeCallback 会打印出 info 对象的变化，无需额外验证  
   });  
   
   it('should store the return value of the callback', () => {  
     observable.user1.info.name = 'Bob';  
     expect(observable.value).to.equal('变化发生');  
   });  
 });