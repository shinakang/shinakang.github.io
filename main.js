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
  document.querySelector('.archive-group')?.remove();

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
  const cols = [...grid.querySelectorAll('.proj-col')];
  if (cols.length !== 3) {
    grid.innerHTML = '';
    [0, 1, 2].forEach(() => {
      const column = document.createElement('div');
      column.className = 'proj-col';
      grid.appendChild(column);
    });
  }
  const persistentCols = [...grid.querySelectorAll('.proj-col')];
  persistentCols.forEach(column => column.replaceChildren());
  visibleCards.forEach((card, i) => {
    persistentCols[i % 3].appendChild(card);
    card.querySelectorAll('video').forEach(video => {
      video.play().catch(() => {});
    });
    const divider = document.createElement('div');
    divider.className = 'proj-card-divider';
    persistentCols[i % 3].appendChild(divider);
  });
  enhanceVideos(grid);
}

  function enhanceVideos(root) {
    root.querySelectorAll('video').forEach(video => {
      if (video.closest('.video-control-wrap')) return;
      if (video.closest('.img-slideshow')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'video-control-wrap';
      video.parentNode.insertBefore(wrapper, video);
      wrapper.appendChild(video);

      const toggle = document.createElement('button');
      toggle.className = 'video-sound-toggle';
      toggle.type = 'button';
      toggle.hidden = video.dataset.sound !== 'true';
      wrapper.appendChild(toggle);

      const updateToggle = () => {
        const muted = video.muted;
        toggle.innerHTML = muted
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Zm5 5 5 5m0-5-5 5"/></svg>'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7m2.5-9.5a8.5 8.5 0 0 1 0 12"/></svg>';
        toggle.setAttribute('aria-label', muted ? 'Turn sound on' : 'Turn sound off');
        toggle.setAttribute('aria-pressed', String(!muted));
      };

      updateToggle();
    });
  }

  function enhanceSlideshows(root) {
    root.querySelectorAll('.img-slideshow').forEach(slideshow => {
      if (slideshow.querySelector('.slideshow-sound-toggle')) return;
      const toggle = document.createElement('button');
      toggle.className = 'video-sound-toggle slideshow-sound-toggle';
      toggle.type = 'button';
      toggle.hidden = !slideshow.querySelector('video[data-sound="true"]');
      toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Zm5 5 5 5m0-5-5 5"/></svg>';
      toggle.setAttribute('aria-label', 'Turn sound on');
      toggle.setAttribute('aria-pressed', 'false');
      slideshow.querySelector('.cf-viewport').appendChild(toggle);
    });
  }

  document.addEventListener('click', e => {
    const slideshowToggle = e.target.closest('.slideshow-sound-toggle');
    if (slideshowToggle) {
      e.preventDefault();
      e.stopPropagation();
      const slideshow = slideshowToggle.closest('.img-slideshow');
      const video = slideshow.querySelector('.cf-slide.is-current video[data-sound="true"]');
      if (!video) return;
      const shouldUnmute = video.muted;
      slideshow.dataset.soundEnabled = String(shouldUnmute);
      slideshow.querySelectorAll('video').forEach(otherVideo => {
        otherVideo.muted = otherVideo !== video || !shouldUnmute;
      });
      video.play().catch(() => {});
      slideshowToggle.innerHTML = shouldUnmute
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7m2.5-9.5a8.5 8.5 0 0 1 0 12"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Zm5 5 5 5m0-5-5 5"/></svg>';
      slideshowToggle.setAttribute('aria-label', shouldUnmute ? 'Turn sound off' : 'Turn sound on');
      slideshowToggle.setAttribute('aria-pressed', String(shouldUnmute));
      return;
    }
    const toggle = e.target.closest('.video-sound-toggle');
    if (!toggle) return;
    e.preventDefault();
    e.stopPropagation();
    const video = toggle.closest('.video-control-wrap').querySelector('video');
    video.muted = !video.muted;
    video.play().catch(() => {});
    toggle.innerHTML = video.muted
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Zm5 5 5 5m0-5-5 5"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7m2.5-9.5a8.5 8.5 0 0 1 0 12"/></svg>';
    toggle.setAttribute('aria-label', video.muted ? 'Turn sound on' : 'Turn sound off');
    toggle.setAttribute('aria-pressed', String(!video.muted));
  });

  enhanceVideos(document);

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
  const HOME_VIEW = 'home';
  let activeFilters = new Set(['graphic-design']);

  filterAllEl.addEventListener('mouseenter', () => {
    if (activeFilters.has('all')) filterAllLbl.textContent = 'Deselect All'; });
  filterAllEl.addEventListener('mouseleave', () => {
    filterAllLbl.textContent = 'All'; });

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      if (activePage) showGrid();
      const f = item.dataset.filter;
      if (f === 'all') {
        if (activeFilters.has('all')) { activeFilters.clear(); }
        else { activeFilters = new Set(['all', ...ALL_CATS]); }
      } else {
        if (activeFilters.has(f)) { activeFilters.delete(f); }
        else { activeFilters.add(f); }
        const allOn = ALL_CATS.every(cat => activeFilters.has(cat));
        if (allOn) { activeFilters.add('all'); } else { activeFilters.delete('all'); }
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
    } else if (activeFilters.size === 0) {
      gridLabel.textContent = 'Please select filter(s)!';
    } else {
      const labels = [...activeFilters].map(f =>
        f === 'graphic-design' ? 'Graphic Design' : f.charAt(0).toUpperCase() + f.slice(1));
      gridLabel.textContent = labels.join(' · ');
    }

    const visibleCards = allCardsSource.filter(card => {
      const cardCats = card.dataset.category.split(' ');
      return activeFilters.has('all') || cardCats.some(cat => activeFilters.has(cat));
    });

    const previousPositions = new Map();
    allCardsSource.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.width && rect.height) previousPositions.set(card, rect);
    });

    allCardsSource.filter(card => !visibleCards.includes(card)).forEach(card => {
      const rect = previousPositions.get(card);
      if (!rect) return;
      const exitingCard = card.cloneNode(true);
      exitingCard.classList.add('filter-exit-clone');
      exitingCard.style.left = `${rect.left}px`;
      exitingCard.style.top = `${rect.top}px`;
      exitingCard.style.width = `${rect.width}px`;
      exitingCard.style.height = `${rect.height}px`;
      document.body.appendChild(exitingCard);
      const exitAnimation = exitingCard.animate([
        { opacity: 1, transform: 'translate(0, 0) scale(1)' },
        { opacity: 0, transform: 'translate(0, 8px) scale(0.98)' }
      ], {
        duration: 700,
        easing: 'ease-out',
        fill: 'forwards'
      });
      exitAnimation.onfinish = () => exitingCard.remove();
    });

    buildGrid(visibleCards);

    visibleCards.forEach(card => {
      const previous = previousPositions.get(card);
      if (!previous) return;
      const current = card.getBoundingClientRect();
      const deltaX = previous.left - current.left;
      const deltaY = previous.top - current.top;
      if (!deltaX && !deltaY) return;

      card.animate([
        { transform: `translate(${deltaX}px, ${deltaY}px)` },
        { transform: 'translate(0, 0)' }
      ], {
        duration: 1500,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'none'
      });
    });
    syncUrlFromFilters();
  }

