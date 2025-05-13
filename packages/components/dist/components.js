import { defineComponent as A, ref as S, onMounted as E, createElementBlock as $, openBlock as B, createElementVNode as _, computed as M, reactive as N, normalizeClass as D, unref as L, renderSlot as W, nextTick as Y, watch as R, onBeforeUnmount as C, normalizeStyle as k, withDirectives as q, Fragment as H, renderList as X, vShow as O } from "vue";
function I(p, c) {
  const e = p;
  return e.install = (t) => {
    t.component(e.name, p);
  }, e;
}
const P = { class: "sign-board-box" }, T = ["width", "height"], j = /* @__PURE__ */ A({
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
  setup(p, { expose: c }) {
    const e = p, t = S(null);
    let o = null, i = [], u = -1, r = { x: null, y: null };
    function g(l) {
      (Math.abs(l.offsetX - r.x) >= 1 || Math.abs(l.offsetY - r.y) >= 1) && (o.strokeStyle = e.color, o.lineWidth = e.lineWidth, o.lineJoin = "round", o.beginPath(), o.moveTo(r.x, r.y), r.x = l.offsetX, r.y = l.offsetY, o.lineTo(r.x, r.y), i[u].push({ x: l.offsetX, y: l.offsetY }), o.stroke());
    }
    E(() => {
      o = t.value.getContext("2d"), o.fillStyle = e.backgroundcolor, o.fillRect(0, 0, e.width, e.height), t.value.addEventListener("pointerdown", function(l) {
        r.x = l.offsetX, r.y = l.offsetY, u < i.length - 1 && i.splice(u + 1), i.push([]), u = i.length - 1, i[u].push({ x: l.offsetX, y: l.offsetY }), t.value.addEventListener("pointermove", g);
      }), t.value.addEventListener("pointerup", function() {
        t.value.removeEventListener("pointermove", g);
      });
    });
    function n() {
      i = [], u = -1, o.clearRect(0, 0, e.width, e.height), console.log("component clear", e.width, e.height);
    }
    function x() {
      if (u >= 0) {
        o.clearRect(0, 0, e.width, e.height), o.strokeStyle = e.color, o.lineWidth = e.lineWidth, o.lineJoin = "round";
        for (let l = 0; l < u; l++)
          for (let m = 0; m < i[l].length - 1; m++)
            o.beginPath(), o.moveTo(i[l][m].x, i[l][m].y), o.lineTo(i[l][m + 1].x, i[l][m + 1].y), o.stroke();
        u -= 1;
      }
    }
    function w() {
      if (u < i.length - 1) {
        u++;
        for (let l = 0; l < i[u].length - 1; l++)
          o.beginPath(), o.moveTo(i[u][l].x, i[u][l].y), o.lineTo(i[u][l + 1].x, i[u][l + 1].y), o.stroke();
      }
    }
    function b() {
      let l = document.createElement("a");
      l.href = t.value.toDataURL(), l.download = "sign.png", l.click(), document.removeChild(l);
    }
    return c({ clear: n, back: x, restore: w, download: b }), (l, m) => (B(), $("div", P, [
      _("canvas", {
        ref_key: "deSignBoard",
        ref: t,
        width: p.width + p.unit,
        height: p.height + p.unit
      }, null, 8, T)
    ]));
  }
}), z = /* @__PURE__ */ A({
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
  setup(p) {
    const c = p, e = {
      speed: 0.4,
      wheelSpeed: 5,
      direction: "up",
      scrollNum: 5,
      isStop: !0
    }, t = M(() => Object.assign(e, c.options)), o = S(null), i = S(null), u = S(null), r = S(), n = N({
      up: [0, 0],
      down: [0, -100],
      left: [0, 0],
      right: [-100, 0]
    }[t.value.direction]);
    function x() {
      r.value && (cancelAnimationFrame(r.value), r.value = null);
    }
    function w() {
      x(), t.value.direction === "up" ? n[1] > -100 ? n[1] -= t.value.speed : n[1] = 0 : t.value.direction === "down" ? n[1] < 0 ? n[1] += t.value.speed : n[1] = -100 : t.value.direction === "left" ? n[0] > -100 ? n[0] -= t.value.speed : n[0] = 0 : t.value.direction === "right" && (n[0] < 0 ? n[0] += t.value.speed : n[0] = -100), i.value.style.transform = `translateX(${n[0]}%) translateY(${n[1]}%)`, u.value.style.transform = `translateX(${n[0]}%) translateY(${n[1]}%)`, r.value = requestAnimationFrame(w);
    }
    function b() {
      x();
    }
    function l() {
      c.scrollData.length >= t.value.scrollNum && b();
    }
    function m() {
      c.scrollData.length >= t.value.scrollNum && (r.value = requestAnimationFrame(w));
    }
    return E(() => {
      c.scrollData.length >= t.value.scrollNum && (r.value = requestAnimationFrame(w), t.value.isStop && o.value.addEventListener("wheel", (v) => {
        if (v.preventDefault(), t.value.direction === "up" || t.value.direction === "down")
          if (v.deltaY < 0) {
            let s = n[1] + t.value.wheelSpeed;
            n[1] = s > 0 ? -100 : s;
          } else {
            let s = n[1] - t.value.wheelSpeed;
            n[1] = s < -100 ? 0 : s;
          }
        else if (t.value.direction === "left" || t.value.direction === "right")
          if (v.deltaY < 0) {
            let s = n[0] + t.value.wheelSpeed;
            n[0] = s > 0 ? 0 : s;
          } else {
            let s = n[0] - t.value.wheelSpeed;
            n[0] = s < -100 ? -100 : s;
          }
        i.value.style.transform = `translateX(${n[0]}%) translateY(${n[1]}%)`, u.value.style.transform = `translateX(${n[0]}%) translateY(${n[1]}%)`;
      }));
    }), (v, s) => (B(), $("div", {
      ref_key: "deSeamlessScrollBox",
      ref: o,
      class: D(["seamless-scroll-box", {
        flex: L(t).direction === "left" || L(t).direction === "right"
      }]),
      onMouseenter: l,
      onMouseleave: m
    }, [
      _("section", {
        ref_key: "listA",
        ref: i,
        class: "seamless-scroll-list"
      }, [
        W(v.$slots, "default")
      ], 512),
      _("section", {
        ref_key: "listB",
        ref: u,
        class: "seamless-scroll-list"
      }, [
        W(v.$slots, "default")
      ], 512)
    ], 34));
  }
}), G = {
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
  setup(p) {
    const c = p;
    let e = S(null), t = S(null), o = S([]), i, u = 10, r = 0, g;
    E(() => {
      u = c.amount, console.log(u), i = t.value.getBoundingClientRect().height, e.value.style.transform = "translateY(0)", o.value = c.dataList.slice(0, u), Y(() => {
        l = e.value.children[0].getBoundingClientRect().height, console.log(l), g = requestAnimationFrame(m), c.hoverStop && e.value.addEventListener("wheel", (v) => {
          r += v.deltaY > 0 ? c.scrollSpeed * c.scrollRate : -c.scrollSpeed * c.scrollRate, r >= i && (r = i), r < 0 && (r = 0), e.value.style.transform = `translateY(${-1 * r}px)`;
        });
      });
    });
    function n() {
      g && (cancelAnimationFrame(g), g = void 0);
    }
    function x() {
      c.hoverStop && n();
    }
    function w() {
      c.hoverStop && m();
    }
    function b(v) {
      console.log(v);
    }
    let l = 0;
    function m() {
      n(), r += c.scrollSpeed, r >= l && (r -= l, o.value.push(c.dataList[u++]), u >= c.dataList.length && (u = 0), l = e.value.children[1].getBoundingClientRect().height, o.value.shift()), e.value.style.transform = `translateY(${-1 * r}px)`, g = requestAnimationFrame(m);
    }
    return (v, s) => (B(), $("section", {
      ref_key: "virtualInfiniteScrollBox",
      ref: t,
      class: "virtual-infinite-scroll-box"
    }, [
      _("div", {
        ref_key: "virtualInfiniteScrollList",
        ref: e,
        onMouseenter: x,
        onMouseleave: w,
        onScroll: b
      }, [
        W(v.$slots, "default", { slotItem: L(o) })
      ], 544)
    ], 512));
  }
}, J = ["id"], U = { class: "goose-water-fall-loading" }, K = /* @__PURE__ */ A({
  __name: "index",
  props: {
    options: {}
  },
  emits: ["addData", "onloaded"],
  setup(p, { emit: c }) {
    const e = p;
    let t = 0, o = S([]), i = S([]), u = M(() => Math.max(...i.value)), r = S(!0), g = {}, n;
    const x = c;
    function w() {
      var f;
      t = ((((f = document.getElementById("gooseWaterFallContainer")) == null ? void 0 : f.clientWidth) || 0) - e.options.gap * (e.options.column - 1)) / e.options.column, o.value = [];
      for (let d = 0; d < e.options.data.length; d++)
        o.value.push({ x: 0, y: 0 });
      i.value = new Array(e.options.column).fill(0), e.options.data.forEach((d) => {
        d.width = t, d.imgWidth || (d.imgWidth = t);
      });
    }
    function b(s, f) {
      let d = [];
      e.options.data.forEach((a, h) => {
        a.imgHeight || d.push(l(a.imgUrl, a.imgWidth).then((y) => {
          a.imgHeight = Number(y);
        }));
      }), Promise.all(d).then(() => {
        r.value = !1, Y(() => {
          e.options.data.forEach((a, h) => {
            let y = document.getElementById("gooseWaterFallItem" + h);
            y && !a.height && (a.height = y.clientHeight);
          }), m(s, f);
        });
      });
    }
    function l(s, f) {
      return new Promise((d, a) => {
        let h = new Image();
        h.src = s, h.onload = function() {
          let y = f * h.height / h.width;
          d(y);
        }, h.onerror = function() {
          a(new Error("Image load error, url:" + s));
        };
      });
    }
    function m(s, f) {
      let d = e.options.itemBottomGap || 0;
      for (let a = s; a < f; a++) {
        let h = e.options.data[a];
        if (a < e.options.column)
          i.value[a] += h.height + d, o.value[a].y = 0, o.value[a].x = (h.width + e.options.gap) * a;
        else {
          let y = Math.min(...i.value), F = i.value.indexOf(y);
          o.value[a].y = y, o.value[a].x = (h.width + e.options.gap) * F, i.value[F] += h.height + d;
        }
      }
      e.options.bottomLoading && v(), x("onloaded");
    }
    function v() {
      var s;
      g = new IntersectionObserver((f) => {
        f[0].isIntersecting && x("addData");
      }, {
        root: (s = document.getElementById("gooseWaterFallContainer")) == null ? void 0 : s.parentElement,
        rootMargin: (e.options.loadDistance || 0) + "px"
      }), n && g.observe(n);
    }
    return e.options.bottomLoading && R(() => e.options.data.length, (s, f) => {
      let d = s - f;
      if (d > 0) {
        for (let a = 0; a < d; a++)
          o.value.push({ x: 0, y: 0 });
        for (let a = f; a < s; a++)
          e.options.data[a].width = t, e.options.data[a].imgWidth || (e.options.data[a].imgWidth = t);
        b(f, s);
      }
    }), E(() => {
      w(), b(0, e.options.data.length), n = document.getElementById("gooseWaterFallLoadMore");
    }), C(() => {
      e.options.bottomLoading && g && n && g.unobserve(n);
    }), (s, f) => (B(), $("section", {
      id: "gooseWaterFallContainer",
      class: "goose-water-fall-container",
      style: k({ height: L(u) + "px" })
    }, [
      (B(!0), $(H, null, X(e.options.data, (d, a) => {
        var h, y;
        return B(), $("div", {
          class: "goose-water-fall-item",
          id: "gooseWaterFallItem" + a,
          style: k({
            width: d.width + "px",
            transform: `translate(${Number((h = L(o)[a]) == null ? void 0 : h.x)}px, ${Number((y = L(o)[a]) == null ? void 0 : y.y)}px)`
          })
        }, [
          W(s.$slots, "default", { item: d })
        ], 12, J);
      }), 256)),
      _("div", {
        id: "gooseWaterFallLoadMore",
        class: "goose-water-fall-load-more",
        style: k({
          left: "0px",
          top: `${Math.max(...L(i))}px`
        })
      }, null, 4),
      q(_("div", U, [
        W(s.$slots, "loading", {}, () => [
          f[0] || (f[0] = _("div", { style: { "text-align": "center" } }, "加载中...", -1))
        ])
      ], 512), [
        [O, L(r)]
      ])
    ], 4));
  }
}), Z = I(j), V = I(z), ee = I(G), te = I(K);
export {
  V as SeamlessScroll,
  Z as SignBoard,
  ee as VirtualInfiniteScroll,
  te as WaterFall
};
