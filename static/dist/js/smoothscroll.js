function ssc_init() {
  if (document.body) {
    var e = document.body,
      s = document.documentElement,
      c = window.innerHeight,
      t = e.scrollHeight;
    if (
      ((ssc_root = 0 <= document.compatMode.indexOf("CSS") ? s : e),
      (ssc_activeElement = e),
      (ssc_initdone = !0),
      top != self)
    )
      ssc_frame = !0;
    else if (
      c < t &&
      (e.offsetHeight <= c || s.offsetHeight <= c) &&
      ((ssc_root.style.height = "auto"), ssc_root.offsetHeight <= c)
    ) {
      var o = document.createElement("div");
      (o.style.clear = "both"), e.appendChild(o);
    }
    ssc_fixedback ||
      ((e.style.backgroundAttachment = "scroll"),
      (s.style.backgroundAttachment = "scroll")),
      ssc_keyboardsupport && ssc_addEvent("keydown", ssc_keydown);
  }
}
function ssc_scrollArray(d, f, m, h) {
  if (
    ((h = h || 1e3),
    ssc_directionCheck(f, m),
    ssc_que.push({
      x: f,
      y: m,
      lastX: f < 0 ? 0.99 : -0.99,
      lastY: m < 0 ? 0.99 : -0.99,
      start: +new Date(),
    }),
    !ssc_pending)
  ) {
    var p = function () {
      for (var e = +new Date(), s = 0, c = 0, t = 0; t < ssc_que.length; t++) {
        var o = ssc_que[t],
          r = e - o.start,
          n = ssc_animtime <= r,
          a = n ? 1 : r / ssc_animtime;
        ssc_pulseAlgorithm && (a = ssc_pulse(a));
        var i = (o.x * a - o.lastX) >> 0,
          l = (o.y * a - o.lastY) >> 0;
        (s += i),
          (c += l),
          (o.lastX += i),
          (o.lastY += l),
          n && (ssc_que.splice(t, 1), t--);
      }
      if (f) {
        var _ = d.scrollLeft;
        (d.scrollLeft += s), s && d.scrollLeft === _ && (f = 0);
      }
      if (m) {
        var u = d.scrollTop;
        (d.scrollTop += c), c && d.scrollTop === u && (m = 0);
      }
      f || m || (ssc_que = []),
        ssc_que.length
          ? setTimeout(p, h / ssc_framerate + 1)
          : (ssc_pending = !1);
    };
    setTimeout(p, 0), (ssc_pending = !0);
  }
}
function ssc_wheel(e) {
  ssc_initdone || ssc_init();
  var s = e.target,
    c = ssc_overflowingAncestor(s);
  if (
    !c ||
    e.defaultPrevented ||
    ssc_isNodeName(ssc_activeElement, "embed") ||
    (ssc_isNodeName(s, "embed") && /\.pdf/i.test(s.src))
  )
    return !0;
  var t = e.wheelDeltaX || 0,
    o = e.wheelDeltaY || 0;
  t || o || (o = e.wheelDelta || 0),
    1.2 < Math.abs(t) && (t *= ssc_stepsize / 120),
    1.2 < Math.abs(o) && (o *= ssc_stepsize / 120),
    ssc_scrollArray(c, -t, -o),
    e.preventDefault();
}
function ssc_keydown(e) {
  var s = e.target,
    c = e.ctrlKey || e.altKey || e.metaKey;
  if (
    /input|textarea|embed/i.test(s.nodeName) ||
    s.isContentEditable ||
    e.defaultPrevented ||
    c
  )
    return !0;
  if (ssc_isNodeName(s, "button") && e.keyCode === ssc_key.spacebar) return !0;
  var t = 0,
    o = 0,
    r = ssc_overflowingAncestor(ssc_activeElement),
    n = r.clientHeight;
  switch ((r == document.body && (n = window.innerHeight), e.keyCode)) {
    case ssc_key.up:
      o = -ssc_arrowscroll;
      break;
    case ssc_key.down:
      o = ssc_arrowscroll;
      break;
    case ssc_key.spacebar:
      o = -(e.shiftKey ? 1 : -1) * n * 0.9;
      break;
    case ssc_key.pageup:
      o = 0.9 * -n;
      break;
    case ssc_key.pagedown:
      o = 0.9 * n;
      break;
    case ssc_key.home:
      o = -r.scrollTop;
      break;
    case ssc_key.end:
      var a = r.scrollHeight - r.scrollTop - n;
      o = 0 < a ? 10 + a : 0;
      break;
    case ssc_key.left:
      t = -ssc_arrowscroll;
      break;
    case ssc_key.right:
      t = ssc_arrowscroll;
      break;
    default:
      return !0;
  }
  ssc_scrollArray(r, t, o), e.preventDefault();
}
function ssc_mousedown(e) {
  ssc_activeElement = e.target;
}
function ssc_setCache(e, s) {
  for (var c = e.length; c--; ) ssc_cache[ssc_uniqueID(e[c])] = s;
  return s;
}
function ssc_overflowingAncestor(e) {
  var s = [],
    c = ssc_root.scrollHeight;
  do {
    var t = ssc_cache[ssc_uniqueID(e)];
    if (t) return ssc_setCache(s, t);
    if ((s.push(e), c === e.scrollHeight)) {
      if (!ssc_frame || ssc_root.clientHeight + 10 < c)
        return ssc_setCache(s, document.body);
    } else if (
      e.clientHeight + 10 < e.scrollHeight &&
      ((overflow = getComputedStyle(e, "").getPropertyValue("overflow")),
      "scroll" === overflow || "auto" === overflow)
    )
      return ssc_setCache(s, e);
  } while ((e = e.parentNode));
}
function ssc_addEvent(e, s, c) {
  window.addEventListener(e, s, c || !1);
}
function ssc_removeEvent(e, s, c) {
  window.removeEventListener(e, s, c || !1);
}
function ssc_isNodeName(e, s) {
  return e.nodeName.toLowerCase() === s.toLowerCase();
}
function ssc_directionCheck(e, s) {
  (e = 0 < e ? 1 : -1),
    (s = 0 < s ? 1 : -1),
    (ssc_direction.x === e && ssc_direction.y === s) ||
      ((ssc_direction.x = e), (ssc_direction.y = s), (ssc_que = []));
}
function ssc_pulse_(e) {
  var s;
  return (
    ((e *= ssc_pulseScale) < 1
      ? e - (1 - Math.exp(-e))
      : ((e -= 1), (s = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - s))) *
    ssc_pulseNormalize
  );
}
function ssc_pulse(e) {
  return 1 <= e
    ? 1
    : e <= 0
    ? 0
    : (1 == ssc_pulseNormalize && (ssc_pulseNormalize /= ssc_pulse_(1)),
      ssc_pulse_(e));
}
var ssc_activeElement,
  ssc_framerate = 150,
  ssc_animtime = 500,
  ssc_stepsize = 150,
  ssc_pulseAlgorithm = !0,
  ssc_pulseScale = 6,
  ssc_pulseNormalize = 1,
  ssc_keyboardsupport = !0,
  ssc_arrowscroll = 50,
  ssc_frame = !1,
  ssc_direction = { x: 0, y: 0 },
  ssc_initdone = !1,
  ssc_fixedback = !0,
  ssc_root = document.documentElement,
  ssc_key = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    spacebar: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
  },
  ssc_que = [],
  ssc_pending = !1,
  ssc_cache = {};
setInterval(function () {
  ssc_cache = {};
}, 1e4);
var ssc_uniqueID = (function () {
    var s = 0;
    return function (e) {
      return e.ssc_uniqueID || (e.ssc_uniqueID = s++);
    };
  })(),
  ischrome = /chrome/.test(navigator.userAgent.toLowerCase());
ischrome &&
  (ssc_addEvent("mousedown", ssc_mousedown),
  ssc_addEvent("mousewheel", ssc_wheel),
  ssc_addEvent("load", ssc_init));
