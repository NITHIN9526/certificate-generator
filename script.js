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

const previewBtn = document.getElementById('preview-btn');
const downloadPngBtn = document.getElementById('download-png');
const downloadPdfBtn = document.getElementById('download-pdf');

const excelInput = document.getElementById('excel-input');
const processExcelBtn = document.getElementById('process-excel');

const orientationLandscapeBtn = document.getElementById('orientation-landscape');
const orientationPortraitBtn = document.getElementById('orientation-portrait');

const cert = document.getElementById('certificate');
const certName = document.getElementById('cert-name');
const certEvent = document.getElementById('cert-event');
const certDate = document.getElementById('cert-date');
const certIssuer = document.getElementById('cert-issuer');
const certLogo = document.getElementById('cert-logo');
const certSig = document.getElementById('cert-sig');

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

function updatePreview() {
  certName.textContent = participantInput.value || 'Participant Name';
  renderCertificateEvent(eventInput.value, 'Event / Course');
  certDate.textContent = dateInput.value || '';
  certIssuer.textContent = issuerInput.value || '';

  applyCertificateTemplateClass(templateSelect.value);
  applyCertificateOrientation();
  applyCustomBackground();
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
      const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
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
      const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const fileBaseName = sanitizeFileBaseName(participantInput.value, 'certificate');
      const { jsPDF } = window.jspdf;

      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
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
      alert('Please select an Excel file');
      return;
    }

    processExcelBtn.disabled = true;
    progressContainer.style.display = 'flex';

    try {
      await loadScriptOnce('vendor/xlsx-0.18.5.full.min.js', 'XLSX');
      await processExcelFile(file);
    } catch (e) {
      alert('Error: ' + e.message);
      resetBatchUI();
    }
  });
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

        const participants = [];
        const firstCell = String((rows[0] && rows[0][0]) ?? '').trim().toLowerCase();
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

      const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pngBase64 = imgData.split(',')[1];
      zip.file(`${fileBaseName}.png`, pngBase64, { base64: true });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
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

      const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
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

updateCategoryTemplateRecommendations(categorySelect ? categorySelect.value : '');
updatePreview();
