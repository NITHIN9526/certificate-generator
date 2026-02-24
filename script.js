// Certificate Generator - v2.0
// Enhanced with batch Excel processing capability and categorized participants

const participantInput = document.getElementById('participant');
const categorySelect = document.getElementById('category-select');
const eventInput = document.getElementById('event');
const dateInput = document.getElementById('date');
const issuerInput = document.getElementById('issuer');
const templateSelect = document.getElementById('template-select');

const logoInput = document.getElementById('logo-input');
const sigInput = document.getElementById('sig-input');
const bgInput = document.getElementById('bg-input');
const bgToggle = document.getElementById('bg-toggle');
const certTitleInput = document.getElementById('cert-title-input');
const certSubtitleInput = document.getElementById('cert-subtitle-input');
const certSigLabelInput = document.getElementById('cert-siglabel-input');
const titleFontSelect = document.getElementById('title-font-select');
const subtitleFontSelect = document.getElementById('subtitle-font-select');
const nameFontSelect = document.getElementById('name-font-select');
const eventFontSelect = document.getElementById('event-font-select');
const metaFontSelect = document.getElementById('meta-font-select');
const sigFontSelect = document.getElementById('sig-font-select');
const titleSizeInput = document.getElementById('title-size-input');
const titleSizeValue = document.getElementById('title-size-value');
const nameSizeInput = document.getElementById('name-size-input');
const nameSizeValue = document.getElementById('name-size-value');
const eventSizeInput = document.getElementById('event-size-input');
const eventSizeValue = document.getElementById('event-size-value');
const titleColorInput = document.getElementById('title-color-input');
const nameColorInput = document.getElementById('name-color-input');
const bodyColorInput = document.getElementById('body-color-input');
const resetTextStylesBtn = document.getElementById('reset-text-styles');
const resetTextPositionBtn = document.getElementById('reset-text-position');

const previewBtn = document.getElementById('preview-btn');
const downloadPngBtn = document.getElementById('download-png');
const downloadPdfBtn = document.getElementById('download-pdf');

const excelInput = document.getElementById('excel-input');
const processExcelBtn = document.getElementById('process-excel');

const orientationLandscapeBtn = document.getElementById('orientation-landscape');
const orientationPortraitBtn = document.getElementById('orientation-portrait');

const cert = document.getElementById('certificate');
const certInner = document.getElementById('cert-inner');
const certTitle = document.getElementById('cert-title');
const certSubtitle = document.getElementById('cert-subtitle');
const certName = document.getElementById('cert-name');
const certEvent = document.getElementById('cert-event');
const certMeta = document.getElementById('cert-meta');
const certDate = document.getElementById('cert-date');
const certIssuer = document.getElementById('cert-issuer');
const certLogo = document.getElementById('cert-logo');
const certSig = document.getElementById('cert-sig');
const certSigLabel = document.getElementById('cert-sig-label');

const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');

const templateClasses = [
  'classic',
  'modern',
  'gold',
  'sports-dynamic',
  'sports-medal',
  'sports-champion',
  'sports-fitness',
  'sports-tournament',
  'sports-achievement',
  'arts-creative',
  'arts-vibrant',
  'arts-gallery',
  'arts-performance',
  'arts-design',
  'arts-photography',
  'academic-formal',
  'academic-modern',
  'academic-distinction',
  'excellence-premium',
  'achievement-bold',
  'leadership-elite',
  'minimalist-blue',
  'gradient-sunset',
  'elegant-vintage',
  'geometric-modern',
  'rainbow-vibrant',
  'dark-professional',
  'pastel-soft',
  'bold-statement',
  'aurora-glass',
  'emerald-royal',
  'mono-grid',
  'nebula-night',
  'ivory-luxe',
  'coral-wave'
];

// Global variables for batch processing
let logoDataUrl = null;
let sigDataUrl = null;
let bgDataUrl = null;
let currentOrientation = 'landscape';
const exportRenderDimensions = {
  landscape: { width: 1200, height: 768 },
  portrait: { width: 840, height: 1080 }
};

// Category to template suggestions map
const categoryTemplateMap = {
  sports: ['sports-dynamic', 'sports-medal', 'sports-champion', 'sports-fitness', 'sports-tournament', 'sports-achievement', 'nebula-night', 'bold-statement'],
  arts: ['arts-creative', 'arts-vibrant', 'arts-gallery', 'arts-performance', 'arts-design', 'arts-photography', 'aurora-glass', 'coral-wave', 'gradient-sunset', 'rainbow-vibrant', 'pastel-soft'],
  academics: ['academic-formal', 'academic-modern', 'academic-distinction', 'mono-grid', 'ivory-luxe', 'minimalist-blue', 'classic'],
  participation: ['modern', 'classic', 'minimalist-blue', 'pastel-soft', 'aurora-glass'],
  excellence: ['excellence-premium', 'gold', 'ivory-luxe', 'emerald-royal', 'leadership-elite'],
  achievement: ['achievement-bold', 'excellence-premium', 'sports-medal', 'sports-achievement', 'bold-statement'],
  leadership: ['leadership-elite', 'emerald-royal', 'excellence-premium', 'modern', 'dark-professional', 'ivory-luxe'],
  innovation: ['geometric-modern', 'mono-grid', 'aurora-glass', 'modern', 'minimalist-blue', 'gradient-sunset', 'rainbow-vibrant']
};

const certEventPrefix = 'has successfully participated in ';
const templateOptionLabels = templateSelect
  ? new Map(Array.from(templateSelect.options).map((option) => [option.value, option.textContent]))
  : new Map();
