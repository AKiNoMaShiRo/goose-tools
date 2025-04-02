function v(t, n) {
  const c = n;
  return c.install = (o) => {
    o.directive(t, n);
  }, c;
}
const g = {
  mounted(t, n, c) {
    let o = { x: void 0, y: void 0 };
    t.style.cursor = "grab";
    const i = Object.prototype.toString.call(n.value).includes("Function") ? n.value() : window;
    t.style.position = i === window ? "fixed" : "absolute";
    const r = t.getBoundingClientRect();
    function d(s) {
      if (o.x && o.y) {
        let a = s.clientX - o.x, u = s.clientY - o.y;
        if (i !== window) {
          const e = i.getBoundingClientRect();
          console.log("elRect", r), console.log("moveDistrictRect", e);
          const p = e != null && e.scrollLeft ? e.scrollLeft : 0, f = e != null && e.scrollTop ? e.scrollTop : 0;
          a = Math.min(Math.max(0, a - e.left + p), e.width - r.width), u = Math.min(Math.max(0, u - e.top + f), e.height - r.height);
        }
        t.style.left = a + "px", t.style.top = u + "px";
      }
    }
    t.addEventListener("pointerdown", (s) => {
      s.stopPropagation(), t.style.userSelect = "none", o.x = s.offsetX, o.y = s.offsetY, i.addEventListener("pointermove", d), i.addEventListener("pointerleave", () => {
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
    t.addEventListener("click", (o) => {
      o.stopPropagation();
    }), l = function(o) {
      t.contains(o.target) || Object.prototype.toString.apply(n.value).includes("Function") && n.value();
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
