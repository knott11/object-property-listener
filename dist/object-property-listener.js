function s(u, c) {
  let f;
  const i = [];
  function o(r) {
    Object.keys(r).forEach((t) => {
      let e = r[t];
      typeof e == "object" && e !== null && o(e), Object.defineProperty(r, t, {
        get() {
          return e;
        },
        set(n) {
          if (n !== e) {
            const l = e;
            e = n, i.push({ key: t, oldValue: l, newValue: n }), c && (f = c(i));
          }
        },
        enumerable: !0,
        configurable: !0
      });
    });
  }
  return o(u), new Proxy(u, {
    get(r, t) {
      return t === "value" ? f : r[t];
    }
  });
}
export {
  s as objectPropertyListener
};