const defaultCertificateText = {
  title: 'Certificate of Participation',
  subtitle: 'This is to certify that',
  signatureLabel: 'Organizer'
};
const textStyleOverrides = {
  titleSize: null,
  nameSize: null,
  eventSize: null,
  titleFont: null,
  subtitleFont: null,
  nameFont: null,
  eventFont: null,
  metaFont: null,
  sigFont: null,
  titleColor: null,
  nameColor: null,
  bodyColor: null
};
const fontFamilyPresets = {
  playfair_display: '"Playfair Display", serif',
  roboto: 'Roboto, sans-serif',
  poppins: 'Poppins, sans-serif',
  montserrat: 'Montserrat, sans-serif',
  merriweather: 'Merriweather, serif',
  lora: 'Lora, serif',
  nunito: 'Nunito, sans-serif',
  raleway: 'Raleway, sans-serif',
  oswald: 'Oswald, sans-serif',
  bebas_neue: '"Bebas Neue", sans-serif',
  cinzel: 'Cinzel, serif',
  libre_baskerville: '"Libre Baskerville", serif',
  dancing_script: '"Dancing Script", cursive',
  pacifico: 'Pacifico, cursive',
  ubuntu: 'Ubuntu, sans-serif',
  inter: 'Inter, sans-serif',
  abril_fatface: '"Abril Fatface", serif',
  cormorant_garamond: '"Cormorant Garamond", serif',
  fira_sans: '"Fira Sans", sans-serif',
  quicksand: 'Quicksand, sans-serif',
  open_sans: '"Open Sans", sans-serif',
  lato: 'Lato, sans-serif',
  source_sans_3: '"Source Sans 3", sans-serif',
  source_serif_4: '"Source Serif 4", serif',
  pt_sans: '"PT Sans", sans-serif',
  pt_serif: '"PT Serif", serif',
  work_sans: '"Work Sans", sans-serif',
  manrope: 'Manrope, sans-serif',
  josefin_sans: '"Josefin Sans", sans-serif',
  dm_sans: '"DM Sans", sans-serif',
  karla: 'Karla, sans-serif',
  cabin: 'Cabin, sans-serif',
  arvo: 'Arvo, serif',
  bitter: 'Bitter, serif',
  crimson_text: '"Crimson Text", serif',
  cardo: 'Cardo, serif',
  rubik: 'Rubik, sans-serif',
  dm_serif_display: '"DM Serif Display", serif',
  jost: 'Jost, sans-serif',
  anton: 'Anton, sans-serif',
  barlow: 'Barlow, sans-serif',
  barlow_condensed: '"Barlow Condensed", sans-serif',
  barlow_semi_condensed: '"Barlow Semi Condensed", sans-serif',
  hind: 'Hind, sans-serif',
  mukta: 'Mukta, sans-serif',
  titillium_web: '"Titillium Web", sans-serif',
  exo_2: '"Exo 2", sans-serif',
  outfit: 'Outfit, sans-serif',
  space_grotesk: '"Space Grotesk", sans-serif',
  orbitron: 'Orbitron, sans-serif',
  exo: 'Exo, sans-serif',
  m_plus_1p: '"M PLUS 1p", sans-serif',
  asap: 'Asap, sans-serif',
  asap_condensed: '"Asap Condensed", sans-serif',
  assistant: 'Assistant, sans-serif',
  catamaran: 'Catamaran, sans-serif',
  chivo: 'Chivo, sans-serif',
  heebo: 'Heebo, sans-serif',
  ibm_plex_sans: '"IBM Plex Sans", sans-serif',
  istok_web: '"Istok Web", sans-serif',
  kanit: 'Kanit, sans-serif',
  khand: 'Khand, sans-serif',
  lexend: 'Lexend, sans-serif',
  libre_franklin: '"Libre Franklin", sans-serif',
  mulish: 'Mulish, sans-serif',
  noto_sans: '"Noto Sans", sans-serif',
  nunito_sans: '"Nunito Sans", sans-serif',
  oxygen: 'Oxygen, sans-serif',
  overpass: 'Overpass, sans-serif',
  prompt: 'Prompt, sans-serif',
  public_sans: '"Public Sans", sans-serif',
  questrial: 'Questrial, sans-serif',
  ropa_sans: '"Ropa Sans", sans-serif',
  saira: 'Saira, sans-serif',
  sora: 'Sora, sans-serif',
  urbanist: 'Urbanist, sans-serif',
  varela_round: '"Varela Round", sans-serif',
  yantramanav: 'Yantramanav, sans-serif',
  alata: 'Alata, sans-serif',
  archivo: 'Archivo, sans-serif',
  archivo_narrow: '"Archivo Narrow", sans-serif',
  baloo_2: '"Baloo 2", sans-serif',
  figtree: 'Figtree, sans-serif',
  eb_garamond: '"EB Garamond", serif',
  vollkorn: 'Vollkorn, serif',
  spectral: 'Spectral, serif',
  bodoni_moda: '"Bodoni Moda", serif',
  noto_serif: '"Noto Serif", serif',
  noto_serif_display: '"Noto Serif Display", serif',
  alegreya: 'Alegreya, serif',
  alegreya_sc: '"Alegreya SC", serif',
  prata: 'Prata, serif',
  tinos: 'Tinos, serif',
  fraunces: 'Fraunces, serif',
  cormorant: 'Cormorant, serif',
  cormorant_infant: '"Cormorant Infant", serif',
  cormorant_sc: '"Cormorant SC", serif',
  old_standard_tt: '"Old Standard TT", serif',
  zilla_slab: '"Zilla Slab", serif',
  quattrocento: 'Quattrocento, serif',
  neuton: 'Neuton, serif',
  domine: 'Domine, serif',
  libre_caslon_text: '"Libre Caslon Text", serif',
  bungee: 'Bungee, sans-serif',
  caveat: 'Caveat, cursive',
  courgette: 'Courgette, cursive',
  great_vibes: '"Great Vibes", cursive',
  kaushan_script: '"Kaushan Script", cursive',
  lobster: 'Lobster, cursive',
  merienda: 'Merienda, cursive',
  permanent_marker: '"Permanent Marker", cursive',
  sacramento: 'Sacramento, cursive',
  satisfy: 'Satisfy, cursive',
  yellowtail: 'Yellowtail, cursive',
  amatic_sc: '"Amatic SC", cursive',
  comfortaa: 'Comfortaa, cursive',
  fredoka: 'Fredoka, sans-serif',
  press_start_2p: '"Press Start 2P", cursive',
  righteous: 'Righteous, cursive',
  roboto_mono: '"Roboto Mono", monospace',
  space_mono: '"Space Mono", monospace',
  jetbrains_mono: '"JetBrains Mono", monospace',
  fira_code: '"Fira Code", monospace',
  silkscreen: 'Silkscreen, cursive',
  teko: 'Teko, sans-serif',
  abel: 'Abel, sans-serif',
  marcellus: 'Marcellus, serif'
};
const fontPresetEntries = Object.entries(fontFamilyPresets);
const loadedFontPresetKeys = new Set();
const movableTextElements = [certTitle, certSubtitle, certName, certEvent, certMeta, certSigLabel].filter(Boolean);
const movableTextOffsets = new Map();
const textDragState = {
  element: null,
  pointerId: null,
  startX: 0,
  startY: 0,
  originX: 0,
  originY: 0
};

