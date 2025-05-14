import { defineComponent as F, ref as b, onMounted as k, createElementBlock as $, openBlock as E, createElementVNode as B, computed as D, reactive as R, normalizeClass as C, unref as w, renderSlot as I, nextTick as Y, watch as q, onBeforeUnmount as X, normalizeStyle as _, withDirectives as O, Fragment as P, renderList as T, vShow as j } from "vue";
function A(v, u) {
  const s = v;
  return s.install = (e) => {
    e.component(s.name, v);
  }, s;
}
const z = { class: "sign-board-box" }, G = ["width", "height"], J = /* @__PURE__ */ F({
  __name: "index",
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 200
    },
    unit: {
      type: String,
      default: "px"
    },
    color: {
      type: String,
      default: "black"
    },
    backgroundcolor: {
      type: String,
      default: "transparent"
    },
    lineWidth: {
      type: Number,
      default: 2
    }
  },
  setup(v, { expose: u }) {
    const s = v, e = b(null);
    let l = null, n = [], i = -1, r = { x: null, y: null };
    function y(t) {
      (Math.abs(t.offsetX - r.x) >= 1 || Math.abs(t.offsetY - r.y) >= 1) && (l.strokeStyle = s.color, l.lineWidth = s.lineWidth, l.lineJoin = "round", l.beginPath(), l.moveTo(r.x, r.y), r.x = t.offsetX, r.y = t.offsetY, l.lineTo(r.x, r.y), n[i].push({ x: t.offsetX, y: t.offsetY }), l.stroke());
    }
    k(() => {
      l = e.value.getContext("2d"), l.fillStyle = s.backgroundcolor, l.fillRect(0, 0, s.width, s.height), e.value.addEventListener("pointerdown", function(t) {
        r.x = t.offsetX, r.y = t.offsetY, i < n.length - 1 && n.splice(i + 1), n.push([]), i = n.length - 1, n[i].push({ x: t.offsetX, y: t.offsetY }), e.value.addEventListener("pointermove", y);
      }), e.value.addEventListener("pointerup", function() {
        e.value.removeEventListener("pointermove", y);
      });
    });
    function o() {
      n = [], i = -1, l.clearRect(0, 0, s.width, s.height), console.log("component clear", s.width, s.height);
    }
    function x() {
      if (i >= 0) {
        l.clearRect(0, 0, s.width, s.height), l.strokeStyle = s.color, l.lineWidth = s.lineWidth, l.lineJoin = "round";
        for (let t = 0; t < i; t++)
          for (let m = 0; m < n[t].length - 1; m++)
            l.beginPath(), l.moveTo(n[t][m].x, n[t][m].y), l.lineTo(n[t][m + 1].x, n[t][m + 1].y), l.stroke();
        i -= 1;
      }
    }
    function L() {
      if (i < n.length - 1) {
        i++;
        for (let t = 0; t < n[i].length - 1; t++)
          l.beginPath(), l.moveTo(n[i][t].x, n[i][t].y), l.lineTo(n[i][t + 1].x, n[i][t + 1].y), l.stroke();
      }
    }
    function W() {
      let t = document.createElement("a");
      t.href = e.value.toDataURL(), t.download = "sign.png", t.click(), document.removeChild(t);
    }
    return u({ clear: o, back: x, restore: L, download: W }), (t, m) => (E(), $("div", z, [
      B("canvas", {
        ref_key: "deSignBoard",
        ref: e,
        width: v.width + v.unit,
        height: v.height + v.unit
      }, null, 8, G)
    ]));
  }
}), U = /* @__PURE__ */ F({
  __name: "index",
  props: {
    options: {
      type: Object
    },
    scrollData: {
      type: Array,
      require: !0
    }
  },
  setup(v) {
    const u = v, s = {
      speed: 0.4,
      wheelSpeed: 5,
      direction: "up",
      scrollNum: 5,
      isStop: !0
    }, e = D(() => Object.assign(s, u.options)), l = b(null), n = b(null), i = b(null), r = b(), o = R({
      up: [0, 0],
      down: [0, -100],
      left: [0, 0],
      right: [-100, 0]
    }[e.value.direction]);
    function x() {
      r.value && (cancelAnimationFrame(r.value), r.value = null);
    }
    function L() {
      x(), e.value.direction === "up" ? o[1] > -100 ? o[1] -= e.value.speed : o[1] = 0 : e.value.direction === "down" ? o[1] < 0 ? o[1] += e.value.speed : o[1] = -100 : e.value.direction === "left" ? o[0] > -100 ? o[0] -= e.value.speed : o[0] = 0 : e.value.direction === "right" && (o[0] < 0 ? o[0] += e.value.speed : o[0] = -100), n.value.style.transform = `translateX(${o[0]}%) translateY(${o[1]}%)`, i.value.style.transform = `translateX(${o[0]}%) translateY(${o[1]}%)`, r.value = requestAnimationFrame(L);
    }
    function W() {
      x();
    }
    function t() {
      u.scrollData.length >= e.value.scrollNum && W();
    }
    function m() {
      u.scrollData.length >= e.value.scrollNum && (r.value = requestAnimationFrame(L));
    }
    return k(() => {
      u.scrollData.length >= e.value.scrollNum && (r.value = requestAnimationFrame(L), e.value.isStop && l.value.addEventListener("wheel", (p) => {
        if (p.preventDefault(), e.value.direction === "up" || e.value.direction === "down")
          if (p.deltaY < 0) {
            let g = o[1] + e.value.wheelSpeed;
            o[1] = g > 0 ? -100 : g;
          } else {
            let g = o[1] - e.value.wheelSpeed;
            o[1] = g < -100 ? 0 : g;
          }
        else if (e.value.direction === "left" || e.value.direction === "right")
          if (p.deltaY < 0) {
            let g = o[0] + e.value.wheelSpeed;
            o[0] = g > 0 ? 0 : g;
          } else {
            let g = o[0] - e.value.wheelSpeed;
            o[0] = g < -100 ? -100 : g;
          }
        n.value.style.transform = `translateX(${o[0]}%) translateY(${o[1]}%)`, i.value.style.transform = `translateX(${o[0]}%) translateY(${o[1]}%)`;
      }));
    }), (p, g) => (E(), $("div", {
      ref_key: "deSeamlessScrollBox",
      ref: l,
      class: C(["seamless-scroll-box", {
        flex: w(e).direction === "left" || w(e).direction === "right"
      }]),
      onMouseenter: t,
      onMouseleave: m
    }, [
      B("section", {
        ref_key: "listA",
        ref: n,
        class: "seamless-scroll-list"
      }, [
        I(p.$slots, "default")
      ], 512),
      B("section", {
        ref_key: "listB",
        ref: i,
        class: "seamless-scroll-list"
      }, [
        I(p.$slots, "default")
      ], 512)
    ], 34));
  }
}), K = {
  __name: "index",
  props: {
    // 虚拟自动滚动列表的源数据
    dataList: {
      type: Array
    },
    // 滚动速度 每帧px
    scrollSpeed: {
      type: Number,
      default: 0.1
    },
    // 开启滚动的数据项数量
    amount: {
      type: Number,
      default: 10
    },
    // 是否启用悬浮暂停滚动
    hoverStop: {
      type: Boolean,
      default: !0
    },
    // 启用悬浮暂停滚动时，滚轮滚动速度
    scrollRate: {
      type: Number,
      default: 10
    }
  },
  setup(v) {
    const u = v;
    let s = b(null), e = b(null), l = b([]), n, i = 10, r = 0, y;
    k(() => {
      i = u.amount, console.log(i), n = e.value.getBoundingClientRect().height, s.value.style.transform = "translateY(0)", l.value = u.dataList.slice(0, i), Y(() => {
        t = s.value.children[0].getBoundingClientRect().height, console.log(t), y = requestAnimationFrame(m), u.hoverStop && s.value.addEventListener("wheel", (p) => {
          r += p.deltaY > 0 ? u.scrollSpeed * u.scrollRate : -u.scrollSpeed * u.scrollRate, r >= n && (r = n), r < 0 && (r = 0), s.value.style.transform = `translateY(${-1 * r}px)`;
        });
      });
    });
    function o() {
      y && (cancelAnimationFrame(y), y = void 0);
    }
    function x() {
      u.hoverStop && o();
    }
    function L() {
      u.hoverStop && m();
    }
    function W(p) {
      console.log(p);
    }
    let t = 0;
    function m() {
      o(), r += u.scrollSpeed, r >= t && (r -= t, l.value.push(u.dataList[i++]), i >= u.dataList.length && (i = 0), t = s.value.children[1].getBoundingClientRect().height, l.value.shift()), s.value.style.transform = `translateY(${-1 * r}px)`, y = requestAnimationFrame(m);
    }
    return (p, g) => (E(), $("section", {
      ref_key: "virtualInfiniteScrollBox",
      ref: e,
      class: "virtual-infinite-scroll-box"
    }, [
      B("div", {
        ref_key: "virtualInfiniteScrollList",
        ref: s,
        onMouseenter: x,
        onMouseleave: L,
        onScroll: W
      }, [
        I(p.$slots, "default", { slotItem: w(l) })
      ], 544)
    ], 512));
  }
}, Q = ["id"], Z = /* @__PURE__ */ F({
  __name: "index",
  props: {
    options: {}
  },
  emits: ["addData", "onloaded"],
  setup(v, { expose: u, emit: s }) {
    const e = v;
    let l = 0, n = b([]), i = b([]), r = D(() => Math.max(...i.value)), y = b(!0), o = {}, x, L = 0;
    const W = s;
    u({
      changeLoading: t
    });
    function t(d) {
      y.value = d;
    }
    function m() {
      var f;
      l = ((((f = document.getElementById("gooseWaterFallContainer")) == null ? void 0 : f.clientWidth) || 0) - e.options.gap * (e.options.column - 1)) / e.options.column, n.value = [];
      for (let c = 0; c < e.options.data.length; c++)
        n.value.push({ x: 0, y: 0 });
      i.value = new Array(e.options.column).fill(0), e.options.data.forEach((c) => {
        c.width = l, c.imgWidth || (c.imgWidth = l);
      });
    }
    function p(d, f) {
      let c = [];
      e.options.data.forEach((a, h) => {
        a.imgHeight || c.push(g(a.imgUrl, a.imgWidth).then((S) => {
          a.imgHeight = Number(S);
        }));
      }), Promise.all(c).then(() => {
        y.value = !1, Y(() => {
          e.options.data.forEach((a, h) => {
            let S = document.getElementById("gooseWaterFallItem" + h);
            S && !a.height && (a.height = S.clientHeight);
          }), N(d, f);
        });
      });
    }
    function g(d, f) {
      return new Promise((c, a) => {
        let h = new Image();
        h.src = d, h.onload = function() {
          let S = f * h.height / h.width;
          c(S);
        }, h.onerror = function() {
          a(new Error("Image load error, url:" + d));
        };
      });
    }
    function N(d, f) {
      let c = e.options.itemBottomGap || 0;
      for (let a = d; a < f; a++) {
        let h = e.options.data[a];
        if (a < e.options.column)
          i.value[a] += h.height + c, n.value[a].y = 0, n.value[a].x = (h.width + e.options.gap) * a;
        else {
          let S = Math.min(...i.value), M = i.value.indexOf(S);
          n.value[a].y = S, n.value[a].x = (h.width + e.options.gap) * M, i.value[M] += h.height + c;
        }
      }
      e.options.bottomLoading && H(), W("onloaded");
    }
    function H() {
      var d;
      o = new IntersectionObserver((f) => {
        f[0].isIntersecting && W("addData");
      }, {
        root: (d = document.getElementById("gooseWaterFallContainer")) == null ? void 0 : d.parentElement,
        rootMargin: (e.options.loadDistance || 0) + "px"
      }), x && o.observe(x);
    }
    return e.options.bottomLoading && q(() => e.options.data.length, (d, f) => {
      let c = d - f;
      if (c > 0) {
        for (let a = 0; a < c; a++)
          n.value.push({ x: 0, y: 0 });
        for (let a = f; a < d; a++)
          e.options.data[a].width = l, e.options.data[a].imgWidth || (e.options.data[a].imgWidth = l);
        p(f, d);
      }
    }), k(() => {
      m(), p(0, e.options.data.length), x = document.getElementById("gooseWaterFallLoadMore");
      let d = document.getElementById("gooseWaterFallLoading");
      d && (L = d.clientHeight);
    }), X(() => {
      e.options.bottomLoading && o && x && o.unobserve(x);
    }), (d, f) => (E(), $("section", {
      id: "gooseWaterFallContainer",
      class: "goose-water-fall-container",
      style: _({ height: w(r) + (e.options.bottomLoading ? w(L) : 0) + "px" })
    }, [
      (E(!0), $(P, null, T(e.options.data, (c, a) => {
        var h, S;
        return E(), $("div", {
          class: "goose-water-fall-item",
          id: "gooseWaterFallItem" + a,
          style: _({
            width: c.width + "px",
            transform: `translate(${Number((h = w(n)[a]) == null ? void 0 : h.x)}px, ${Number((S = w(n)[a]) == null ? void 0 : S.y)}px)`,
            opacity: w(y) ? 0 : 1
          })
        }, [
          I(d.$slots, "default", { item: c })
        ], 12, Q);
      }), 256)),
      B("div", {
        id: "gooseWaterFallLoadMore",
        class: "goose-water-fall-load-more",
        style: _({
          left: "0px",
          top: `${Math.max(...w(i))}px`
        })
      }, null, 4),
      O(B("div", {
        id: "gooseWaterFallLoading",
        class: "goose-water-fall-loading",
        style: _({
          left: "0px",
          top: `${Math.max(...w(i))}px`
        })
      }, [
        I(d.$slots, "loading", {}, () => [
          f[0] || (f[0] = B("div", { style: { width: "100%" } }, [
            B("div", { style: { "text-align": "center" } }, "加载中...")
          ], -1))
        ])
      ], 4), [
        [j, w(y)]
      ])
    ], 4));
  }
}), ee = A(J), te = A(U), oe = A(K), le = A(Z);
export {
  te as SeamlessScroll,
  ee as SignBoard,
  oe as VirtualInfiniteScroll,
  le as WaterFall
};
