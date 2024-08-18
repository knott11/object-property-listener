#### 介绍
可以用来监听对象属性值的变化

#### 安装教程
```bash
yarn add object-property-listener
npm i object-property-listener
```

#### 使用说明
调用objectPropertyListener函数，第一个参数为需要监听的对象，第二个参数为回调函数，当对象里的值发生变化时，会自动调用该回调函数。其中包含一个changes参数，为一个数组，数组中存有所有发生变化的值，分别包括变化的值的key、旧值和新值。objectPropertyListener函数包含一个返回值，当对象的某个值发生变化时，会返回一个Proxy，用.value可以取到自定义的返回值。
引入
```bash
import { objectPropertyListener } from 'object-property-listener'
```

```bash
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

const observable = objectPropertyListener(obj, (changes) => {
  console.log("属性值已更改");
  console.log(changes)// 输出数组
  changes.forEach(change => {
    if (change.key === 'name' && change.newValue === 'Jack') {
      console.log('name变化为Jack')
    }
    console.log(`属性: ${change.key}, 旧值: ${change.oldValue}, 新值: ${change.newValue}`); // 打印两次，因为obj.user1.info.name改变了两次
  });
  return "变化发生";
});

console.log(observable.value); // 输出: undefined，因为没有值发生改变
obj.user2.info.name = '22222' //会报错，因为user2不存在info.name
delete obj.user2 // 无法监听
obj.user1.info.name = 'Alice' // 输出: 属性:name旧值: John新值：Alice
obj.user1.info.name = 'Jack' // 输出: 属性:name旧值: Alice新值：Jack
obj.user1.info = {} // 通过JSON.stringify可以输出info的新旧值
console.log(observable.value) // 输出返回值: "变化发生"
```