/* ── URL SYNC FOR FILTERS ───────────────────────────────── */
  function syncUrlFromFilters() {
    const url = new URL(window.location.href);
    const selectedCats = ALL_CATS.filter(c => activeFilters.has(c));
    const isHomeState = activeFilters.has('all') || activeFilters.size === 0;

    if (isHomeState) {
      url.searchParams.set('view', HOME_VIEW);
      history.replaceState(null, '', url);
      return;
    }

    if (selectedCats.length === 1 && selectedCats[0] === 'graphic-design') {
      url.searchParams.delete('view');
      history.replaceState(null, '', url);
      return;
    }

    url.searchParams.set('view', selectedCats.join(','));
    history.replaceState(null, '', url);
  }

  function skipIntroToGrid() {
    if (!reelShell || !document.body.contains(reelShell)) return;
    scrollWrap.scrollTop = reelShell.offsetHeight;
    rawProgress = 1;
    lerpProgress = 1;
    applyReelFrame();
  }

  function loadFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (!view) {
      activeFilters = new Set(['graphic-design']);
      applyFilters();
      skipIntroToGrid();
      return;
    }

    if (view === HOME_VIEW || view === 'graphic-design') {
      activeFilters = new Set(['all', ...ALL_CATS]);
      applyFilters();
      skipIntroToGrid();
      return;
    }

    const cats = view.split(',').map(s => s.trim()).filter(c => ALL_CATS.includes(c));
    if (cats.length === 0) return;
    activeFilters = new Set(cats);
    applyFilters();
    skipIntroToGrid();
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
    activeFilters.clear();
    syncUrlFromFilters();
    projectGrid.style.display = 'none';
    gridLabel.style.opacity   = '0';
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active', 'exiting'));
    const pg = document.getElementById('page-' + name);
    if (pg) pg.classList.add('active');
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === name));
    filterItems.forEach(i => i.classList.remove('checked'));
    activePage = name; }

  function showGrid() {
    if (projectPanelOpen) restoreSidebar();
    const currentPage = document.querySelector('.page.active');
    if (currentPage) {
      currentPage.classList.remove('active');
      currentPage.classList.add('exiting');
      currentPage.addEventListener('animationend', () => {
        currentPage.classList.remove('exiting');
      }, { once: true });
    }
    projectGrid.style.display = '';
    gridLabel.style.opacity   = '1';
    navLinks.forEach(l => l.classList.remove('active'));
    applyFilters();
    activePage = null;
  }

