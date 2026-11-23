// Site-wide progressive enhancements. Everything degrades to static, readable content.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Split headlines into masked lines ---------- */
// [data-split] headings: wrap each word, then group by rendered line.
function splitLines(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  const text = el.textContent?.trim() ?? '';
  const words = text.split(/\s+/);
  el.setAttribute('aria-label', text);
  el.innerHTML = words.map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
  const spans = [...el.querySelectorAll<HTMLSpanElement>('.w')];
  const lines: string[][] = [];
  let top = -1;
  spans.forEach((s) => {
    if (!lines.length || Math.abs(s.offsetTop - top) > 4) {
      lines.push([]);
      top = s.offsetTop;
    }
    lines[lines.length - 1].push(s.textContent ?? '');
  });
  el.innerHTML = lines
    .map(
      (l, i) => `<span class="line" aria-hidden="true" style="--l:${i}"><span>${l.join(' ')}</span></span>`,
    )
    .join('');
  el.dataset.splitDone = '1';
}
if (!reduceMotion) {
  document.fonts.ready.then(() => {
    document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitLines);
    observeReveals();
  });
} else {
  document.querySelectorAll('[data-reveal],[data-split]').forEach((el) => el.classList.add('is-in'));
}

/* ---------- Reveal on scroll ---------- */
function observeReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  document.querySelectorAll('[data-reveal],[data-split]').forEach((el) => io.observe(el));
}

/* ---------- Count-up numbers ---------- */
// <span data-count="2.5" data-suffix="M+" data-decimals="1">2.5M+</span>
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
if (counters.length && !reduceMotion) {
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        cio.unobserve(el);
        const end = parseFloat(el.dataset.count!);
        const start = parseFloat(el.dataset.from ?? '0');
        const dec = parseInt(el.dataset.decimals ?? '0', 10);
        const pre = el.dataset.prefix ?? '';
        const suf = el.dataset.suffix ?? '';
        const dur = 1600;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = pre + (start + (end - start) * eased).toFixed(dec) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 },
  );
  counters.forEach((c) => cio.observe(c));
}

/* ---------- Carousels ---------- */
// [data-carousel] > [data-track] (scroll-snap) + [data-prev]/[data-next] buttons.
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const dots = root.querySelectorAll<HTMLButtonElement>('[data-dot]');
  if (!track) return;
  const items = () => [...track.children] as HTMLElement[];
  const step = () => {
    const first = items()[0];
    if (!first) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    return first.getBoundingClientRect().width + gap;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    if (prev) prev.disabled = track.scrollLeft <= 2;
    if (next) next.disabled = track.scrollLeft >= max;
    const idx = Math.round(track.scrollLeft / step());
    items().forEach((it, i) => it.classList.toggle('is-active', i === idx));
    dots.forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
  };
  prev?.addEventListener('click', () =>
    track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }),
  );
  next?.addEventListener('click', () =>
    track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }),
  );
  dots.forEach((d, i) =>
    d.addEventListener('click', () =>
      track.scrollTo({ left: i * step(), behavior: reduceMotion ? 'auto' : 'smooth' }),
    ),
  );
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);
  update();
});

/* ---------- Tabs (benefits lists etc.) ---------- */
// [data-tabs] with [role=tab] buttons controlling [role=tabpanel] panels.
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('mouseenter', () => root.dataset.tabs === 'hover' && select(t));
    t.addEventListener('keydown', (e) => {
      const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in keys) {
        e.preventDefault();
        select(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
      } else if (e.key === 'Home') select(tabs[0], true);
      else if (e.key === 'End') select(tabs[tabs.length - 1], true);
    });
  });
});

/* ---------- Pointer-follow glow on cards ---------- */
document.querySelectorAll<HTMLElement>('[data-glow]').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

/* ---------- Tilt cards ---------- */
if (matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.tilt || '6');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add('is-tilting');
      el.style.setProperty('--ry', `${x * max}deg`);
      el.style.setProperty('--rx', `${-y * max}deg`);
      el.style.setProperty('--ty', '-4px');
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--ty', '0');
    });
  });

  /* ---------- Magnetic buttons ---------- */
  document.querySelectorAll<HTMLElement>('.btn:not(.btn-sm)').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.translate = `${x * 0.18}px ${y * 0.25}px`;
    });
    el.addEventListener('pointerleave', () => (el.style.translate = ''));
  });
}

/* ---------- Back to top + scroll progress ---------- */
const toTop = document.querySelector<HTMLButtonElement>('[data-to-top]');
if (toTop) {
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    toTop.style.setProperty('--p', p.toFixed(3));
    toTop.classList.toggle('is-visible', scrollY > innerHeight * 1.2);
  };
  addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  toTop.addEventListener('click', () => {
    scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  });
  onScroll();
}
