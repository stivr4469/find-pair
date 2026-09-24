/**
 * Наранхито — маскот VamoS, который сопровождает игрока всю игру.
 *
 * Подключение:
 *   1. В разметку игры: <div id="buddy"></div>
 *   2. Подключить этот файл тегом script (src="../js/naranjito.js")
 *   3. var nj = Naranjito.mount(document.getElementById('buddy'));
 *
 * Реакции (все возвращают Promise, новая реакция прерывает предыдущую):
 *   nj.greet()                    — появляется и здоровается
 *   nj.question(n, total)         — новый вопрос: подпрыгивает, смотрит на задание
 *   nj.correct(streak)            — верный ответ (с 3 подряд — «в огне»)
 *   nj.wrong(ruleEs, ruleRu)      — ошибка: «ой!», затем объясняет правило
 *   nj.think()                    — игрок долго думает
 *   nj.hint(textEs, textRu)       — подсказка
 *   nj.halfway() / nj.last()      — половина пути / последний вопрос
 *   nj.poke()                     — тычок в персонажа (вызывается сам по клику)
 *   nj.result(percent)            — большой финал: ≥90 отлично, ≥60 хорошо, иначе «не беда»
 *   nj.reset()                    — вернуть в компактный режим
 *   nj.say(es, ru, opts)          — просто сказать фразу
 *   nj.setSound(true|false)       — звуки (включать только по действию пользователя)
 *   nj.onPoke = function () {}    — свой обработчик клика (например, подсказка)
 */