/* ── PORTRAIT DUST TRAIL ────────────────────────────────── */
  const portrait = document.querySelector('.about-img-ph');
  const dustSymbols = '｡⚘°☘︎‧⭑*♪₊°‧♫✳';
  const dustColors = ['var(--yellow)', 'var(--purple)', 'var(--off-white)', 'var(--dark-purple)'];
  let lastDustTime = 0;
  let dustCount = 0;

  function addDust(target, e) {
    const now = performance.now();
    if (now - lastDustTime < 20) return;
    lastDustTime = now;

    const bounds = target.getBoundingClientRect();
    const dust = document.createElement('span');
    dust.className = 'portrait-dust';
    dust.textContent = dustSymbols[Math.floor(Math.random() * dustSymbols.length)];
    dust.style.color = dustColors[dustCount % dustColors.length];
    dustCount += 1;
    dust.style.left = `${e.clientX - bounds.left}px`;
    dust.style.top = `${e.clientY - bounds.top}px`;
    dust.style.fontSize = `${11 + Math.random() * 7}px`;
    target.appendChild(dust);
    dust.addEventListener('animationend', () => dust.remove(), { once: true });
    setTimeout(() => dust.remove(), 1400);
  }

  portrait?.addEventListener('mousemove', e => addDust(portrait, e));

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

/* ── PROJ HANDLE PROXIMITY ──────────────────────────────── */
  document.addEventListener('mousemove', e => {
    const handle = document.getElementById('proj-handle');
    if (!handle) return;
    const rect = handle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const dist = Math.abs(e.clientX - centerX);
    const radius = 40;
    const close = dist < radius;
    handle.style.setProperty('--handle-opacity', close ? (dist / radius) * 0.5 : 0.5);
    handle.style.setProperty('--handle-color', close ? 'var(--purple)' : 'var(--light-brown)');
  });

