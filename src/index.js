export function objectPropertyListener(obj, onChangeCallback) {
  let callbackReturnValue;
  const changes = []; // 存储变化的信息

  function defineReactive(target) {
    Object.keys(target).forEach(key => {
      let value = target[key];

      // 如果属性是对象，则递归调用
      if (typeof value === 'object' && value !== null) {
        // 创建嵌套的可观察对象
        defineReactive(value);
      }

      Object.defineProperty(target, key, {
        get() {
          return value;
        },
        set(newValue) {
          if (newValue !== value) {
            const oldValue = value; // 保存旧值
            value = newValue; // 更新属性值

            // 当值发生变化时，将变化的信息存入数组
            changes.push({ key, oldValue, newValue });

            // 调用回调函数，并传递变化的信息
            if (onChangeCallback) {
              callbackReturnValue = onChangeCallback(changes);
            }
          }
        },
        enumerable: true,
        configurable: true
      });
    });
  }

  defineReactive(obj); // 初始化可观察对象

  return new Proxy(obj, {
    get(target, prop) {
      if (prop === 'value') {
        return callbackReturnValue;  // 返回最后一次回调的返回值
      } else {
        return target[prop];
      }
    }
  });
}