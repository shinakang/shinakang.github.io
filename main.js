/*╔══════════════════════════════════════════════════════════╗
  ║  main.js — all interaction mechanisms                   ║
  ║  Depends on: data.js (projectData, imageLayouts)        ║
  ╚══════════════════════════════════════════════════════════╝*/

/* ── CURSOR ─────────────────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px'; });
  document.addEventListener('mouseover', e => {
    const h = e.target.closest('a, button, .proj-card, .filter-item, .contact-line, #handle, #proj-handle');
    cursor.classList.toggle('big', !!h); });

/* ── PUBLISH MODE ───────────────────────────────────────── */
  const PUBLISH = true; // set to true to enable publish mode

if (PUBLISH) {
    document.getElementById('reel-shell').remove();

    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 999997;
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
      background: rgba(0,0,0,0.18);
      opacity: 0; transition: opacity 0.5s ease;`;

    modal.innerHTML = `
      <div style="
        background: var(--off-white); color: var(--off-black);
        font-family: var(--font-narkiss);
        padding: 48px 52px 48px;
        max-width: 360px; width: 90%;
        position: relative; text-align: center;box-shadow: 0 8px 48px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.08);">
        
        <button id="modal-close" style="
          position: absolute; top: 16px; right: 20px;
          background: none; border: none; cursor: none;
          font-size: 18px; color: var(--off-black);
          opacity: 0.35; transition: opacity 0.2s; line-height: 1;"
          onmouseenter="this.style.opacity='0.8'"
          onmouseleave="this.style.opacity='0.35'">✕</button>
          <div style="font-size: 24px; margin-bottom: 16px; color: var(--purple);">𓃗｡𖦹°‧⭑</div>
           <div style="font-size: 24px; font-weight: 500; margin-bottom: 8px; letter-spacing: 0.01em;">
          hi, welcome!
        </div>
        <div style="font-size: 12px; font-weight: 300; line-height: 1.5; opacity: 0.6;">
          I'm currently still working on this site,<br>
          but feel free to look around! 
        </div>
      </div>`;

    document.body.appendChild(modal);

    const close = () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 500); };

    modal.querySelector('#modal-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });

    requestAnimationFrame(() => { modal.style.opacity = '1'; });
  }

/* ── GRID ORDER + MASONRY COLUMNS ─────────────────────────── */
  const grid = document.getElementById('project-grid');
  const allCardsSource = [...document.querySelectorAll('.proj-card')];

  // Sort cards once by data-order
  allCardsSource.sort((a, b) => (+(a.dataset.order || 99)) - (+(b.dataset.order || 99)));

  function buildGrid(visibleCards) {
  grid.innerHTML = '';
  const cols = [0, 1, 2].map(() => {
    const d = document.createElement('div');
    d.className = 'proj-col';
    grid.appendChild(d);
    return d;
  });
  visibleCards.forEach((card, i) => {
    cols[i % 3].appendChild(card);
    card.querySelectorAll('video').forEach(v => {
      v.load();
      v.play().catch(() => {});
    });
    const divider = document.createElement('div');
    divider.className = 'proj-card-divider';
    cols[i % 3].appendChild(divider);
  });
}

  buildGrid(allCardsSource);

/* ── CINEMATIC REEL SCROLL ──────────────────────────────────
   rawProgress  = direct 0→1 from scroll position (jumpy)
   lerpProgress = smoothed value that actually drives transforms
   tick() runs on rAF, pulling lerp toward raw each frame.

   Phase 1 (0 → 0.70): bio drifts down, video fixed
   Phase 2 (0.70 → 1): both exit together, lerp speeds up

   Tune these to adjust feel:
   LERP_SPEED — lower = dreamier/slower, higher = snappier
   EXIT_SPEED — how fast phase 2 catches up when video exits
   exitDist   — how far the video travels upward during exit (in applyReelFrame)
   bioTarget  — how far down the bio drifts in phase 1     (in applyReelFrame) */

  const scrollWrap    = document.getElementById('scroll-wrap');
  const reelShell     = document.getElementById('reel-shell');
  const reelBio       = document.getElementById('reel-bio');
  const reelVideoWrap = document.getElementById('reel-video-wrap');
  const reelFooterEl  = document.getElementById('reel-footer');

  const LERP_SPEED = 0.002;
  const EXIT_SPEED = 0.14;

  let rawProgress  = 0;
  let lerpProgress = 0;
  let rafId        = null;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function applyReelFrame() {
    const p  = lerpProgress;
    const vh = window.innerHeight;

    // Phase 1: bio drifts down (0 → 0.70)
    const p1        = Math.min(1, p / 0.70);
    const bioTarget = vh * 0.75 - 48;
    reelBio.style.transform = `translateY(${easeOut(p1) * bioTarget}px)`;
    reelBio.style.opacity   = String(Math.max(0, 1 - p1 * 0.3));

    // Phase 2: video + bio exit (0.70 → 1.0)
    const p2       = Math.max(0, (p - 0.70) / 0.30);
    const exitDist = vh * 0.55;
    reelVideoWrap.style.transform = `translateY(${-p2 * exitDist * 0.6}px)`;
    reelVideoWrap.style.opacity   = String(Math.max(0, 1 - p2 * 1.4));
    reelBio.style.transform       = `translateY(${easeOut(p1) * bioTarget + p2 * exitDist * 0.8}px)`;
    reelBio.style.opacity         = String(Math.max(0, 1 - p2 * 2.2));

    // Footer fades through whole scroll
    reelFooterEl.style.opacity   = String(Math.max(0, 1 - p * 2.5));
    reelFooterEl.style.transform = `translateY(${p * 18}px)`; }

  function tick() {
    const speed = rawProgress > 0.7 ? EXIT_SPEED : LERP_SPEED;
    lerpProgress = lerp(lerpProgress, rawProgress, speed);
    applyReelFrame();
    if (Math.abs(lerpProgress - rawProgress) > 0.0005) {
      rafId = requestAnimationFrame(tick);
    } else {
      lerpProgress = rawProgress;
      applyReelFrame();
      rafId = null; } }

  scrollWrap.addEventListener('scroll', () => {
    const scrollableH = reelShell.offsetHeight - window.innerHeight;
    rawProgress = Math.min(1, Math.max(0, scrollWrap.scrollTop / scrollableH));

    if (scrollWrap.scrollTop === 0) {
      rawProgress = 0;
      lerpProgress = 0;
      applyReelFrame();
      return; }

    if (!rafId) rafId = requestAnimationFrame(tick);
  }, { passive: true });

/* ── FILTER ─────────────────────────────────────────────── */
  const filterItems  = document.querySelectorAll('.filter-item[data-filter]');
  const filterAllEl  = document.getElementById('filter-all');
  const filterAllLbl = document.getElementById('filter-all-label');
  const allCards     = document.querySelectorAll('.proj-card');
  const gridLabel    = document.getElementById('grid-label');
  const projectGrid  = document.getElementById('project-grid');

  const ALL_CATS = ['graphic-design','illustration','video','photography','code', '3d', 'fine-art' ];
  let activeFilters = new Set(['all', ...ALL_CATS]);

  filterAllEl.addEventListener('mouseenter', () => {
    if (activeFilters.has('all')) filterAllLbl.textContent = 'Deselect All'; });
  filterAllEl.addEventListener('mouseleave', () => {
    filterAllLbl.textContent = 'All'; });

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      const f = item.dataset.filter;
      if (f === 'all') {
        if (activeFilters.has('all')) { activeFilters.clear(); }
        else { activeFilters = new Set(['all', ...ALL_CATS]); }
      } else {
        if (activeFilters.has(f)) { activeFilters.delete(f); }
        else { activeFilters.add(f); }
        const allOn = ALL_CATS.every(cat => activeFilters.has(cat));
        if (allOn) { activeFilters.add('all'); } else { activeFilters.delete('all'); }
        if (activeFilters.size === 0) { activeFilters = new Set(['all', ...ALL_CATS]); }
      }
      filterAllLbl.textContent = 'All';
      applyFilters(); }); });

/* FLIP animation for filter rearrange */
  function applyFilters() {
    filterItems.forEach(item => {
      item.classList.toggle('checked', activeFilters.has(item.dataset.filter));
    });

    if (activeFilters.has('all')) {
      gridLabel.textContent = 'All Works';
    } else {
      const labels = [...activeFilters].map(f =>
        f === 'graphic-design' ? 'Graphic Design' : f.charAt(0).toUpperCase() + f.slice(1));
      gridLabel.textContent = labels.join(' · ');
    }

    const visibleCards = allCardsSource.filter(card => {
      const cardCats = card.dataset.category.split(' ');
      return activeFilters.has('all') || cardCats.some(cat => activeFilters.has(cat));
    });

    buildGrid(visibleCards);
  }

/* ── PAGE TOGGLING ──────────────────────────────────────── */
  const navLinks   = document.querySelectorAll('.nav-link[data-page]');
  let   activePage = null;

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.dataset.page;
      if (overlay.classList.contains('open') || overlay.classList.contains('closing')) {
        closeProject(() => showPage(page));
      } else if (activePage === page) {
        showGrid();
      } else {
        showPage(page); } }); });

  function showPage(name) {
    if (projectPanelOpen) restoreSidebar();
    projectGrid.style.display = 'none';
    gridLabel.style.opacity   = '0';
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pg = document.getElementById('page-' + name);
    if (pg) pg.classList.add('active');
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === name));
    filterItems.forEach(i => i.classList.remove('checked'));
    activePage = name; }

  function showGrid() {
    if (projectPanelOpen) restoreSidebar();
    projectGrid.style.display = '';
    gridLabel.style.opacity   = '1';
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));
    applyFilters();
    activePage = null; }

/* ── HOME + FILTER NAV GUARDS ───────────────────────────── */
  document.getElementById('homeBtn').addEventListener('click', () => {
    if (overlay.classList.contains('open') || overlay.classList.contains('closing')) {
      closeProject(() => { activeFilters = new Set(['all', ...ALL_CATS]); showGrid(); });
    } else {
      activeFilters = new Set(['all', ...ALL_CATS]);
      showGrid(); } });

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      if (overlay.classList.contains('open')) closeProject(() => showGrid());
    }, true); });

/* ── DARK MODE ──────────────────────────────────────────── */
  document.getElementById('modeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.getElementById('modeLabel').textContent =
      document.body.classList.contains('dark') ? 'Dark' : 'Light'; });

/* ── SIDEBAR RESIZE ─────────────────────────────────────── */
  const handle  = document.getElementById('handle');
  const sidebar = document.getElementById('sidebar');
  let resizingSidebar          = false;
  let sidebarWidthBeforeProject = null;
  let projectPanelOpen          = false;

  function collapseSidebar() {
    projectPanelOpen = true;
    sidebar.style.width = '110px';
    sidebar.dataset.narrow = 'true';
    sidebar.addEventListener('mouseenter', onSidebarEnter);
    sidebar.addEventListener('mouseleave', onSidebarLeave); }

  function onSidebarEnter() {
    if (!projectPanelOpen) return;
    const expandW = sidebarWidthBeforeProject || 230;
    sidebar.style.width = expandW + 'px';
    sidebar.dataset.narrow = expandW < 130 ? 'true' : 'false'; }

  function onSidebarLeave() {
    if (!projectPanelOpen) return;
    sidebar.style.width = '110px';
    sidebar.dataset.narrow = 'true'; }

  function restoreSidebar() {
    projectPanelOpen = false;
    sidebar.removeEventListener('mouseenter', onSidebarEnter);
    sidebar.removeEventListener('mouseleave', onSidebarLeave);
    const restoreW = sidebarWidthBeforeProject || 230;
    sidebar.style.width = restoreW + 'px';
    sidebar.dataset.narrow = restoreW < 130 ? 'true' : 'false';
    sidebarWidthBeforeProject = null; }

  handle.addEventListener('mousedown', e => {
    resizingSidebar = true; e.preventDefault(); document.body.style.userSelect = 'none'; });
  document.addEventListener('mousemove', e => {
    if (!resizingSidebar) return;
    const w = Math.min(360, Math.max(110, e.clientX));
    sidebar.style.width = w + 'px';
    sidebar.dataset.narrow = w < 130 ? 'true' : 'false';
    if (projectPanelOpen) sidebarWidthBeforeProject = w; });
  document.addEventListener('mouseup', () => {
    resizingSidebar = false; document.body.style.userSelect = ''; });

/* ── PROJECT COLUMN RESIZE ──────────────────────────────── */
  const projHandle  = document.getElementById('proj-handle');
  const projColText = document.getElementById('projColText');
  let resizingProj  = false;

  projHandle.addEventListener('mousedown', e => {
    resizingProj = true; e.preventDefault(); document.body.style.userSelect = 'none'; });
  document.addEventListener('mousemove', e => {
    if (!resizingProj) return;
    const l1Left = layer1.getBoundingClientRect().left;
    const newW   = Math.min(800, Math.max(200, e.clientX - l1Left));
    projColText.style.width = newW + 'px';
    layer2.style.left = (newW + 5) + 'px'; });
  document.addEventListener('mouseup', () => {
    resizingProj = false; document.body.style.userSelect = ''; });

/* ── PROJECT OVERLAY ────────────────────────────────────── */
  const overlay = document.getElementById('project-overlay');
  const layer1  = document.getElementById('proj-layer1');
  const layer2  = document.getElementById('proj-layer2');

  /* metaLinks — studios/people whose names become hyperlinks in the meta bar */
  const metaLinks = {
    'Junkie Studio':       'https://junkie.studio/',
    'Equal Parts Studio':  'https://www.equalparts.studio/',
    'Recess Community':    'https://www.recesscommunity.com/',
    'Overdrive Studio':    'https://overdrivedesign.com/',
    'F Newsmagazine':      'https://fnewsmagazine.com/',
    'School of the Art Institue of Chicago':  'https://www.saic.edu/',
    'Megahertz Magazine':  'https://www.instagram.com/mhz.print/',

  };

  function linkifyMeta(val) {
    let result = val;
    for (const [name, url] of Object.entries(metaLinks)) {
      result = result.split(name).join(
        `<a href="${url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:2px;cursor:none;" onmouseenter="document.getElementById('cursor').classList.add('big')" onmouseleave="document.getElementById('cursor').classList.remove('big')">${name}</a>`
      ); }
    return result; }

  function setMeta(itemId, valId, val) {
    const item  = document.getElementById(itemId);
    const valEl = document.getElementById(valId);
    const empty = !val || val === 'n/a' || val === '—' || val === 'N/A';
    item.classList.toggle('hidden', empty);
    if (!empty) valEl.innerHTML = linkifyMeta(val); }

  /* goProject — called by onclick on each card */
  function goProject(title, date, skills, outputs, withP, forC, through, fullscreen) {

  if (fullscreen) {
    const card = [...document.querySelectorAll('.proj-card')].find(c =>
      c.getAttribute('onclick').includes("'" + title + "'"));
    const media = card && card.querySelector('img, video');
    if (media) {
      initLightbox();
      const lb    = document.getElementById('lightbox');
      const inner = document.getElementById('lightbox-inner');
      inner.innerHTML = '';
      const clone = media.cloneNode(true);
      clone.style.cursor = '';
      if (clone.tagName === 'VIDEO') { clone.autoplay = true; clone.controls = true; }
      inner.appendChild(clone);
      lb.classList.add('open'); }
    return; }

  document.getElementById('proj-title-big').textContent = title;
  setMeta('meta-item-date',    'meta-date',    date);
  setMeta('meta-item-skills',  'meta-skills',  skills);
  setMeta('meta-item-outputs', 'meta-outputs', outputs);
  setMeta('meta-item-with',    'meta-with',    withP);
  setMeta('meta-item-for',     'meta-for',     forC);
  setMeta('meta-item-through', 'meta-through', through);
  document.getElementById('proj-desc').innerHTML =
    projectData[title] || 'Description coming soon.';
  document.getElementById('projColText').scrollTop = 0;
  document.querySelector('.proj-col-images-scroll').scrollTop = 0;
  renderImages(title);
  overlay.classList.remove('closing');
  overlay.classList.add('open');
  document.getElementById('scroll-wrap').classList.add('scroll-locked');
  sidebarWidthBeforeProject = sidebar.offsetWidth;
  collapseSidebar(); }





  /* closeProject — reverse animation, then hide */
  function closeProject(callback) {
    if (!overlay.classList.contains('open') && !overlay.classList.contains('closing')) {
      if (callback) callback();
      return; }
    overlay.classList.remove('open');
    overlay.classList.add('closing');
    setTimeout(() => {
      overlay.classList.remove('closing');
      document.getElementById('scroll-wrap').classList.remove('scroll-locked');
      restoreSidebar();
      if (callback) callback(); }, 850); }

  document.getElementById('backBtn').addEventListener('click', () => closeProject(null));

/* ── IMAGE RENDERING ────────────────────────────────────── */
  function renderImages(title) {
    const container = document.getElementById('proj-images');
    const layout = imageLayouts[title];
    if (!layout || layout.length === 0) {
      container.innerHTML = [1,2,3].map(n =>
        renderBlock({ type: 'placeholder', label: 'image 0' + n })).join('');
      return; }
    container.innerHTML = layout.map(block => renderBlock(block)).join('');
    container.querySelectorAll('.img-slideshow').forEach(initSlideshow);
    initLightbox();
    attachLightbox(container); }

  function renderBlock(block) {
    const caption = block.caption ? '<div class="img-caption">' + block.caption + '</div>' : '';
    if (block.type === 'image') {
      const sc = block.size ? ' ' + block.size : '';
      return '<div class="img-block' + sc + '"><img src="' + block.src + '" loading="lazy">' + caption + '</div>'; }
    if (block.type === 'video') {
      const sc = block.size ? ' ' + block.size : '';
      return '<div class="img-block' + sc + '"><video autoplay muted loop playsinline src="' + block.src + '"></video>' + caption + '</div>'; }    if (block.type === 'placeholder') {
      const sc = block.size ? ' ' + block.size : '';
      return '<div class="img-block' + sc + '"><div class="img-placeholder">' + (block.label || '') + '</div>' + caption + '</div>'; }
    if (block.type === 'overlap') {
      return '<div class="img-overlap">'
        + '<div class="overlap-back">'  + renderMediaInner(block.back)  + '</div>'
        + '<div class="overlap-front">' + renderMediaInner(block.front) + '</div>'
        + '</div>' + caption; }
    if (block.type === 'slideshow') {
      const slides = block.slides.map(s => renderMediaInner(s)).join('');
      const dots   = block.slides.map((_,i) =>
        '<div class="slideshow-dot' + (i===0?' active':'') + '" data-index="' + i + '"></div>').join('');
      return '<div class="img-slideshow" data-autoplay="' + (block.autoplay ? 'true' : 'false') + '">'
        + '<div class="slideshow-track"><div class="slideshow-slides">'
        + slides + '</div></div>'
        + '<button class="slideshow-arrow prev">←</button>'
        + '<button class="slideshow-arrow next">→</button>'
        + '<div class="slideshow-dots">' + dots + '</div></div>' + caption; }
    if (block.type === 'sidebyside') {
      /* aspect-ratio flex: each item's flex-grow is set to its AR so both
         share the full width at equal height with no cropping */
      const id = 'sbs-' + Math.random().toString(36).slice(2, 7);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const [a, b] = el.querySelectorAll('.img-sidebyside-item');
        const mediaA = a.querySelector('img, video');
        const mediaB = b.querySelector('img, video');
        const onReady = () => {
          const arA = mediaA.naturalWidth  / mediaA.naturalHeight  ||
                      mediaA.videoWidth    / mediaA.videoHeight    || 0;
          const arB = mediaB.naturalWidth  / mediaB.naturalHeight  ||
                      mediaB.videoWidth    / mediaB.videoHeight    || 0;
          if (!arA || !arB) { setTimeout(onReady, 50); return; }
          a.style.flex = String(arA);
          b.style.flex = String(arB); };
        mediaA.addEventListener('loadedmetadata', onReady);
        mediaB.addEventListener('loadedmetadata', onReady);
        onReady();
      }, 0);
      return '<div class="img-sidebyside" id="' + id + '">'
        + '<div class="img-sidebyside-item">' + renderMediaInner(block.left)  + '</div>'
        + '<div class="img-sidebyside-item">' + renderMediaInner(block.right) + '</div>'
        + '</div>' + caption; } }

  function renderMediaInner(item) {
    if (!item) return '';
    if (item.type === 'image')       return '<img src="' + item.src + '" loading="lazy">';
    if (item.type === 'video')       return '<video autoplay muted loop playsinline src="' + item.src + '"></video>';
    if (item.type === 'placeholder') return '<div class="img-placeholder">' + (item.label || '') + '</div>';
    return ''; }

  function initSlideshow(el) {
    const slides = el.querySelector('.slideshow-slides');
    const dots   = el.querySelectorAll('.slideshow-dot');
    const total  = slides.children.length;
    let current  = 0;
    function goTo(n) {
      current = (n + total) % total;
      slides.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((d,i) => d.classList.toggle('active', i === current)); }
    el.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
    el.querySelector('.next').addEventListener('click', () => goTo(current + 1));
    dots.forEach((d,i) => d.addEventListener('click', () => goTo(i)));
    if (el.dataset.autoplay === 'true') {
      setInterval(() => goTo(current + 1), 3000); } }




/* ── LIGHTBOX/ FULL SCREEN ON CLICK ───────────────────────────────────────────── */
  function initLightbox() {
    // create overlay once
    if (document.getElementById('lightbox')) return;
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = '<div id="lightbox-inner"></div>';
    document.body.appendChild(lb);
    lb.addEventListener('click', () => lb.classList.remove('open')); }

  function attachLightbox(container) {
    container.querySelectorAll('img, video').forEach(el => {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', e => {
        e.stopPropagation();
        const lb    = document.getElementById('lightbox');
        const inner = document.getElementById('lightbox-inner');
        inner.innerHTML = '';
        const clone = el.cloneNode(true);
        clone.style.cursor = '';
        if (clone.tagName === 'VIDEO') {
          clone.autoplay = true;
          clone.controls = true; }
        inner.appendChild(clone);
        lb.classList.add('open'); }); }); }


  