function updateCategoryTemplateRecommendations(category) {
  if (!templateSelect || templateOptionLabels.size === 0) return;

  const normalizedCategory = String(category ?? '').trim().toLowerCase();
  const recommendedTemplates = new Set(categoryTemplateMap[normalizedCategory] || []);

  Array.from(templateSelect.options).forEach((option) => {
    const originalLabel = templateOptionLabels.get(option.value) || option.textContent;
    option.textContent = recommendedTemplates.has(option.value)
      ? `${originalLabel} [Recommended]`
      : originalLabel;
  });
}

function updateRangeValueLabel(input, labelElement) {
  if (!input || !labelElement) return;
  labelElement.textContent = `${input.value}px`;
}

function fontDisplayName(fontStack) {
  return fontStack.split(',')[0].replace(/"/g, '').trim();
}

function populateFontSelect(select) {
  if (!select) return;
  const selectedValue = select.value;
  select.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Template Default';
  select.appendChild(defaultOption);

  fontPresetEntries.forEach(([key, stack]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = fontDisplayName(stack);
    option.style.fontFamily = stack;
    select.appendChild(option);
  });

  const hasSelected = Array.from(select.options).some((option) => option.value === selectedValue);
  select.value = hasSelected ? selectedValue : '';
}

function initializeFontSelectors() {
  [titleFontSelect, subtitleFontSelect, nameFontSelect, eventFontSelect, metaFontSelect, sigFontSelect].forEach(populateFontSelect);
}

function detectFontPresetKey(computedFontFamily) {
  const normalized = String(computedFontFamily || '').toLowerCase();
  for (const [key, stack] of fontPresetEntries) {
    const primary = fontDisplayName(stack).toLowerCase();
    if (normalized.includes(primary)) {
      return key;
    }
  }
  return '';
}

function ensureFontPresetLoaded(fontKey) {
  if (!fontKey || loadedFontPresetKeys.has(fontKey)) return;

  const fontStack = fontFamilyPresets[fontKey];
  if (!fontStack) return;

  const family = fontDisplayName(fontStack);
  const familyQuery = encodeURIComponent(family).replace(/%20/g, '+');
  const existingLink = document.querySelector(`link[data-font-key="${fontKey}"]`);
  if (existingLink) {
    loadedFontPresetKeys.add(fontKey);
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${familyQuery}&display=swap`;
  link.dataset.fontKey = fontKey;
  document.head.appendChild(link);
  loadedFontPresetKeys.add(fontKey);
}

function applyFontPreset(element, fontKey) {
  if (!element) return;
  if (!fontKey) {
    element.style.fontFamily = '';
    return;
  }

  ensureFontPresetLoaded(fontKey);
  element.style.fontFamily = fontFamilyPresets[fontKey] || '';
}

function setControlNumber(input, value, fallback) {
  if (!input) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;

  const min = Number(input.min || 0);
  const max = Number(input.max || parsed);
  const clamped = Math.min(max, Math.max(min, parsed));
  input.value = String(Math.round(clamped));
  return clamped;
}

function rgbToHex(value) {
  const match = String(value || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return '#000000';

  const toHex = (num) => Number(num).toString(16).padStart(2, '0');
  return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`;
}

function syncTextControlsWithPreview() {
  if (!certTitle || !certName || !certEvent) return;

  const titleSize = Math.round(parseFloat(getComputedStyle(certTitle).fontSize));
  const nameSize = Math.round(parseFloat(getComputedStyle(certName).fontSize));
  const eventSize = Math.round(parseFloat(getComputedStyle(certEvent).fontSize));

  if (textStyleOverrides.titleSize === null) setControlNumber(titleSizeInput, titleSize, 28);
  if (textStyleOverrides.nameSize === null) setControlNumber(nameSizeInput, nameSize, 48);
  if (textStyleOverrides.eventSize === null) setControlNumber(eventSizeInput, eventSize, 16);
  updateRangeValueLabel(titleSizeInput, titleSizeValue);
  updateRangeValueLabel(nameSizeInput, nameSizeValue);
  updateRangeValueLabel(eventSizeInput, eventSizeValue);

  if (textStyleOverrides.titleFont === null && titleFontSelect) {
    titleFontSelect.value = detectFontPresetKey(getComputedStyle(certTitle).fontFamily);
  }
  if (textStyleOverrides.subtitleFont === null && subtitleFontSelect) {
    subtitleFontSelect.value = detectFontPresetKey(getComputedStyle(certSubtitle).fontFamily);
  }
  if (textStyleOverrides.nameFont === null && nameFontSelect) {
    nameFontSelect.value = detectFontPresetKey(getComputedStyle(certName).fontFamily);
  }
  if (textStyleOverrides.eventFont === null && eventFontSelect) {
    eventFontSelect.value = detectFontPresetKey(getComputedStyle(certEvent).fontFamily);
  }
  if (textStyleOverrides.metaFont === null && metaFontSelect && certMeta) {
    metaFontSelect.value = detectFontPresetKey(getComputedStyle(certMeta).fontFamily);
  }
  if (textStyleOverrides.sigFont === null && sigFontSelect) {
    sigFontSelect.value = detectFontPresetKey(getComputedStyle(certSigLabel).fontFamily);
  }

  if (textStyleOverrides.titleColor === null && titleColorInput) {
    titleColorInput.value = rgbToHex(getComputedStyle(certTitle).color);
  }
  if (textStyleOverrides.nameColor === null && nameColorInput) {
    nameColorInput.value = rgbToHex(getComputedStyle(certName).color);
  }
  if (textStyleOverrides.bodyColor === null && bodyColorInput) {
    bodyColorInput.value = rgbToHex(getComputedStyle(certEvent).color);
  }
}

function applyTextEditorStyles() {
  if (!certTitle || !certSubtitle || !certSigLabel) return;

  certTitle.textContent = String(certTitleInput ? certTitleInput.value : '').trim() || defaultCertificateText.title;
  certSubtitle.textContent = String(certSubtitleInput ? certSubtitleInput.value : '').trim() || defaultCertificateText.subtitle;
  certSigLabel.textContent = String(certSigLabelInput ? certSigLabelInput.value : '').trim() || defaultCertificateText.signatureLabel;

  certTitle.style.fontSize = textStyleOverrides.titleSize !== null ? `${textStyleOverrides.titleSize}px` : '';
  certName.style.fontSize = textStyleOverrides.nameSize !== null ? `${textStyleOverrides.nameSize}px` : '';
  certEvent.style.fontSize = textStyleOverrides.eventSize !== null ? `${textStyleOverrides.eventSize}px` : '';
  applyFontPreset(certTitle, textStyleOverrides.titleFont);
  applyFontPreset(certSubtitle, textStyleOverrides.subtitleFont);
  applyFontPreset(certName, textStyleOverrides.nameFont);
  applyFontPreset(certEvent, textStyleOverrides.eventFont);
  if (certMeta) {
    applyFontPreset(certMeta, textStyleOverrides.metaFont);
  }
  applyFontPreset(certSigLabel, textStyleOverrides.sigFont);

  certTitle.style.color = textStyleOverrides.titleColor || '';
  certName.style.color = textStyleOverrides.nameColor || '';

  const bodyColor = textStyleOverrides.bodyColor || '';
  certSubtitle.style.color = bodyColor;
  certEvent.style.color = bodyColor;
  if (certMeta) certMeta.style.color = bodyColor;
  certSigLabel.style.color = bodyColor;
}

function setMovableTextTransform(element, x, y) {
  element.style.transform = `translate(${x}px, ${y}px)`;
  element.dataset.moveX = String(x);
  element.dataset.moveY = String(y);
}

function selectMovableText(element) {
  movableTextElements.forEach((item) => item.classList.toggle('selected', item === element));
}

function clearMovableTextSelection() {
  movableTextElements.forEach((item) => item.classList.remove('selected'));
}

function resetMovableTextPositions() {
  movableTextElements.forEach((element) => {
    movableTextOffsets.set(element.id, { x: 0, y: 0 });
    setMovableTextTransform(element, 0, 0);
  });
  clearMovableTextSelection();
}

function onMovableTextPointerDown(event) {
  const element = event.currentTarget;
  if (!(element instanceof HTMLElement)) return;

  event.preventDefault();
  selectMovableText(element);

  const currentOffset = movableTextOffsets.get(element.id) || { x: 0, y: 0 };
  textDragState.element = element;
  textDragState.pointerId = event.pointerId;
  textDragState.startX = event.clientX;
  textDragState.startY = event.clientY;
  textDragState.originX = currentOffset.x;
  textDragState.originY = currentOffset.y;

  if (typeof element.setPointerCapture === 'function') {
    element.setPointerCapture(event.pointerId);
  }
}

function onMovableTextPointerMove(event) {
  if (!textDragState.element || event.pointerId !== textDragState.pointerId) return;

  const dx = event.clientX - textDragState.startX;
  const dy = event.clientY - textDragState.startY;
  const nextX = Math.round(textDragState.originX + dx);
  const nextY = Math.round(textDragState.originY + dy);

  movableTextOffsets.set(textDragState.element.id, { x: nextX, y: nextY });
  setMovableTextTransform(textDragState.element, nextX, nextY);
}

function onMovableTextPointerUp(event) {
  if (!textDragState.element || event.pointerId !== textDragState.pointerId) return;

  const currentElement = textDragState.element;
  if (typeof currentElement.releasePointerCapture === 'function') {
    currentElement.releasePointerCapture(event.pointerId);
  }

  textDragState.element = null;
  textDragState.pointerId = null;
}

function initializeMovableTextEditor() {
  movableTextElements.forEach((element) => {
    element.classList.add('movable-text');
    element.style.touchAction = 'none';

    const storedX = Number(element.dataset.moveX || 0);
    const storedY = Number(element.dataset.moveY || 0);
    movableTextOffsets.set(element.id, { x: storedX, y: storedY });
    setMovableTextTransform(element, storedX, storedY);

    element.addEventListener('pointerdown', onMovableTextPointerDown);
  });

  window.addEventListener('pointermove', onMovableTextPointerMove);
  window.addEventListener('pointerup', onMovableTextPointerUp);
  window.addEventListener('pointercancel', onMovableTextPointerUp);

  if (cert) {
    cert.addEventListener('pointerdown', (event) => {
      const target = event.target;
      if (target instanceof Element && !target.closest('.movable-text')) {
        clearMovableTextSelection();
      }
    });
  }
}

function renderCertificateEvent(eventText, fallback = 'Event / Course') {
  const strong = document.createElement('strong');
  strong.textContent = String(eventText ?? '').trim() || fallback;
  certEvent.textContent = certEventPrefix;
  certEvent.appendChild(strong);
}

function sanitizeFileBaseName(name, fallback = 'certificate') {
  const sanitized = String(name ?? '')
    .trim()
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '');
  return sanitized || fallback;
}

function createUniqueFileBaseName(name, index, usedNames) {
  const base = sanitizeFileBaseName(name, `participant_${index + 1}`);
  if (!usedNames) return base;

  let candidate = base;
  let counter = 2;
  while (usedNames.has(candidate)) {
    candidate = `${base}_${counter}`;
    counter++;
  }
  usedNames.add(candidate);
  return candidate;
}

function applyCertificateTemplateClass(templateClass) {
  cert.classList.remove(...templateClasses);
  cert.classList.add(templateClass);
}

function applyCertificateOrientation() {
  cert.classList.remove('landscape', 'portrait');
  cert.classList.add(currentOrientation);
}

function applyCustomBackground() {
  const shouldUseCustomBg = Boolean(bgDataUrl && bgToggle && bgToggle.checked);

  if (shouldUseCustomBg) {
    cert.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.82)), url("${bgDataUrl}")`;
    cert.style.backgroundPosition = 'center';
    cert.style.backgroundRepeat = 'no-repeat';
    cert.style.backgroundSize = 'cover';
  } else {
    cert.style.backgroundImage = '';
    cert.style.backgroundPosition = '';
    cert.style.backgroundRepeat = '';
    cert.style.backgroundSize = '';
  }
}

function getExportRenderSize() {
  return currentOrientation === 'portrait'
    ? exportRenderDimensions.portrait
    : exportRenderDimensions.landscape;
}

async function captureCertificateCanvas() {
  const { width, height } = getExportRenderSize();
  const exportHost = document.createElement('div');
  exportHost.style.position = 'fixed';
  exportHost.style.left = '-10000px';
  exportHost.style.top = '0';
  exportHost.style.width = `${width}px`;
  exportHost.style.height = `${height}px`;
  exportHost.style.overflow = 'hidden';
  exportHost.style.pointerEvents = 'none';
  exportHost.style.opacity = '0';
  exportHost.style.zIndex = '-1';

  const exportCert = cert.cloneNode(true);
  exportCert.removeAttribute('id');
  exportCert.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
  exportCert.querySelectorAll('.movable-text.selected').forEach((node) => node.classList.remove('selected'));
  exportCert.style.width = `${width}px`;
  exportCert.style.maxWidth = `${width}px`;
  exportCert.style.height = `${height}px`;
  exportCert.style.minHeight = `${height}px`;
  exportCert.style.margin = '0';
  exportCert.style.transform = 'none';
  exportCert.style.display = 'flex';

  exportHost.appendChild(exportCert);
  document.body.appendChild(exportHost);

  try {
    return await html2canvas(exportCert, {
      scale: 2,
      useCORS: true,
      width,
      height,
      windowWidth: Math.max(width + 200, 1600),
      windowHeight: Math.max(height + 200, 1200)
    });
  } finally {
    exportHost.remove();
  }
}

function updatePreview() {
  certName.textContent = participantInput.value || 'Participant Name';
  renderCertificateEvent(eventInput.value, 'Event / Course');
  certDate.textContent = dateInput.value || '';
  certIssuer.textContent = issuerInput.value || '';

  applyCertificateTemplateClass(templateSelect.value);
  applyCertificateOrientation();
  applyCustomBackground();
  applyTextEditorStyles();
  syncTextControlsWithPreview();
}

function readFileAsDataURL(file, cb) {
  if (!file) {
    cb(null);
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => cb(e.target.result);
  reader.onerror = () => cb(null);
  reader.readAsDataURL(file);
}

function setCertificateData(participant, templateClass) {
  certName.textContent = participant.name;
  renderCertificateEvent(participant.event, 'Event / Course');
  certDate.textContent = participant.date;
  certIssuer.textContent = participant.issuer;
  applyCertificateTemplateClass(templateClass);
  applyCertificateOrientation();
  applyCustomBackground();
  applyTextEditorStyles();
}

function resolveTemplateForParticipant(participant, defaultTemplate) {
  const normalizedCategory = String(participant.category ?? '').trim().toLowerCase();
  if (normalizedCategory && categoryTemplateMap[normalizedCategory]) {
    return categoryTemplateMap[normalizedCategory][0];
  }
  return defaultTemplate;
}

function setButtonLoading(button, icon, text, isLoading) {
  button.disabled = isLoading;
  if (isLoading) {
    button.innerHTML = '<span class="material-icons">hourglass_empty</span>Processing...';
  } else {
    button.innerHTML = `<span class="material-icons">${icon}</span>${text}`;
  }
}

async function loadScriptOnce(url, globalName) {
  if (window[globalName]) return;

  const existing = document.querySelector(`script[data-lib="${globalName}"]`);
  if (existing) {
    await new Promise((resolve, reject) => {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
    });
    if (!window[globalName]) {
      throw new Error(`Failed to load ${globalName}`);
    }
    return;
  }

  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.dataset.lib = globalName;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  if (!window[globalName]) {
    throw new Error(`Failed to load ${globalName}`);
  }
}

if (logoInput) {
  logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    readFileAsDataURL(file, (dataUrl) => {
      logoDataUrl = dataUrl;
      if (dataUrl) {
        certLogo.src = dataUrl;
        certLogo.hidden = false;
      } else {
        certLogo.src = '';
        certLogo.hidden = true;
      }
    });
  });
}

if (sigInput) {
  sigInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    readFileAsDataURL(file, (dataUrl) => {
      sigDataUrl = dataUrl;
      if (dataUrl) {
        certSig.src = dataUrl;
        certSig.hidden = false;
      } else {
        certSig.src = '';
        certSig.hidden = true;
      }
    });
  });
}

if (bgInput) {
  bgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    readFileAsDataURL(file, (dataUrl) => {
      bgDataUrl = dataUrl;
      if (bgToggle) {
        bgToggle.disabled = !dataUrl;
        bgToggle.checked = Boolean(dataUrl);
      }
      applyCustomBackground();
    });
  });
}

if (bgToggle) {
  bgToggle.addEventListener('change', applyCustomBackground);
}

if (certTitleInput) {
  certTitleInput.addEventListener('input', applyTextEditorStyles);
}

if (certSubtitleInput) {
  certSubtitleInput.addEventListener('input', applyTextEditorStyles);
}

if (certSigLabelInput) {
  certSigLabelInput.addEventListener('input', applyTextEditorStyles);
}

if (titleFontSelect) {
  titleFontSelect.addEventListener('change', (e) => {
    textStyleOverrides.titleFont = String(e.target.value || '') || null;
    ensureFontPresetLoaded(textStyleOverrides.titleFont);
    applyTextEditorStyles();
  });
}

if (subtitleFontSelect) {
  subtitleFontSelect.addEventListener('change', (e) => {
    textStyleOverrides.subtitleFont = String(e.target.value || '') || null;
    ensureFontPresetLoaded(textStyleOverrides.subtitleFont);
    applyTextEditorStyles();
  });
}

if (nameFontSelect) {
  nameFontSelect.addEventListener('change', (e) => {
    textStyleOverrides.nameFont = String(e.target.value || '') || null;
    ensureFontPresetLoaded(textStyleOverrides.nameFont);
    applyTextEditorStyles();
  });
}

if (eventFontSelect) {
  eventFontSelect.addEventListener('change', (e) => {
    textStyleOverrides.eventFont = String(e.target.value || '') || null;
    ensureFontPresetLoaded(textStyleOverrides.eventFont);
    applyTextEditorStyles();
  });
}

if (metaFontSelect) {
  metaFontSelect.addEventListener('change', (e) => {
    textStyleOverrides.metaFont = String(e.target.value || '') || null;
    ensureFontPresetLoaded(textStyleOverrides.metaFont);
    applyTextEditorStyles();
  });
}

if (sigFontSelect) {
  sigFontSelect.addEventListener('change', (e) => {
    textStyleOverrides.sigFont = String(e.target.value || '') || null;
    ensureFontPresetLoaded(textStyleOverrides.sigFont);
    applyTextEditorStyles();
  });
}

if (titleSizeInput) {
  titleSizeInput.addEventListener('input', (e) => {
    textStyleOverrides.titleSize = Number(e.target.value);
    updateRangeValueLabel(titleSizeInput, titleSizeValue);
    applyTextEditorStyles();
  });
}

if (nameSizeInput) {
  nameSizeInput.addEventListener('input', (e) => {
    textStyleOverrides.nameSize = Number(e.target.value);
    updateRangeValueLabel(nameSizeInput, nameSizeValue);
    applyTextEditorStyles();
  });
}

if (eventSizeInput) {
  eventSizeInput.addEventListener('input', (e) => {
    textStyleOverrides.eventSize = Number(e.target.value);
    updateRangeValueLabel(eventSizeInput, eventSizeValue);
    applyTextEditorStyles();
  });
}

if (titleColorInput) {
  titleColorInput.addEventListener('input', (e) => {
    textStyleOverrides.titleColor = String(e.target.value || '');
    applyTextEditorStyles();
  });
}

if (nameColorInput) {
  nameColorInput.addEventListener('input', (e) => {
    textStyleOverrides.nameColor = String(e.target.value || '');
    applyTextEditorStyles();
  });
}

if (bodyColorInput) {
  bodyColorInput.addEventListener('input', (e) => {
    textStyleOverrides.bodyColor = String(e.target.value || '');
    applyTextEditorStyles();
  });
}

if (resetTextStylesBtn) {
  resetTextStylesBtn.addEventListener('click', () => {
    textStyleOverrides.titleSize = null;
    textStyleOverrides.nameSize = null;
    textStyleOverrides.eventSize = null;
    textStyleOverrides.titleFont = null;
    textStyleOverrides.subtitleFont = null;
    textStyleOverrides.nameFont = null;
    textStyleOverrides.eventFont = null;
    textStyleOverrides.metaFont = null;
    textStyleOverrides.sigFont = null;
    textStyleOverrides.titleColor = null;
    textStyleOverrides.nameColor = null;
    textStyleOverrides.bodyColor = null;
    applyTextEditorStyles();
    syncTextControlsWithPreview();
  });
}

if (resetTextPositionBtn) {
  resetTextPositionBtn.addEventListener('click', resetMovableTextPositions);
}

if (previewBtn) {
  previewBtn.addEventListener('click', updatePreview);
}

if (orientationLandscapeBtn && orientationPortraitBtn) {
  orientationLandscapeBtn.addEventListener('click', () => {
    currentOrientation = 'landscape';
    orientationLandscapeBtn.classList.add('active');
    orientationPortraitBtn.classList.remove('active');
    updatePreview();
  });

  orientationPortraitBtn.addEventListener('click', () => {
    currentOrientation = 'portrait';
    orientationPortraitBtn.classList.add('active');
    orientationLandscapeBtn.classList.remove('active');
    updatePreview();
  });
}

if (categorySelect) {
  categorySelect.addEventListener('change', (e) => {
    const category = String(e.target.value ?? '').trim().toLowerCase();
    const suggestedTemplates = categoryTemplateMap[category] || [];
    updateCategoryTemplateRecommendations(category);
    if (suggestedTemplates.length > 0 && !suggestedTemplates.includes(templateSelect.value)) {
      templateSelect.value = suggestedTemplates[0];
    }
    updatePreview();
  });
}

if (downloadPngBtn) {
  downloadPngBtn.addEventListener('click', async () => {
    updatePreview();
    setButtonLoading(downloadPngBtn, 'image', 'PNG', true);

    try {
      const canvas = await captureCertificateCanvas();
      const dataURL = canvas.toDataURL('image/png', 1.0);
      const fileBaseName = sanitizeFileBaseName(participantInput.value, 'certificate');

      const link = document.createElement('a');
      link.download = `${fileBaseName}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      alert('Error generating PNG: ' + e.message);
    } finally {
      setButtonLoading(downloadPngBtn, 'image', 'PNG', false);
    }
  });
}