(function (global) {
  'use strict';

  var CSS = '' +
    '.nj{position:relative;height:var(--nj-h,180px);transition:height .6s cubic-bezier(.22,1,.36,1);-webkit-tap-highlight-color:transparent}' +
    '.nj.nj-big{height:var(--nj-h-big,300px)}' +
    '.nj::after{content:"";position:absolute;left:4%;right:4%;bottom:13px;height:2px;background:linear-gradient(90deg,transparent,var(--nj-floor,rgba(120,100,80,.18)),transparent);transition:bottom .6s}' +
    '.nj.nj-big::after{bottom:20px}' +
    '.nj-canvas{position:absolute;left:0;right:0;top:-120px;bottom:0;width:100%;height:calc(100% + 120px);pointer-events:none;z-index:4}' +
    '.nj-char{position:absolute;bottom:0;left:0;width:160px;z-index:2;cursor:pointer;transition:left .6s cubic-bezier(.22,1,.36,1),width .6s cubic-bezier(.22,1,.36,1),margin .6s cubic-bezier(.22,1,.36,1)}' +
    '.nj.nj-big .nj-char{left:50%;width:250px;margin-left:-125px}' +
    '.nj-char svg{display:block;width:100%;height:auto;overflow:visible}' +
    '.nj .nj-off{display:none}' +
    '.nj-bpos{position:absolute;left:162px;right:0;top:44%;transform:translateY(-50%);z-index:5;display:flex;transition:all .6s cubic-bezier(.22,1,.36,1)}' +
    '.nj-bpos[hidden]{display:none}' +
    '.nj.nj-big .nj-bpos{left:auto;right:12px;top:14px;transform:none;max-width:52%}' +
    '.nj-bubble{position:relative;background:var(--nj-bubble,#1C1917);color:var(--nj-bubble-text,#FBF6EF);border-radius:18px;padding:10px 14px 11px;transform-origin:0 50%;box-shadow:0 10px 24px -14px rgba(0,0,0,.5)}' +
    '.nj-bubble::before{content:"";position:absolute;left:-7px;top:50%;margin-top:-7px;border:7px solid transparent;border-left:0;border-right-color:var(--nj-bubble,#1C1917)}' +
    '.nj.nj-big .nj-bubble{border-radius:18px 18px 18px 4px;transform-origin:0 100%}' +
    '.nj.nj-big .nj-bubble::before{display:none}' +
    '.nj-bubble b{display:block;font-family:var(--display,inherit);font-size:1rem;font-weight:700;letter-spacing:-.01em;line-height:1.25}' +
    '.nj-bubble span{display:block;font-size:.82rem;opacity:.8;line-height:1.35;margin-top:2px}' +
    '.nj-bubble button{margin-top:8px;font:inherit;font-size:.8rem;font-weight:700;color:var(--nj-bubble,#1C1917);background:var(--nj-bubble-text,#FBF6EF);border:0;border-radius:999px;padding:6px 12px;cursor:pointer}' +
    '.nj-dust{position:absolute;width:12px;height:12px;border-radius:50%;background:rgba(140,120,100,.45);pointer-events:none;z-index:1}' +
    '@media (prefers-reduced-motion:reduce){.nj,.nj-char,.nj-bpos{transition:none}}';

  var STAR = '<polygon points="0,-15 4,-5.3 14.3,-4.6 6.2,2 8.8,12.1 0,6.4 -8.8,12.1 -6.2,2 -14.3,-4.6 -4,-5.3" fill="#FFD23F" stroke="#4A2410" stroke-width="3" stroke-linejoin="round"/>';

  var SVG = '' +
  '<svg viewBox="0 0 240 260" role="img" aria-label="Наранхито, апельсин-маскот">' +
  '<defs>' +
    '<clipPath id="nj-bodyClip"><ellipse cx="120" cy="146" rx="60" ry="57"/></clipPath>' +
    '<clipPath id="nj-eyeClipL"><ellipse cx="102" cy="138" rx="15" ry="19"/></clipPath>' +
    '<clipPath id="nj-eyeClipR"><ellipse cx="138" cy="138" rx="15" ry="19"/></clipPath>' +
    '<clipPath id="nj-mouthClip"><path d="M100 166 Q120 171 140 166 Q139 194 120 197 Q101 194 100 166 Z"/></clipPath>' +
    '<linearGradient id="nj-iris" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E0E04"/><stop offset="1" stop-color="#8A4513"/></linearGradient>' +
    '<symbol id="nj-star" viewBox="-16 -16 32 32" overflow="visible">' + STAR + '</symbol>' +
  '</defs>' +
  '<ellipse id="nj-shadow" cx="120" cy="242" rx="52" ry="7" fill="#000" opacity=".16"/>' +
  '<g id="nj-root">' +
    '<g fill="none" stroke="#4A2410" stroke-width="7" stroke-linecap="round"><path id="nj-legL"/><path id="nj-legR"/></g>' +
    '<g id="nj-shoeL"><ellipse rx="15" ry="8.5" fill="#D7263D" stroke="#4A2410" stroke-width="3.5"/><path d="M-11 4 H11" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>' +
    '<g id="nj-shoeR"><ellipse rx="15" ry="8.5" fill="#D7263D" stroke="#4A2410" stroke-width="3.5"/><path d="M-11 4 H11" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>' +
    '<g id="nj-bodyG">' +
      '<g id="nj-flame" class="nj-off">' +
        '<path d="M98 30 C 84 48 80 60 86 72 C 90 82 106 82 110 72 C 116 60 110 46 98 30 Z" fill="#FF5A1F" stroke="#4A2410" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M98 50 C 92 58 91 65 94 70 C 96 74 100 74 102 70 C 105 65 104 58 98 50 Z" fill="#FFD23F"/>' +
      '</g>' +
      '<path d="M120 92 Q119 84 123 78" fill="none" stroke="#4A2410" stroke-width="5" stroke-linecap="round"/>' +
      '<g id="nj-leaf">' +
        '<path d="M123 80 C 130 62, 156 57, 170 65 C 160 84, 138 91, 123 80 Z" fill="#43B04F" stroke="#4A2410" stroke-width="3.5" stroke-linejoin="round"/>' +
        '<path d="M128 78 C 140 72, 152 68, 163 66" fill="none" stroke="#2E8A3A" stroke-width="2.5" stroke-linecap="round"/>' +
      '</g>' +
      '<g clip-path="url(#nj-bodyClip)">' +
        '<rect x="50" y="80" width="140" height="130" fill="#E9660D"/>' +
        '<ellipse cx="113" cy="138" rx="60" ry="55" fill="#FF8F24"/>' +
        '<ellipse cx="96" cy="112" rx="24" ry="14" fill="#FFB257" transform="rotate(-28 96 112)"/>' +
        '<g fill="#D85A0A" opacity=".45"><circle cx="84" cy="182" r="1.8"/><circle cx="92" cy="190" r="1.4"/><circle cx="150" cy="186" r="1.8"/><circle cx="163" cy="128" r="1.5"/><circle cx="160" cy="170" r="1.4"/><circle cx="72" cy="160" r="1.5"/></g>' +
      '</g>' +
      '<ellipse cx="90" cy="106" rx="8" ry="4.5" fill="#fff" opacity=".85" transform="rotate(-28 90 106)"/>' +
      '<ellipse cx="120" cy="146" rx="60" ry="57" fill="none" stroke="#4A2410" stroke-width="4.5"/>' +
      '<g id="nj-cheeks"><ellipse cx="82" cy="164" rx="10" ry="5.5" fill="#FF4F6A"/><ellipse cx="158" cy="164" rx="10" ry="5.5" fill="#FF4F6A"/></g>' +
      '<g id="nj-face">' +
        '<g id="nj-eyesNormal">' +
          '<ellipse cx="102" cy="138" rx="15" ry="19" fill="#fff"/><ellipse cx="138" cy="138" rx="15" ry="19" fill="#fff"/>' +
          '<g clip-path="url(#nj-eyeClipL)"><g id="nj-pupilL"><circle cx="102" cy="141" r="10.5" fill="url(#nj-iris)"/><circle cx="102" cy="141" r="5.2" fill="#0E0602"/><circle cx="106" cy="136.5" r="4" fill="#fff"/><circle cx="98.5" cy="146" r="1.8" fill="#fff"/></g><rect id="nj-lidL" x="85" y="117" width="34" height="0" fill="#FF8F24"/></g>' +
          '<g clip-path="url(#nj-eyeClipR)"><g id="nj-pupilR"><circle cx="138" cy="141" r="10.5" fill="url(#nj-iris)"/><circle cx="138" cy="141" r="5.2" fill="#0E0602"/><circle cx="142" cy="136.5" r="4" fill="#fff"/><circle cx="134.5" cy="146" r="1.8" fill="#fff"/></g><rect id="nj-lidR" x="121" y="117" width="34" height="0" fill="#FF8F24"/></g>' +
          '<path id="nj-lidEdgeL" fill="none" stroke="#4A2410" stroke-width="3.5" stroke-linecap="round"/><path id="nj-lidEdgeR" fill="none" stroke="#4A2410" stroke-width="3.5" stroke-linecap="round"/>' +
          '<ellipse cx="102" cy="138" rx="15" ry="19" fill="none" stroke="#4A2410" stroke-width="3.5"/><ellipse cx="138" cy="138" rx="15" ry="19" fill="none" stroke="#4A2410" stroke-width="3.5"/>' +
        '</g>' +
        '<g id="nj-eyesStar" class="nj-off"><use id="nj-starEyeL" href="#nj-star" x="84" y="120" width="36" height="36"/><use id="nj-starEyeR" href="#nj-star" x="120" y="120" width="36" height="36"/></g>' +
        '<g id="nj-eyesHappy" class="nj-off" fill="none" stroke="#4A2410" stroke-width="5.5" stroke-linecap="round"><path d="M89 143 Q102 125 115 143"/><path d="M125 143 Q138 125 151 143"/></g>' +
        '<g id="nj-eyesDizzy" class="nj-off" fill="none" stroke="#4A2410" stroke-width="3.2" stroke-linecap="round"><ellipse cx="102" cy="138" rx="15" ry="19" fill="#fff" stroke-width="3.5"/><ellipse cx="138" cy="138" rx="15" ry="19" fill="#fff" stroke-width="3.5"/><path id="nj-spiralL"/><path id="nj-spiralR"/></g>' +
        '<g fill="none" stroke="#4A2410" stroke-width="5" stroke-linecap="round"><path id="nj-browL"/><path id="nj-browR"/></g>' +
        '<g id="nj-mouth">' +
          '<path id="nj-mSmile" d="M105 170 Q120 184 135 170" fill="none" stroke="#4A2410" stroke-width="4.5" stroke-linecap="round"/>' +
          '<g id="nj-mGrin" class="nj-off"><path d="M100 166 Q120 171 140 166 Q139 194 120 197 Q101 194 100 166 Z" fill="#7A1C12"/><g clip-path="url(#nj-mouthClip)"><path d="M98 164 Q120 170 142 164 L142 173 Q120 178 98 173 Z" fill="#fff"/><ellipse cx="120" cy="194" rx="14" ry="8" fill="#FF6F80"/></g><path d="M100 166 Q120 171 140 166 Q139 194 120 197 Q101 194 100 166 Z" fill="none" stroke="#4A2410" stroke-width="4" stroke-linejoin="round"/></g>' +
          '<g id="nj-mO" class="nj-off"><ellipse cx="120" cy="177" rx="8" ry="10.5" fill="#7A1C12" stroke="#4A2410" stroke-width="4"/><ellipse cx="120" cy="182" rx="5" ry="3" fill="#FF6F80"/></g>' +
          '<path id="nj-mWobble" class="nj-off" d="M103 177 Q109 170 115 177 Q121 184 127 177 Q133 170 138 176" fill="none" stroke="#4A2410" stroke-width="4.5" stroke-linecap="round"/>' +
          '<path id="nj-mSide" class="nj-off" d="M108 176 Q122 178 134 170" fill="none" stroke="#4A2410" stroke-width="4.5" stroke-linecap="round"/>' +
        '</g>' +
      '</g>' +
    '</g>' +
    '<g fill="none" stroke="#4A2410" stroke-width="8" stroke-linecap="round"><path id="nj-armL"/><path id="nj-armR"/></g>' +
    '<g id="nj-handL"><circle r="9" fill="#FFF4E4" stroke="#4A2410" stroke-width="3.5"/></g>' +
    '<g id="nj-handR"><ellipse id="nj-thumb" class="nj-off" cx="0" cy="-10" rx="4.5" ry="7" fill="#FFF4E4" stroke="#4A2410" stroke-width="3.5"/><ellipse id="nj-finger" class="nj-off" cx="0" cy="-13" rx="3.8" ry="9" fill="#FFF4E4" stroke="#4A2410" stroke-width="3.5"/><circle r="9" fill="#FFF4E4" stroke="#4A2410" stroke-width="3.5"/></g>' +
    '<path id="nj-sweat" class="nj-off" d="M176 96 Q170 108 176 112 Q182 108 176 96 Z" fill="#8FD0FF" stroke="#4A2410" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<g id="nj-bulb" class="nj-off"><circle cx="120" cy="40" r="13" fill="#FFE45C" stroke="#4A2410" stroke-width="3"/><rect x="114" y="52" width="12" height="7" rx="2" fill="#B9B2A8" stroke="#4A2410" stroke-width="2.5"/><path d="M120 16 V8 M100 24 L95 19 M140 24 L145 19" stroke="#4A2410" stroke-width="3" stroke-linecap="round"/></g>' +
    '<g id="nj-orbit" class="nj-off"><use id="nj-o1" href="#nj-star" width="14" height="14"/><use id="nj-o2" href="#nj-star" width="14" height="14"/><use id="nj-o3" href="#nj-star" width="14" height="14"/></g>' +
  '</g>' +
  '</svg>';

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function mount(container, opts) {
    opts = opts || {};
    if (!document.getElementById('nj-style')) {
      var st = document.createElement('style'); st.id = 'nj-style'; st.textContent = CSS; document.head.appendChild(st);
    }
    container.classList.add('nj');
    container.innerHTML =
      '<canvas class="nj-canvas"></canvas>' +
      '<div class="nj-char" title="Наранхито">' + SVG + '</div>' +
      '<div class="nj-bpos" hidden><div class="nj-bubble" role="status" aria-live="polite"></div></div>';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canvas = container.querySelector('.nj-canvas'), ctx = canvas.getContext('2d');
    var charEl = container.querySelector('.nj-char');
    var bpos = container.querySelector('.nj-bpos'), bubble = container.querySelector('.nj-bubble');
    var el = {};
    container.querySelectorAll('[id^="nj-"]').forEach(function (n) { el[n.id.slice(3)] = n; });
    function set(id, a, v) { el[id].setAttribute(a, v); }
    function f1(n) { return n.toFixed(1); }

    /* ── риг ── */
    function spring(v, k, d) { return { x: v, v: 0, t: v, k: k, d: d }; }
    var S = {
      sq: spring(1, .18, .2), rot: spring(0, .09, .22),
      aLa: spring(18, .16, .26), aLb: spring(-10, .16, .26), aRa: spring(18, .16, .26), aRb: spring(-10, .16, .26),
      lookX: spring(0, .14, .3), lookY: spring(0, .14, .3), brow: spring(0, .14, .28), tilt: spring(0, .14, .28),
      lid: spring(0, .25, .4), leaf: spring(0, .05, .1), mpop: spring(1, .22, .2), blush: spring(.45, .08, .3)
    };
    var R = { x: 0, y: 0, phase: 0, walk: 0 };
    var F = {};
    var face = { eyes: 'normal', mouth: 'smile' };
    var T = 0, lastY = 0, lastRot = 0, blinkAt = 1.5, blinkT = -1, lookAt = 2;

    function settle() { for (var k in S) { S[k].x = S[k].t; S[k].v = 0; } }
    function pose(side, a, b) { if (side === 'L') { S.aLa.t = a; S.aLb.t = b; } else { S.aRa.t = a; S.aRb.t = b; } }
    function arms(a, b) { pose('L', a, b); pose('R', a, b); }
    function setFace(eyes, mouth) {
      if (mouth && mouth !== face.mouth) S.mpop.x = .45;
      face.eyes = eyes || face.eyes; face.mouth = mouth || face.mouth;
      var E = { normal: 'eyesNormal', star: 'eyesStar', happy: 'eyesHappy', dizzy: 'eyesDizzy' };
      var M = { smile: 'mSmile', grin: 'mGrin', o: 'mO', wobble: 'mWobble', side: 'mSide' };
      for (var e in E) el[E[e]].classList.toggle('nj-off', e !== face.eyes);
      for (var m in M) el[M[m]].classList.toggle('nj-off', m !== face.mouth);
    }
    function spiral(cx, cy) {
      var d = '';
      for (var i = 0; i <= 60; i++) { var a = i / 60 * Math.PI * 5, r = 1 + i / 60 * 11; d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * r) + ' ' + f1(cy + Math.sin(a) * r * 1.2); }
      return d;
    }
    set('spiralL', 'd', spiral(102, 138)); set('spiralR', 'd', spiral(138, 138));

    function render() {
      var t = T, sq = S.sq.x + (reduce ? 0 : Math.sin(t * 2.6) * .014), bob = 0;
      if (!reduce) {
        if (F.bounce) { var h = Math.abs(Math.sin(t * 5)); bob = h * 16; sq += h < .18 ? -.1 * (1 - h / .18) : .03; }
        if (F.bop) { var h2 = Math.abs(Math.sin(t * 3.2)); bob = h2 * 5; }
        if (F.wave) { S.aRa.t = 152 + Math.sin(t * 9) * 10; S.aRb.t = -20 + Math.sin(t * 9 + .9) * 38; }
        if (F.scratch) S.aRb.t = 58 + Math.sin(t * 20) * 14;
        if (F.tap) S.aLb.t = -140 + Math.sin(t * 7) * 8;
        if (R.walk) {
          R.phase += .22; bob += Math.abs(Math.sin(R.phase)) * 6 * R.walk;
          S.aLa.t = 22 + Math.sin(R.phase) * 28; S.aRa.t = 22 - Math.sin(R.phase) * 28; S.rot.t = Math.sin(R.phase) * 4;
        }
        if (t > blinkAt) { blinkT = t; blinkAt = t + 2 + Math.random() * 2.5; }
        if (F.autoLook && t > lookAt) {
          var back = Math.random() < .5;
          S.lookX.t = back ? 0 : (Math.random() - .5) * 1.4; S.lookY.t = back ? 0 : (Math.random() - .5) * .6;
          lookAt = t + 1.2 + Math.random() * 2;
        }
      }
      var blink = blinkT >= 0 ? Math.max(0, 1 - Math.abs((t - blinkT) - .08) / .08) : 0;
      var vy = (R.y + bob) - lastY, vr = S.rot.x - lastRot;
      lastY = R.y + bob; lastRot = S.rot.x;
      S.leaf.t = Math.max(-50, Math.min(50, vy * 3 - vr * 2.2 + (reduce ? 0 : Math.sin(t * 1.8) * 5)));
      S.leaf.v += -vr * .08;
      for (var k in S) { var s = S[k]; s.v += (s.t - s.x) * s.k - s.v * s.d; s.x += s.v; }

      var sx = 1 + (1 - sq) * .85, Y = R.y + bob;
      set('root', 'transform', 'translate(' + f1(R.x) + ' ' + f1(-Y) + ') rotate(' + f1(S.rot.x) + ' 120 240)');
      set('bodyG', 'transform', 'translate(120 204) scale(' + sx.toFixed(3) + ' ' + sq.toFixed(3) + ') translate(-120 -204)');
      set('leaf', 'transform', 'rotate(' + f1(S.leaf.x) + ' 123 80)');
      set('face', 'transform', 'translate(' + f1(S.lookX.x * 3) + ' ' + f1(S.lookY.x * 2) + ')');
      var pt = 'translate(' + f1(S.lookX.x * 4.5) + ' ' + f1(S.lookY.x * 5) + ')';
      set('pupilL', 'transform', pt); set('pupilR', 'transform', pt);
      set('cheeks', 'opacity', Math.max(0, Math.min(1, S.blush.x)).toFixed(2));

      var lid = Math.max(0, Math.min(1, Math.max(S.lid.x, blink))), lh = lid * 40, ly = 117 + lh;
      set('lidL', 'height', f1(lh)); set('lidR', 'height', f1(lh));
      if (lid > .04) {
        set('lidEdgeL', 'd', 'M88 ' + f1(ly) + ' Q102 ' + f1(ly + 2) + ' 116 ' + f1(ly));
        set('lidEdgeR', 'd', 'M124 ' + f1(ly) + ' Q138 ' + f1(ly + 2) + ' 152 ' + f1(ly));
      } else { set('lidEdgeL', 'd', ''); set('lidEdgeR', 'd', ''); }

      var b = S.brow.x * 7, tl = S.tilt.x;
      set('browL', 'd', 'M87 ' + f1(106 - b + tl * 3) + ' Q99 ' + f1(99 - b - tl) + ' 112 ' + f1(103 - b - tl * 7));
      set('browR', 'd', 'M153 ' + f1(106 - b + tl * 3) + ' Q141 ' + f1(99 - b - tl) + ' 128 ' + f1(103 - b - tl * 7));
      set('mouth', 'transform', 'translate(120 176) scale(' + S.mpop.x.toFixed(3) + ') translate(-120 -176)');

      if (face.eyes === 'star') {
        var p = 1 + Math.sin(t * 9) * .1, r = Math.sin(t * 5) * 10;
        set('starEyeL', 'transform', 'rotate(' + f1(r) + ' 102 138) translate(102 138) scale(' + p.toFixed(3) + ') translate(-102 -138)');
        set('starEyeR', 'transform', 'rotate(' + f1(-r) + ' 138 138) translate(138 138) scale(' + p.toFixed(3) + ') translate(-138 -138)');
      }
      if (face.eyes === 'dizzy') {
        set('spiralL', 'transform', 'rotate(' + f1(t * 420) + ' 102 138)');
        set('spiralR', 'transform', 'rotate(' + f1(t * 420) + ' 138 138)');
      }
      if (F.flame) {
        var fs = 1 + Math.sin(t * 19) * .07, fy = 1 + Math.sin(t * 14) * .12;
        set('flame', 'transform', 'translate(98 80) scale(' + fs.toFixed(3) + ' ' + fy.toFixed(3) + ') rotate(' + f1(Math.sin(t * 11) * 5) + ') translate(-98 -80)');
      }
      if (F.bulb) set('bulb', 'transform', 'translate(0 ' + f1(Math.sin(t * 4) * 3) + ')');

      function squash(px, py) { return [120 + (px - 120) * sx, 204 + (py - 204) * sq]; }
      function arm(side, a, bb, pid, hid) {
        var sh = squash(side < 0 ? 68 : 172, 152), ra = a * Math.PI / 180, rb = (a + bb) * Math.PI / 180;
        var ex = sh[0] + side * Math.sin(ra) * 30, ey = sh[1] + Math.cos(ra) * 30;
        var hx = ex + side * Math.sin(rb) * 27, hy = ey + Math.cos(rb) * 27;
        set(pid, 'd', 'M' + f1(sh[0]) + ' ' + f1(sh[1]) + ' Q' + f1(2 * ex - (sh[0] + hx) / 2) + ' ' + f1(2 * ey - (sh[1] + hy) / 2) + ' ' + f1(hx) + ' ' + f1(hy));
        set(hid, 'transform', 'translate(' + f1(hx) + ' ' + f1(hy) + ')');
      }
      arm(-1, S.aLa.x, S.aLb.x, 'armL', 'handL');
      arm(1, S.aRa.x, S.aRb.x, 'armR', 'handR');
      function leg(side, pid, sid) {
        var hip = squash(side < 0 ? 106 : 134, 196), fx = side < 0 ? 100 : 140, lift = 0;
        if (R.walk) { fx += Math.sin(R.phase) * 12 * (side < 0 ? 1 : -1) * R.walk; lift = Math.max(0, Math.cos(R.phase) * (side < 0 ? 1 : -1)) * 9 * R.walk; }
        var fy = 232 + Y - lift, dx = fx - hip[0], dy = fy - hip[1], dist = Math.sqrt(dx * dx + dy * dy), max = 40;
        if (dist > max) { fx = hip[0] + dx / dist * max; fy = hip[1] + dy / dist * max; dist = max; }
        var bend = Math.max(0, max - dist) * 1.2 * side;
        set(pid, 'd', 'M' + f1(hip[0]) + ' ' + f1(hip[1]) + ' Q' + f1((hip[0] + fx) / 2 + bend) + ' ' + f1((hip[1] + fy) / 2) + ' ' + f1(fx) + ' ' + f1(fy));
        set(sid, 'transform', 'translate(' + f1(fx + side * 5) + ' ' + f1(fy + 2) + ')');
      }
      leg(-1, 'legL', 'shoeL'); leg(1, 'legR', 'shoeR');

      el.thumb.classList.toggle('nj-off', !F.thumb);
      el.finger.classList.toggle('nj-off', !F.finger);
      el.sweat.classList.toggle('nj-off', !F.sweat);
      el.flame.classList.toggle('nj-off', !F.flame);
      el.bulb.classList.toggle('nj-off', !F.bulb);
      if (F.sweat) set('sweat', 'transform', 'translate(0 ' + f1((t * 14) % 10) + ')');
      el.orbit.classList.toggle('nj-off', !F.dizzy);
      if (F.dizzy) ['o1', 'o2', 'o3'].forEach(function (id, i) {
        var a = t * 5 + i * 2.094; set(id, 'x', f1(120 + Math.cos(a) * 42 - 7)); set(id, 'y', f1(78 + Math.sin(a) * 11 - 7));
      });
      var air = Math.min(Y, 160) / 160;
      set('shadow', 'cx', f1(120 + R.x)); set('shadow', 'rx', f1(52 * (1 - air * .55)));
      set('shadow', 'opacity', (.16 * (1 - air * .6)).toFixed(3));
    }

    /* ── таймлайн ── */
    var runs = [], token = 0;
    function run(dur, fn) { return new Promise(function (res) { runs.push({ t0: performance.now(), dur: dur, fn: fn, res: res }); }); }
    function wait(ms) { return run(ms, function () {}); }
    var ease = {
      out: function (k) { return 1 - Math.pow(1 - k, 3); },
      inOut: function (k) { return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
    };
    function frame(now) {
      T = now / 1000;
      var done = [];
      runs.forEach(function (r) { var k = Math.min(1, (now - r.t0) / r.dur); r.fn(k); if (k >= 1) done.push(r); });
      done.forEach(function (r) { runs.splice(runs.indexOf(r), 1); r.res(); });
      render();
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // начать новую реакцию: прервать старую
    function begin() {
      token++;
      runs.forEach(function (r) { r.res(); }); runs = [];
      var t = token;
      return function () { return t === token; };
    }

    /* ── звук ── */
    var soundOn = false, audio = null;
    function tone(freq, when, dur, type, vol, to) {
      if (!soundOn || !audio) return;
      var t = audio.currentTime + (when || 0), o = audio.createOscillator(), g = audio.createGain();
      o.type = type || 'triangle'; o.frequency.setValueAtTime(freq, t);
      if (to) o.frequency.exponentialRampToValueAtTime(to, t + (dur || .25));
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol || .14, t + .02);
      g.gain.exponentialRampToValueAtTime(.0001, t + (dur || .25));
      o.connect(g).connect(audio.destination); o.start(t); o.stop(t + (dur || .25) + .05);
    }
    function boing() { tone(220, 0, .28, 'sine', .15, 660); }
    function haptic(kind) {
      var tg = global.Telegram && global.Telegram.WebApp;
      try {
        if (tg && tg.HapticFeedback) {
          if (kind === 'success' || kind === 'error' || kind === 'warning') tg.HapticFeedback.notificationOccurred(kind);
          else tg.HapticFeedback.impactOccurred(kind || 'light');
        } else if (navigator.vibrate) navigator.vibrate(kind === 'error' ? [20, 40, 20] : 12);
      } catch (e) {}
    }

    /* ── частицы ── */
    var parts = [], fxRaf = 0;
    function sizeCanvas() {
      var r = canvas.getBoundingClientRect(), d = window.devicePixelRatio || 1;
      canvas.width = r.width * d; canvas.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    }
    function headPoint() {
      var cr = canvas.getBoundingClientRect(), sr = charEl.getBoundingClientRect(), sc = sr.width / 240;
      return { x: sr.left - cr.left + (120 + R.x) * sc, y: sr.top - cr.top + (140 - R.y) * sc, sc: sc };
    }
    function burst(n, mode) {
      if (reduce) return;
      sizeCanvas();
      var r = canvas.getBoundingClientRect(), hp = headPoint();
      var colors = ['#C60B1E', '#FFC400', '#F26B1D', '#FFD23F', '#C60B1E', '#43B04F'];
      for (var i = 0; i < n; i++) {
        if (mode === 'drizzle') {
          parts.push({ x: Math.random() * r.width, y: -10 - Math.random() * 140, vx: (Math.random() - .5) * .6, vy: 1 + Math.random() * 1.2, g: .02, rot: 0, vr: (Math.random() - .5) * .1, s: 5 + Math.random() * 4, kind: 'star', c: '#F5B301' });
        } else if (mode === 'smoke') {
          parts.push({ x: hp.x - 22 * hp.sc + (Math.random() - .5) * 20, y: hp.y - 80 * hp.sc, vx: (Math.random() - .5) * 1.2, vy: -1 - Math.random(), g: -.01, rot: 0, vr: 0, s: 6 + Math.random() * 6, kind: 'smoke', c: 'rgba(130,120,110,.5)', life: 1 });
        } else if (mode === 'sparks') {
          var a0 = Math.random() * Math.PI * 2, sp0 = 2 + Math.random() * 3;
          parts.push({ x: hp.x, y: hp.y - 20 * hp.sc, vx: Math.cos(a0) * sp0, vy: Math.sin(a0) * sp0 - 2, g: .12, rot: 0, vr: .2, s: 4 + Math.random() * 3, kind: 'star', c: '#F5B301' });
        } else {
          var a = -Math.PI / 2 + (Math.random() - .5) * 2.4, sp = (mode === 'mini' ? 3.5 : 5) + Math.random() * (mode === 'mini' ? 5 : 8);
          parts.push({ x: hp.x, y: hp.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: .22, rot: Math.random() * 6, vr: (Math.random() - .5) * .4, s: 5 + Math.random() * 5, kind: Math.random() < .2 ? 'orange' : 'rect', c: colors[i % colors.length] });
        }
      }
      if (!fxRaf) fxRaf = requestAnimationFrame(fxStep);
    }
    function drawStar(s) {
      ctx.beginPath();
      for (var k = 0; k < 10; k++) { var rr = k % 2 ? s * .45 : s, an = -Math.PI / 2 + k * Math.PI / 5; ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); }
      ctx.closePath(); ctx.fill();
    }
    function fxStep() {
      var r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      parts = parts.filter(function (p) { return p.y < r.height + 20 && p.y > -40 && (p.life === undefined || p.life > 0); });
      parts.forEach(function (p) {
        p.vy += p.g; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.life !== undefined) { p.life -= .02; p.s += .25; }
        if (p.kind === 'rect' && p.vy > 0) p.vx += Math.sin(p.y / 18) * .05;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
        if (p.life !== undefined) ctx.globalAlpha = Math.max(0, p.life);
        if (p.kind === 'rect') ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        else if (p.kind === 'star') drawStar(p.s);
        else if (p.kind === 'smoke') { ctx.beginPath(); ctx.arc(0, 0, p.s, 0, 7); ctx.fill(); }
        else { ctx.beginPath(); ctx.arc(0, 0, p.s * .6, 0, 7); ctx.fill(); ctx.fillStyle = '#43B04F'; ctx.fillRect(-1, -p.s, 3, 3); }
        ctx.restore();
      });
      fxRaf = parts.length ? requestAnimationFrame(fxStep) : 0;
    }
    function dust() {
      if (reduce) return;
      var cr = container.getBoundingClientRect(), sr = charEl.getBoundingClientRect(), sc = sr.width / 240;
      var cx = sr.left - cr.left + (120 + R.x) * sc;
      for (var i = 0; i < 8; i++) {
        var d = document.createElement('div');
        d.className = 'nj-dust'; d.style.left = (cx - 6) + 'px'; d.style.bottom = (18 * sc) + 'px';
        container.appendChild(d);
        var dx = (i < 4 ? -1 : 1) * (20 + Math.random() * 50);
        d.animate([{ transform: 'translate(0,0) scale(.4)', opacity: .9 }, { transform: 'translate(' + dx + 'px,' + (-8 - Math.random() * 20) + 'px) scale(1.8)', opacity: 0 }],
          { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = (function (x) { return function () { x.remove(); }; })(d);
      }
    }

    /* ── реплики ── */
    var bubbleTimer = 0;
    function say(es, ru, o) {
      o = o || {};
      clearTimeout(bubbleTimer);
      bubble.innerHTML = '';
      if (es) { var b = document.createElement('b'); b.textContent = es; bubble.appendChild(b); }
      if (ru) { var s = document.createElement('span'); s.textContent = ru; bubble.appendChild(s); }
      if (o.button) {
        var btn = document.createElement('button'); btn.type = 'button'; btn.textContent = o.button;
        btn.addEventListener('click', function (e) { e.stopPropagation(); o.onClick && o.onClick(); });
        bubble.appendChild(btn);
      }
      bpos.hidden = false;
      if (!reduce) bubble.animate([{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.06)', opacity: 1, offset: .65 }, { transform: 'scale(1)' }], { duration: 360, easing: 'ease-out' });
      if (o.ms) bubbleTimer = setTimeout(hideBubble, o.ms);
    }
    function hideBubble() {
      clearTimeout(bubbleTimer);
      if (bpos.hidden) return;
      if (reduce) { bpos.hidden = true; return; }
      bubble.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(.6)', opacity: 0 }], { duration: 160 }).onfinish = function () { bpos.hidden = true; };
    }

    /* ── базовое состояние ── */
    var streakFire = false;
    function calm(keepFace) {
      R.walk = 0;
      var fire = streakFire;
      ['bounce', 'bop', 'wave', 'scratch', 'tap', 'dizzy', 'sweat', 'thumb', 'finger', 'bulb'].forEach(function (k) { F[k] = false; });
      F.flame = fire; F.autoLook = true;
      S.sq.t = 1; S.rot.t = 0; S.brow.t = fire ? .5 : 0; S.tilt.t = 0; S.lid.t = 0; S.blush.t = fire ? .8 : .45;
      arms(18, -10);
      if (!keepFace) setFace('normal', fire ? 'grin' : 'smile');
    }
    function hop(h, dur) {
      S.sq.x = 1.2; S.sq.v = 0;
      return run(dur || 380, function (k) { R.y = h * 4 * k * (1 - k); }).then(function () { R.y = 0; S.sq.x = .78; S.sq.v = 0; });
    }

    /* ================================================================
       РЕАКЦИИ
       ================================================================ */
    var api = {};
    var big = false;

    api.say = say;
    api.hide = hideBubble;
    api.setSound = function (on) {
      soundOn = !!on;
      try { if (soundOn && !audio) audio = new (global.AudioContext || global.webkitAudioContext)(); if (audio) audio.resume(); } catch (e) { soundOn = false; }
    };

    api.greet = async function () {
      var live = begin(); calm(); streakFire = false; F.flame = false;
      R.x = 0; R.y = -300; settle(); R.y = -300;
      S.sq.x = 1.35; boing();
      await run(420, function (k) { R.y = -300 * (1 - ease.out(k)); }); if (!live()) return;
      R.y = 0; S.sq.x = .68; S.sq.v = 0;
      setFace('happy', 'grin'); S.brow.t = .6; F.wave = true; S.rot.t = -4;
      say(opts.greetEs || '¡Hola! Soy Naranjito', opts.greetRu || 'Я буду с тобой всю игру. ¡Vamos!');
      await wait(1800); if (!live()) return;
      calm(); S.lookY.t = .7; S.lookX.t = .5; F.autoLook = false;
      await wait(700); if (!live()) return;
      F.autoLook = true;
    };

    api.question = async function (n, total) {
      var live = begin(); calm(); hideBubble();
      S.lookX.t = .5; S.lookY.t = .8; F.autoLook = false;
      await hop(18, 300); if (!live()) return;
      await wait(900); if (!live()) return;
      F.autoLook = true;
    };

    var CORRECT = [['¡Bien!', 'Верно'], ['¡Correcto!', 'Точно'], ['¡Eso es!', 'Именно так'], ['¡Genial!', 'Здорово'], ['¡Muy bien!', 'Отлично'], ['¡Exacto!', 'В точку']];
    api.correct = async function (streak) {
      window.dispatchEvent(new CustomEvent('vamos:correct'));
      var live = begin(); streak = streak || 1;
      haptic('success');
      if (streak >= 3) {
        var ignite = !streakFire; streakFire = true; calm(true); F.flame = true;
        setFace('star', 'grin'); S.brow.t = .9; S.blush.t = 1;
        arms(40, 100);
        if (ignite) { burst(14, 'sparks'); tone(300, 0, .3, 'sawtooth', .05, 900); }
        say('¡En racha!', 'Серия ×' + streak + (streak >= 5 ? ' — ты в ударе!' : ' — горишь!'), { ms: 1800 });
        S.sq.x = 1.3; S.sq.v = 0; boing();
        var flip = streak % 5 === 0;
        await run(flip ? 700 : 480, function (k) {
          R.y = (flip ? 110 : 60) * 4 * k * (1 - k);
          if (flip) S.rot.x = S.rot.t = 360 * ease.inOut(k);
        });
        if (!live()) return;
        R.y = 0; S.rot.x = S.rot.t = 0; S.sq.x = .65; S.sq.v = 0;
        arms(150, -15);
        tone(523, 0, .15); tone(659, .07, .15); tone(784, .14, .3);
        if (flip) burst(70, 'mini');
      } else {
        calm(true);
        var line = pick(CORRECT);
        setFace('happy', 'grin'); S.brow.t = .6; S.blush.t = .8;
        pose('L', 30, -40); pose('R', 40, -60);
        say(line[0], line[1], { ms: 1400 });
        S.sq.x = 1.25; S.sq.v = 0;
        await run(420, function (k) { R.y = 40 * 4 * k * (1 - k); }); if (!live()) return;
        R.y = 0; S.sq.x = .72; S.sq.v = 0;
        pose('R', 165, -25); tone(660, 0, .12); tone(880, .08, .22);
      }
      await wait(900); if (!live()) return;
      calm();
    };

    api.wrong = async function (ruleEs, ruleRu) {
      var live = begin();
      haptic('error');
      var lostFire = streakFire; streakFire = false;
      calm(true); F.flame = false;
      if (lostFire) burst(16, 'smoke');
      setFace('normal', 'o'); S.brow.t = 1.1; S.lid.t = 0;
      pose('L', 35, -150); pose('R', 35, -150);           // ладошки к щекам
      S.sq.x = .8; S.sq.v = 0; S.lookX.t = .4; S.lookY.t = .6; F.autoLook = false;
      tone(420, 0, .18, 'sine', .12, 280);
      say(lostFire ? '¡Ay, ay, ay!' : pick(['¡Uy!', '¡Ups!', '¡Ay!']), lostFire ? 'Серия прервалась…' : 'Бывает!');
      await run(420, function (k) { S.rot.t = Math.sin(k * Math.PI * 4) * 5; }); if (!live()) return;
      S.rot.t = 0;
      await wait(400); if (!live()) return;
      // «смотри, как правильно»: палец вверх, объясняет
      setFace('normal', 'side'); S.brow.t = .3; S.tilt.t = .3; S.lookX.t = 0; S.lookY.t = 0;
      pose('L', 20, -10); pose('R', 165, -8); F.finger = true;
      if (ruleEs || ruleRu) say(ruleEs, ruleRu);
      await wait(700); if (!live()) return;
      F.autoLook = true;
    };

    api.think = async function () {
      var live = begin(); calm(true);
      setFace('normal', 'side'); S.tilt.t = .5; S.brow.t = .2; F.autoLook = false;
      S.lookX.t = -.9; S.lookY.t = -.9;
      pose('R', 40, -140); pose('L', 18, -10); F.bop = true;
      say('Hmm…', opts.thinkRu || 'Не спеши. Нажми на меня — подскажу.');
      await wait(2500); if (!live()) return;
      S.lookX.t = .4; S.lookY.t = .8;
    };

    api.hint = async function (es, ru) {
      var live = begin(); calm(true);
      F.bulb = true; setFace('normal', 'grin'); S.brow.t = 1; S.lookX.t = 0; S.lookY.t = 0; F.autoLook = false;
      pose('R', 165, -8); F.finger = true;
      tone(880, 0, .12, 'sine'); tone(1320, .08, .2, 'sine');
      await hop(24, 320); if (!live()) return;
      say(es || '¡Idea!', ru);
      await wait(1600); if (!live()) return;
      F.bulb = false; F.autoLook = true;
    };

    api.halfway = async function () {
      var live = begin(); calm(true);
      setFace('happy', 'grin'); S.brow.t = .7;
      say('¡La mitad!', 'Половина пути позади — так держать!', { ms: 1800 });
      S.sq.x = 1.25; S.sq.v = 0; boing();
      arms(60, 90);
      await run(650, function (k) { R.y = 70 * 4 * k * (1 - k); S.rot.x = S.rot.t = -360 * ease.inOut(k); }); if (!live()) return;
      R.y = 0; S.rot.x = S.rot.t = 0; S.sq.x = .7; S.sq.v = 0; arms(150, -15);
      burst(20, 'sparks');
      await wait(1000); if (!live()) return;
      calm();
    };

    api.last = async function () {
      var live = begin(); calm(true);
      setFace('normal', 'grin'); S.brow.t = -.4; S.tilt.t = -.7; S.sq.t = .85;
      pose('L', 40, -120); pose('R', 40, -120);
      say('¡La última!', 'Последний вопрос — соберись!', { ms: 1800 });
      await run(500, function (k) { S.rot.t = Math.sin(k * Math.PI * 6) * 2; }); if (!live()) return;
      S.rot.t = 0; S.sq.t = 1;
      await wait(800); if (!live()) return;
      calm();
    };

    var pokes = [];
    api.poke = async function () {
      if (api.onPoke && api.onPoke() === true) return;   // обработано снаружи
      var now = performance.now();
      pokes = pokes.filter(function (t) { return now - t < 2500; }); pokes.push(now);
      var live = begin(); haptic('light');
      if (pokes.length >= 5) {
        pokes = [];
        calm(true); setFace('dizzy', 'wobble'); F.dizzy = true; S.sq.x = .7; S.sq.v = 0;
        say('¡Basta ya!', 'Хватит щекотать, голова кружится!');
        await run(700, function (k) { S.rot.t = Math.sin(k * Math.PI * 5) * 10; }); if (!live()) return;
        S.rot.t = 0;
        await wait(700); if (!live()) return;
        calm(); hideBubble();
        return;
      }
      calm(true);
      setFace('happy', 'grin'); S.blush.t = 1.1; S.sq.x = .72; S.sq.v = 0;
      arms(40, -130);
      var l = pick([['¡Jaja!', 'Щекотно!'], ['¡Oye!', 'Эй, я работаю!'], ['¡Hola, hola!', 'Я тут, я тут'], ['¡Jeje!', 'Ещё разок?']]);
      say(l[0], l[1], { ms: 1300 });
      tone(700, 0, .08, 'square', .05); tone(900, .09, .08, 'square', .05); tone(1100, .18, .1, 'square', .05);
      await run(500, function (k) { S.rot.t = Math.sin(k * Math.PI * 6) * 7; }); if (!live()) return;
      S.rot.t = 0;
      await wait(500); if (!live()) return;
      calm();
    };
    charEl.addEventListener('click', function (e) { e.stopPropagation(); if (!big) api.poke(); });

    api.result = async function (pct) {
      var live = begin(); streakFire = false; calm(); hideBubble();
      big = true; container.classList.add('nj-big');
      await wait(reduce ? 0 : 650); if (!live()) return;
      if (pct >= 90) {
        haptic('success');
        S.brow.t = .4; F.autoLook = false;
        S.sq.t = .7; arms(35, -50); S.brow.t = -.3; S.tilt.t = -.5; S.lookY.t = .6;
        await wait(320); if (!live()) return;
        S.sq.t = 1; S.sq.x = 1.3; S.sq.v = 0; S.tilt.t = 0; S.brow.t = .8; S.lookY.t = 0; boing();
        arms(50, 100);
        var starred = false;
        await run(780, function (k) {
          R.y = 150 * 4 * k * (1 - k); S.rot.x = S.rot.t = 360 * ease.inOut(k);
          if (k > .35 && !starred) { starred = true; setFace('star', 'grin'); }
        });
        if (!live()) return;
        S.rot.x = S.rot.t = 0; R.y = 0; S.sq.x = .6; S.sq.v = 0;
        arms(150, -15); S.blush.t = .9;
        burst(160);
        tone(523, 0, .2); tone(659, .08, .2); tone(784, .16, .4);
        await wait(450); if (!live()) return;
        F.bounce = true;
        var e1 = pick([['¡Olé!', 'Идеально, так держать'], ['¡Eres un crack!', 'Ты просто звезда'], ['¡Perfecto!', 'Почти без запинки']]);
        say(e1[0], e1[1]);
      } else if (pct >= 60) {
        haptic('success');
        await hop(50, 450); if (!live()) return;
        setFace('happy', 'grin'); S.brow.t = .6; S.blush.t = .7; S.rot.t = -5;
        pose('L', 55, -115); F.wave = true;
        tone(587, 0, .18); tone(740, .1, .25);
        burst(30, 'drizzle');
        var g1 = pick([['¡Muy bien!', 'Очень хорошо'], ['¡Bien hecho!', 'Хорошая работа'], ['¡Casi!', 'Ещё чуть-чуть до идеала']]);
        say(g1[0], g1[1]);
      } else {
        haptic('warning');
        // пытается подпрыгнуть от радости — и падает
        setFace('happy', 'grin');
        S.sq.x = 1.2; S.sq.v = 0;
        await run(300, function (k) { R.y = 30 * 4 * k * (1 - k); }); if (!live()) return;
        setFace('normal', 'o'); S.brow.t = 1; pose('L', 150, 40); pose('R', 150, 40);
        tone(420, 0, .15, 'sine', .12, 300);
        S.rot.k = .2; S.rot.t = 78;
        await run(320, function (k) { R.y = 20 * 4 * k * (1 - k); R.x = -70 * k; }); if (!live()) return;
        R.y = 0; S.sq.x = .66; S.sq.v = 0; S.rot.k = .09;
        setFace('dizzy', 'wobble'); F.dizzy = true; arms(70, 20);
        dust(); tone(130, 0, .35, 'sine', .22, 70);
        await wait(1100); if (!live()) return;
        F.dizzy = false; setFace('normal', 'o'); S.brow.t = .4; S.rot.t = 0; arms(18, -10); boing();
        await run(420, function (k) { R.x = -70 * (1 - ease.out(k)); }); if (!live()) return;
        await run(520, function (k) { S.lookX.t = Math.sin(k * Math.PI * 4) * 1.1; S.rot.t = Math.sin(k * Math.PI * 4) * 4; }); if (!live()) return;
        S.lookX.t = 0; S.rot.t = 0;
        setFace('happy', 'wobble'); F.sweat = true; S.blush.t = 1.1; S.tilt.t = .6; pose('R', 170, 58); F.scratch = true;
        await wait(1000); if (!live()) return;
        F.scratch = false; F.sweat = false; S.tilt.t = 0; S.brow.t = .5; S.blush.t = .6;
        setFace('normal', 'grin'); pose('R', 70, 92); F.thumb = true; S.sq.x = .8;
        tone(440, 0, .2, 'sine', .12); tone(554, .12, .3, 'sine', .12);
        var f1l = pick([['¡Ánimo!', 'Ещё разок? Во второй раз легче'], ['¡No pasa nada!', 'Ничего страшного, попробуем снова'], ['¡Otra vez!', 'Давай ещё раз — у тебя получится']]);
        say(f1l[0], f1l[1]);
      }
    };

    // мгновенно показать итог (например, по тапу)
    api.skip = function (pct) {
      if (!big) return;
      begin(); parts = []; ctx.clearRect(0, 0, canvas.width, canvas.height);
      container.querySelectorAll('.nj-dust').forEach(function (d) { d.remove(); });
      R.x = 0; R.y = 0; calm(true); S.rot.k = .09;
      if (pct >= 90) { setFace('star', 'grin'); arms(150, -15); S.brow.t = .9; F.bounce = true; }
      else if (pct >= 60) { setFace('happy', 'grin'); pose('L', 55, -115); F.wave = true; S.brow.t = .6; }
      else { setFace('normal', 'grin'); pose('R', 70, 92); F.thumb = true; S.brow.t = .5; }
      settle();
    };

    api.reset = function () {
      begin(); big = false; streakFire = false; container.classList.remove('nj-big');
      R.x = 0; R.y = 0; calm(); settle(); hideBubble();
    };

    api.isBig = function () { return big; };

    /* Вызывается из orange-throw.js когда апельсин попал в корзинку */
    api.wave = async function () {
      var live = begin();
      setFace('happy', 'grin'); S.brow.t = .7; S.blush.t = .9;
      S.sq.x = 1.2; S.sq.v = 0;
      await run(280, function (k) { R.y = 28 * 4 * k * (1 - k); }); if (!live()) return;
      R.y = 0; S.sq.x = .78; S.sq.v = 0;
      F.wave = true; burst(8, 'mini');
      tone(660, 0, .1); tone(784, .07, .18);
      await wait(1700); if (!live()) return;
      F.wave = false; calm();
    };

    window.addEventListener('vamos:scored', function () { api.wave(); });

    calm(); settle();
    if (reduce) { /* без движения: персонаж просто стоит */ }
    return api;
  }

  global.Naranjito = { mount: mount };
})(window);