/* ── PROJECT OVERLAY ────────────────────────────────────── */
  const overlay = document.getElementById('project-overlay');
  const layer1  = document.getElementById('proj-layer1');
  const layer2  = document.getElementById('proj-layer2');

  /* metaLinks — studios/people whose names become hyperlinks in the meta bar */
  const metaLinks = {
    'Junkie Studio':       'https://junkie.studio/',
    'Equal Parts Studio':  'https://www.equalparts.studio/',
    'Recess Community':    'https://www.recesscommunity.com/',
    'Overdrive Design':    'https://overdrivedesign.com/',
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
    enhanceVideos(container);
    enhanceSlideshows(container);
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
      const sound = block.sound ? ' data-sound="true"' : '';
      return '<div class="img-block' + sc + '"><video autoplay muted loop playsinline' + sound + ' src="' + block.src + '"></video>' + caption + '</div>'; }    if (block.type === 'placeholder') {
      const sc = block.size ? ' ' + block.size : '';
      return '<div class="img-block' + sc + '"><div class="img-placeholder">' + (block.label || '') + '</div>' + caption + '</div>'; }
    if (block.type === 'overlap') {
      return '<div class="img-overlap">'
        + '<div class="overlap-back">'  + renderMediaInner(block.back)  + '</div>'
        + '<div class="overlap-front">' + renderMediaInner(block.front) + '</div>'
        + '</div>' + caption; }