if (downloadPdfBtn) {
  downloadPdfBtn.addEventListener('click', async () => {
    updatePreview();
    setButtonLoading(downloadPdfBtn, 'picture_as_pdf', 'PDF', true);

    try {
      const canvas = await captureCertificateCanvas();
      const imgData = canvas.toDataURL('image/png', 1.0);
      const fileBaseName = sanitizeFileBaseName(participantInput.value, 'certificate');
      const { jsPDF } = window.jspdf;

      const pdf = new jsPDF({
        orientation: currentOrientation,
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileBaseName}.pdf`);
    } catch (e) {
      alert('Error generating PDF: ' + e.message);
    } finally {
      setButtonLoading(downloadPdfBtn, 'picture_as_pdf', 'PDF', false);
    }
  });
}

if (processExcelBtn) {
  processExcelBtn.addEventListener('click', async () => {
    const file = excelInput && excelInput.files ? excelInput.files[0] : null;
    if (!file) {
      alert('Please select an Excel or CSV file');
      return;
    }

    processExcelBtn.disabled = true;
    progressContainer.style.display = 'flex';

    try {
      if (isCsvFile(file)) {
        await processCsvFile(file);
      } else {
        await loadScriptOnce('vendor/xlsx-0.18.5.full.min.js', 'XLSX');
        await processExcelFile(file);
      }
    } catch (e) {
      alert('Error: ' + e.message);
      resetBatchUI();
    }
  });
}

function isCsvFile(file) {
  const name = String(file && file.name ? file.name : '').toLowerCase();
  const mimeType = String(file && file.type ? file.type : '').toLowerCase();
  return name.endsWith('.csv') || mimeType.includes('csv');
}

function buildParticipantsFromRows(rows) {
  const participants = [];
  const firstCell = String((rows[0] && rows[0][0]) ?? '')
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase();
  const startRow = firstCell === 'name' ? 1 : 0;
  const defaultCategory = String(categorySelect.value ?? '').trim().toLowerCase();

  for (let i = startRow; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;

    const name = String(row[0] ?? '').trim();
    if (!name) continue;

    participants.push({
      name,
      event: String(row[1] ?? '').trim() || eventInput.value.trim() || 'Event / Course',
      date: String(row[2] ?? '').trim() || dateInput.value.trim(),
      issuer: String(row[3] ?? '').trim() || issuerInput.value.trim(),
      category: String(row[4] ?? '').trim().toLowerCase() || defaultCategory
    });
  }

  return participants;
}

async function processExcelFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = window.XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const participants = buildParticipantsFromRows(rows);

        if (participants.length === 0) {
          alert('No valid participant data found in Excel file');
          resetBatchUI();
          resolve();
          return;
        }

        await generateBatchCertificates(participants);
      } catch (err) {
        alert('Error processing Excel: ' + err.message);
        resetBatchUI();
      } finally {
        resolve();
      }
    };

    reader.onerror = () => {
      alert('Failed to read Excel file');
      resetBatchUI();
      resolve();
    };

    reader.readAsArrayBuffer(file);
  });
}

function parseCsvRows(csvText) {
  const rows = [];
  let row = [];
  let cell = '';
  let insideQuotes = false;
  const normalized = String(csvText ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // State machine parser that handles quoted commas and escaped double-quotes.
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];

    if (char === '"') {
      if (insideQuotes && normalized[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === ',' && !insideQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if (char === '\n' && !insideQuotes) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

async function processCsvFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const csvText = String(e.target.result ?? '');
        const rows = parseCsvRows(csvText);
        const participants = buildParticipantsFromRows(rows);

        if (participants.length === 0) {
          alert('No valid participant data found in CSV file');
          resetBatchUI();
          resolve();
          return;
        }

        await generateBatchCertificates(participants);
      } catch (err) {
        alert('Error processing CSV: ' + err.message);
        resetBatchUI();
      } finally {
        resolve();
      }
    };

    reader.onerror = () => {
      alert('Failed to read CSV file');
      resetBatchUI();
      resolve();
    };

    reader.readAsText(file);
  });
}

async function generateBatchCertificates(participants) {
  try {
    await loadScriptOnce('vendor/jszip-3.10.1.min.js', 'JSZip');
    await createBatchZip(participants);
  } catch (e) {
    console.error('JSZip unavailable, using PNG fallback:', e);
    await createBatchWithoutZip(participants);
  }
}

async function createBatchZip(participants) {
  const zip = new window.JSZip();
  const usedFileNames = new Set();
  const total = participants.length;
  const defaultTemplate = templateSelect.value;
  let successCount = 0;

  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    try {
      const fileBaseName = createUniqueFileBaseName(participant.name, i, usedFileNames);
      const templateClass = resolveTemplateForParticipant(participant, defaultTemplate);
      setCertificateData(participant, templateClass);

      const canvas = await captureCertificateCanvas();
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pngBase64 = imgData.split(',')[1];
      zip.file(`${fileBaseName}.png`, pngBase64, { base64: true });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: currentOrientation,
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      zip.file(`${fileBaseName}.pdf`, pdf.output('arraybuffer'), { binary: true });

      successCount++;
      updateProgress(successCount, total);
    } catch (e) {
      console.error(`Error processing ${participant.name}:`, e);
    }
  }

  try {
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = zipUrl;
    link.download = `certificates_${Date.now()}.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(zipUrl);

    showBatchComplete(successCount, total);
  } catch (e) {
    alert('Error creating ZIP: ' + e.message);
  }

  resetBatchUI();
}

async function createBatchWithoutZip(participants) {
  const usedFileNames = new Set();
  const total = participants.length;
  const defaultTemplate = templateSelect.value;
  let successCount = 0;

  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    try {
      const fileBaseName = createUniqueFileBaseName(participant.name, i, usedFileNames);
      const templateClass = resolveTemplateForParticipant(participant, defaultTemplate);
      setCertificateData(participant, templateClass);

      const canvas = await captureCertificateCanvas();
      const dataURL = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${fileBaseName}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      link.remove();

      successCount++;
      updateProgress(successCount, total);
    } catch (e) {
      console.error(`Error processing ${participant.name}:`, e);
    }
  }

  showBatchComplete(successCount, total);
  resetBatchUI();
}

function updateProgress(current, total) {
  const percentage = Math.round((current / total) * 100);
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `Processing: ${current}/${total}`;
  progressPercent.textContent = `${percentage}%`;
}

function resetBatchUI() {
  processExcelBtn.disabled = false;
  progressContainer.style.display = 'none';
  progressFill.style.width = '0%';
  progressText.textContent = 'Processing: 0/0';
  progressPercent.textContent = '0%';
  updatePreview();
}

function showBatchComplete(success, total) {
  const modal = document.getElementById('batch-modal');
  const overlay = document.getElementById('modal-overlay');
  const message = document.getElementById('modal-message');
  const stats = document.getElementById('modal-stats');

  message.textContent = `Successfully generated ${success} out of ${total} certificates.`;

  stats.innerHTML = '';
  const completedLine = document.createElement('div');
  completedLine.textContent = `Completed: ${success}`;
  const failedLine = document.createElement('div');
  failedLine.textContent = `Failed: ${total - success}`;
  const downloadLine = document.createElement('div');
  downloadLine.textContent = 'Download: Check your Downloads folder for the ZIP file';
  stats.append(completedLine, failedLine, downloadLine);

  modal.style.display = 'block';
  overlay.style.display = 'block';
}

function closeBatchModal() {
  const modal = document.getElementById('batch-modal');
  const overlay = document.getElementById('modal-overlay');
  modal.style.display = 'none';
  overlay.style.display = 'none';
  if (excelInput) excelInput.value = '';
}

window.closeBatchModal = closeBatchModal;

[participantInput, eventInput, dateInput, issuerInput, templateSelect, categorySelect]
  .filter(Boolean)
  .forEach((el) => {
    el.addEventListener('input', updatePreview);
    el.addEventListener('change', updatePreview);
  });

if (orientationLandscapeBtn && orientationPortraitBtn) {
  orientationLandscapeBtn.classList.add('active');
  orientationPortraitBtn.classList.remove('active');
}

initializeFontSelectors();
initializeMovableTextEditor();
updateCategoryTemplateRecommendations(categorySelect ? categorySelect.value : '');
updatePreview();
