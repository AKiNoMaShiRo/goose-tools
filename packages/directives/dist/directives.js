function v(t, n) {
  const c = n;
  return c.install = (e) => {
    e.directive(t, n);
  }, c;
}
const g = {
  mounted(t, n, c) {
    let e = { x: void 0, y: void 0 };
    t.style.cursor = "grab";
    const i = Object.prototype.toString.call(n.value).includes("Function") ? n.value() : window;
    t.style.position = i === window ? "fixed" : "absolute";
    const r = t.getBoundingClientRect();
    function d(s) {
      if (e.x && e.y) {
        let a = s.clientX - e.x, u = s.clientY - e.y;
        if (i !== window) {
          const o = i.getBoundingClientRect();
          console.log("elRect", r), console.log("moveDistrictRect", o);
          const p = o != null && o.scrollLeft ? o.scrollLeft : 0, f = o != null && o.scrollTop ? o.scrollTop : 0;
          a = Math.min(Math.max(0, a - o.left + p), o.width - r.width), u = Math.min(Math.max(0, u - o.top + f), o.height - r.height);
        }
        t.style.left = a + "px", t.style.top = u + "px";
      }
    }
    t.addEventListener("pointerdown", (s) => {
      s.stopPropagation(), t.style.userSelect = "none", e.x = s.offsetX, e.y = s.offsetY, i.addEventListener("pointermove", d), i.addEventListener("pointerleave", () => {
        t.style.userSelect = "auto", i.removeEventListener("pointermove", d);
      });
    }), t.addEventListener("pointerup", () => {
      t.style.userSelect = "auto", i.removeEventListener("pointermove", d);
    });
  }
};
let l;
const y = {
  mounted(t, n, c) {
    t.addEventListener("click", (e) => {
      e.stopPropagation();
    }), l = function(e) {
      t.contains(e.target) || Object.prototype.toString.apply(n.value).includes("Function") && n.value(e);
    }, window.addEventListener("click", l);
  },
  unmounted() {
    l && window.removeEventListener("click", l);
  }
}, w = v("v-drag", g), m = v("v-outsideclick", y);
export {
  w as VDrag,
  m as VOutsideclick
};
