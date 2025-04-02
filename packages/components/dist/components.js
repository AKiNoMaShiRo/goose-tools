import { defineComponent as _, ref as v, onMounted as w, createElementBlock as b, openBlock as k, createElementVNode as S, computed as A, reactive as B, normalizeClass as Y, unref as y, renderSlot as x, nextTick as $ } from "vue";
function L(f, s) {
  const i = f;
  return i.install = (t) => {
    t.component(i.name, f);
  }, i;
}
const E = { class: "sign-board-box" }, R = ["width", "height"], N = /* @__PURE__ */ _({
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
  setup(f, { expose: s }) {
    const i = f, t = v(null);
    let n = null, r = [], a = -1, o = { x: null, y: null };
    function h(e) {
      (Math.abs(e.offsetX - o.x) >= 1 || Math.abs(e.offsetY - o.y) >= 1) && (n.strokeStyle = i.color, n.lineWidth = i.lineWidth, n.lineJoin = "round", n.beginPath(), n.moveTo(o.x, o.y), o.x = e.offsetX, o.y = e.offsetY, n.lineTo(o.x, o.y), r[a].push({ x: e.offsetX, y: e.offsetY }), n.stroke());
    }
    w(() => {
      n = t.value.getContext("2d"), n.fillStyle = i.backgroundcolor, n.fillRect(0, 0, i.width, i.height), t.value.addEventListener("pointerdown", function(e) {
        o.x = e.offsetX, o.y = e.offsetY, a < r.length - 1 && r.splice(a + 1), r.push([]), a = r.length - 1, r[a].push({ x: e.offsetX, y: e.offsetY }), t.value.addEventListener("pointermove", h);
      }), t.value.addEventListener("pointerup", function() {
        t.value.removeEventListener("pointermove", h);
      });
    });
    function l() {
      r = [], a = -1, n.clearRect(0, 0, i.width, i.height), console.log("component clear", i.width, i.height);
    }
    function m() {
      if (a >= 0) {
        n.clearRect(0, 0, i.width, i.height), n.strokeStyle = i.color, n.lineWidth = i.lineWidth, n.lineJoin = "round";
        for (let e = 0; e < a; e++)
          for (let u = 0; u < r[e].length - 1; u++)
            n.beginPath(), n.moveTo(r[e][u].x, r[e][u].y), n.lineTo(r[e][u + 1].x, r[e][u + 1].y), n.stroke();
        a -= 1;
      }
    }
    function p() {
      if (a < r.length - 1) {
        a++;
        for (let e = 0; e < r[a].length - 1; e++)
          n.beginPath(), n.moveTo(r[a][e].x, r[a][e].y), n.lineTo(r[a][e + 1].x, r[a][e + 1].y), n.stroke();
      }
    }
    function g() {
      let e = document.createElement("a");
      e.href = t.value.toDataURL(), e.download = "sign.png", e.click(), document.removeChild(e);
    }
    return s({ clear: l, back: m, restore: p, download: g }), (e, u) => (k(), b("div", E, [
      S("canvas", {
        ref_key: "deSignBoard",
        ref: t,
        width: f.width + f.unit,
        height: f.height + f.unit
      }, null, 8, R)
    ]));
  }
}), q = /* @__PURE__ */ _({
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
  setup(f) {
    const s = f, i = {
      speed: 0.4,
      wheelSpeed: 5,
      direction: "up",
      scrollNum: 5,
      isStop: !0
    }, t = A(() => Object.assign(i, s.options)), n = v(null), r = v(null), a = v(null), o = v(), l = B({
      up: [0, 0],
      down: [0, -100],
      left: [0, 0],
      right: [-100, 0]
    }[t.value.direction]);
    function m() {
      o.value && (cancelAnimationFrame(o.value), o.value = null);
    }
    function p() {
      m(), t.value.direction === "up" ? l[1] > -100 ? l[1] -= t.value.speed : l[1] = 0 : t.value.direction === "down" ? l[1] < 0 ? l[1] += t.value.speed : l[1] = -100 : t.value.direction === "left" ? l[0] > -100 ? l[0] -= t.value.speed : l[0] = 0 : t.value.direction === "right" && (l[0] < 0 ? l[0] += t.value.speed : l[0] = -100), r.value.style.transform = `translateX(${l[0]}%) translateY(${l[1]}%)`, a.value.style.transform = `translateX(${l[0]}%) translateY(${l[1]}%)`, o.value = requestAnimationFrame(p);
    }
    function g() {
      m();
    }
    function e() {
      s.scrollData.length >= t.value.scrollNum && g();
    }
    function u() {
      s.scrollData.length >= t.value.scrollNum && (o.value = requestAnimationFrame(p));
    }
    return w(() => {
      s.scrollData.length >= t.value.scrollNum && (o.value = requestAnimationFrame(p), t.value.isStop && n.value.addEventListener("wheel", (d) => {
        if (t.value.direction === "up" || t.value.direction === "down")
          if (d.deltaY < 0) {
            let c = l[1] + t.value.wheelSpeed;
            l[1] = c > 0 ? -100 : c;
          } else {
            let c = l[1] - t.value.wheelSpeed;
            l[1] = c < -100 ? 0 : c;
          }
        else if (t.value.direction === "left" || t.value.direction === "right")
          if (d.deltaY < 0) {
            let c = l[0] + t.value.wheelSpeed;
            l[0] = c > 0 ? 0 : c;
          } else {
            let c = l[0] - t.value.wheelSpeed;
            l[0] = c < -100 ? -100 : c;
          }
        r.value.style.transform = `translateX(${l[0]}%) translateY(${l[1]}%)`, a.value.style.transform = `translateX(${l[0]}%) translateY(${l[1]}%)`;
      }));
    }), (d, c) => (k(), b("div", {
      ref_key: "deSeamlessScrollBox",
      ref: n,
      class: Y(["seamless-scroll-box", {
        flex: y(t).direction === "left" || y(t).direction === "right"
      }]),
      onMouseenter: e,
      onMouseleave: u
    }, [
      S("section", {
        ref_key: "listA",
        ref: r,
        class: "seamless-scroll-list"
      }, [
        x(d.$slots, "default")
      ], 512),
      S("section", {
        ref_key: "listB",
        ref: a,
        class: "seamless-scroll-list"
      }, [
        x(d.$slots, "default")
      ], 512)
    ], 34));
  }
}), I = {
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
  setup(f) {
    const s = f;
    let i = v(null), t = v(null), n = v([]), r, a = 10, o = 0, h;
    w(() => {
      a = s.amount, console.log(a), r = t.value.getBoundingClientRect().height, i.value.style.transform = "translateY(0)", n.value = s.dataList.slice(0, a), $(() => {
        e = i.value.children[0].getBoundingClientRect().height, console.log(e), h = requestAnimationFrame(u), s.hoverStop && i.value.addEventListener("wheel", (d) => {
          o += d.deltaY > 0 ? s.scrollSpeed * s.scrollRate : -s.scrollSpeed * s.scrollRate, o >= r && (o = r), o < 0 && (o = 0), i.value.style.transform = `translateY(${-1 * o}px)`;
        });
      });
    });
    function l() {
      h && (cancelAnimationFrame(h), h = void 0);
    }
    function m() {
      s.hoverStop && l();
    }
    function p() {
      s.hoverStop && u();
    }
    function g(d) {
      console.log(d);
    }
    let e = 0;
    function u() {
      l(), o += s.scrollSpeed, o >= e && (o -= e, n.value.push(s.dataList[a++]), a >= s.dataList.length && (a = 0), e = i.value.children[1].getBoundingClientRect().height, n.value.shift()), i.value.style.transform = `translateY(${-1 * o}px)`, h = requestAnimationFrame(u);
    }
    return (d, c) => (k(), b("section", {
      ref_key: "virtualInfiniteScrollBox",
      ref: t,
      class: "virtual-infinite-scroll-box"
    }, [
      S("div", {
        ref_key: "virtualInfiniteScrollList",
        ref: i,
        onMouseenter: m,
        onMouseleave: p,
        onScroll: g
      }, [
        x(d.$slots, "default", { slotItem: y(n) })
      ], 544)
    ], 512));
  }
}, C = L(N), D = L(q), F = L(I);
export {
  D as SeamlessScroll,
  C as SignBoard,
  F as VirtualInfiniteScroll
};