if (block.type === 'slideshow') {
      const sc = block.size ? ' ' + block.size : '';
      const slidesHtml = block.slides.map((s, i) =>
        '<div class="cf-slide" data-index="' + i + '">' +
        renderMediaInner(s).replace('loading="lazy"', 'loading="eager"') + '</div>').join('');
      const thumbsHtml = block.slides.map((s, i) =>
        '<div class="cf-thumb" data-index="' + i + '">' + renderMediaInner(s) + '</div>').join('');
      return '<div class="img-slideshow' + sc + '" data-autoplay="' + (block.autoplay ? 'true' : 'false') + '">'
        + '<div class="cf-viewport">'
        + '<div class="cf-track">' + slidesHtml + '</div>'
        + '<button class="slideshow-arrow prev">←</button>'
        + '<button class="slideshow-arrow next">→</button>'
        + '</div>'
        + '<div class="cf-thumbs-viewport"><div class="cf-thumbs-track">' + thumbsHtml + '</div></div>'
        + '</div>' + caption; }
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
    if (item.type === 'video')       return '<video autoplay muted loop playsinline' + (item.sound ? ' data-sound="true"' : '') + ' src="' + item.src + '"></video>';
    if (item.type === 'placeholder') return '<div class="img-placeholder">' + (item.label || '') + '</div>';
    return ''; }

    function initSlideshow(el) {
    const slides = [...el.querySelectorAll('.cf-slide')];
    const thumbs = [...el.querySelectorAll('.cf-thumb')];
    const total  = slides.length;
    let current  = 0;
    let wheelAccum    = 0;
    let wheelCooldown = false;
    const viewport = el.querySelector('.cf-viewport');
    const track = el.querySelector('.cf-track');
    const slideGap = 1;
    track.insertBefore(slides[slides.length - 1].cloneNode(true), slides[0]);
    track.appendChild(slides[0].cloneNode(true));
    const allSlides = [...track.querySelectorAll('.cf-slide')];
    let visualPosition = 1;

    function updateAudio() {
      const activeSlide = allSlides.find(slide => slide.classList.contains('is-current'));
      const activeVideo = activeSlide && activeSlide.querySelector('video[data-sound="true"]');
      const soundEnabled = el.dataset.soundEnabled === 'true';
      allSlides.forEach(slide => {
        slide.querySelectorAll('video').forEach(video => {
          video.muted = video !== activeVideo || !soundEnabled;
        });
      });
      if (activeVideo) activeVideo.play().catch(() => {});
    }

    function fitViewportHeight() {
      const media = slides[current].querySelector('img, video');
      if (!media || !viewport.clientWidth) return;
      const mediaWidth = media.naturalWidth || media.videoWidth;
      const mediaHeight = media.naturalHeight || media.videoHeight;
      if (!mediaWidth || !mediaHeight) return;
      const height = (viewport.clientWidth * 0.8 * mediaHeight / mediaWidth) + 'px';
      const slideWidth = (viewport.clientWidth * 0.8) + 'px';
      viewport.style.height = height;
      allSlides.forEach(slide => {
        slide.style.height = height;
        slide.style.width = slideWidth;
        slide.style.flexBasis = slideWidth; });
    }

    function setInitialGeometry() {
      if (!viewport.clientWidth) return;
      const slideWidth = (viewport.clientWidth * 0.8) + 'px';
      viewport.style.height = '420px';
      allSlides.forEach(slide => {
        slide.style.height = '420px';
        slide.style.width = slideWidth;
        slide.style.flexBasis = slideWidth; });
    }

    function update() {
      allSlides.forEach((s, i) => {
        const offset = i - visualPosition;

        s.classList.toggle('is-prev', offset === -1);
        s.classList.toggle('is-current', offset === 0);
        s.classList.toggle('is-next', offset === 1);
        s.style.opacity = offset === 0 ? '1' : '0.35';
        s.style.zIndex = offset === 0 ? '3' : '2';
        s.style.pointerEvents = Math.abs(offset) <= 1 ? 'auto' : 'none';
      });
      updateAudio();
      fitViewportHeight();
      track.style.transform = 'translateX(' +
        (viewport.clientWidth * 0.1 - visualPosition * (viewport.clientWidth * 0.8 + slideGap)) + 'px)';
      thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
      const activeThumb = thumbs[current];
      if (activeThumb) {
        const thumbsViewport = el.querySelector('.cf-thumbs-viewport');
        thumbsViewport.scrollTo({
          left: activeThumb.offsetLeft - (thumbsViewport.clientWidth - activeThumb.offsetWidth) / 2,
          behavior: 'smooth'
        }); }
    }

    function goTo(n) {
      const next = (n + total) % total;
      const wrapsForward = current === total - 1 && next === 0;
      const wrapsBackward = current === 0 && next === total - 1;
      current = next;
      visualPosition = wrapsForward ? total + 1 :
        (wrapsBackward ? 0 : current + 1);
      update(); }

    track.addEventListener('transitionend', e => {
      if (e.propertyName !== 'transform' || visualPosition !== 0 && visualPosition !== total + 1) return;
      track.style.transition = 'none';
      visualPosition = current + 1;
      update();
      requestAnimationFrame(() => { track.style.transition = ''; }); });

    /* Capture-phase click on non-center slides: navigate instead of zoom.
       Center slide's click is left alone so it still opens the lightbox. */
    slides.forEach((s, i) => {
      const media = s.querySelector('img, video');
      if (media) {
        media.addEventListener('load', fitViewportHeight);
        media.addEventListener('loadedmetadata', fitViewportHeight); }
      s.addEventListener('click', e => {
        if (e.target.closest('.video-sound-toggle')) return;
        if (i !== current) {
          e.stopPropagation();
          e.preventDefault();
          goTo(i); }
      }, true); });

        window.addEventListener('resize', fitViewportHeight);
        const resizeObserver = new ResizeObserver(() => {
          setInitialGeometry();
          update(); });
        resizeObserver.observe(viewport);

        setInitialGeometry();

    thumbs.forEach((t, i) => t.addEventListener('click', () => goTo(i)));

    el.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
    el.querySelector('.next').addEventListener('click', () => goTo(current + 1));

    el.addEventListener('wheel', e => {
      e.preventDefault();
      if (wheelCooldown) return;
      wheelAccum += e.deltaX + e.deltaY;
      const THRESHOLD = 50;
      if (wheelAccum > THRESHOLD) {
        goTo(current + 1);
        wheelAccum = 0;
        wheelCooldown = true;
        setTimeout(() => { wheelCooldown = false; }, 200);
      } else if (wheelAccum < -THRESHOLD) {
        goTo(current - 1);
        wheelAccum = 0;
        wheelCooldown = true;
        setTimeout(() => { wheelCooldown = false; }, 200); }
    }, { passive: false });

    update();

    if (el.dataset.autoplay === 'true') {
      setInterval(() => goTo(current + 1), 3000); }
  }


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
      if (el.closest('.cf-thumb')) return;
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


  loadFiltersFromUrl();