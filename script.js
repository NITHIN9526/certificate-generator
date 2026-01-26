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

const previewBtn = document.getElementById('preview-btn');
const downloadPngBtn = document.getElementById('download-png');
const downloadPdfBtn = document.getElementById('download-pdf');

const excelInput = document.getElementById('excel-input');
const processExcelBtn = document.getElementById('process-excel');

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

// Global variables for Excel batch processing
let logoDataUrl = null;
let sigDataUrl = null;

// Category to template suggestions map
const categoryTemplateMap = {
  'sports': ['sports-dynamic', 'sports-medal', 'sports-champion'],
  'arts': ['arts-creative', 'arts-vibrant', 'arts-gallery'],
  'academics': ['academic-formal', 'academic-modern', 'academic-distinction'],
  'participation': ['modern', 'classic', 'achievement-bold'],
  'excellence': ['excellence-premium', 'gold', 'achievement-bold'],
  'achievement': ['achievement-bold', 'sports-medal', 'excellence-premium'],
  'leadership': ['leadership-elite', 'excellence-premium', 'modern'],
  'innovation': ['arts-creative', 'modern', 'excellence-premium']
};

// Apply initial values
function updatePreview() {
  certName.textContent = participantInput.value || 'Participant Name';
  certEvent.innerHTML = `has successfully participated in <strong>${eventInput.value || 'Event / Course'}</strong>`;

  certDate.textContent = dateInput.value || '';
  certIssuer.textContent = issuerInput.value || '';

  cert.classList.remove('classic','modern','gold','sports-dynamic','sports-medal','sports-champion','arts-creative','arts-vibrant','arts-gallery','academic-formal','academic-modern','academic-distinction','excellence-premium','achievement-bold','leadership-elite');
  cert.classList.add(templateSelect.value);
}

// Read file input and set src of the image
function readFileAsDataURL(file, cb) {
  if (!file) return cb(null);
  const reader = new FileReader();
  reader.onload = e => cb(e.target.result);
  reader.onerror = () => cb(null);
  reader.readAsDataURL(file);
}

logoInput.addEventListener('change', (e) => {
  const f = e.target.files[0];
  readFileAsDataURL(f, (dataUrl) => {
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

sigInput.addEventListener('change', (e) => {
  const f = e.target.files[0];
  readFileAsDataURL(f, (dataUrl) => {
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

previewBtn.addEventListener('click', updatePreview);

// Category change handler - suggests appropriate templates
categorySelect.addEventListener('change', (e) => {
  const category = e.target.value;
  const suggestedTemplates = categoryTemplateMap[category];
  
  // Set to first suggested template
  if (suggestedTemplates && suggestedTemplates.length > 0) {
    templateSelect.value = suggestedTemplates[0];
  }
  
  updatePreview();
});

// Single Certificate Downloads
downloadPngBtn.addEventListener('click', async () => {
  updatePreview();
  downloadPngBtn.disabled = true;
  downloadPngBtn.innerHTML = '<span class="material-icons">hourglass_empty</span>Processing...';
  
  try {
    const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
    const dataURL = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `${participantInput.value || 'certificate'}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch(e) {
    alert('Error generating PNG: ' + e.message);
  } finally {
    downloadPngBtn.disabled = false;
    downloadPngBtn.innerHTML = '<span class="material-icons">image</span>PNG';
  }
});

downloadPdfBtn.addEventListener('click', async () => {
  updatePreview();
  downloadPdfBtn.disabled = true;
  downloadPdfBtn.innerHTML = '<span class="material-icons">hourglass_empty</span>Processing...';
  
  try {
    const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png', 1.0);
    const { jsPDF } = window.jspdf;
    
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'pt',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${participantInput.value || 'certificate'}.pdf`);
  } catch(e) {
    alert('Error generating PDF: ' + e.message);
  } finally {
    downloadPdfBtn.disabled = false;
    downloadPdfBtn.innerHTML = '<span class="material-icons">picture_as_pdf</span>PDF';
  }
});

// Excel batch processing
processExcelBtn.addEventListener('click', async () => {
  const file = excelInput.files[0];
  
  if (!file) {
    alert('Please select an Excel file');
    return;
  }

  processExcelBtn.disabled = true;
  progressContainer.style.display = 'flex';
  
  try {
    // Load XLSX library dynamically
    if (!window.XLSX) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      script.onload = () => processExcelFile(file);
      script.onerror = () => {
        alert('Failed to load Excel library');
        resetBatchUI();
      };
      document.head.appendChild(script);
    } else {
      processExcelFile(file);
    }
  } catch(e) {
    alert('Error: ' + e.message);
    resetBatchUI();
  }
});

async function processExcelFile(file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Parse Excel data (skip header row if present)
      let participants = [];
      const startRow = jsonData[0] && (jsonData[0][0] === 'Name' || jsonData[0][0] === 'name') ? 1 : 0;
      
      for (let i = startRow; i < jsonData.length; i++) {
        const row = jsonData[i];
        if (row && row[0]) { // Ensure row has data
          participants.push({
            name: String(row[0] || '').trim(),
            event: String(row[1] || eventInput.value).trim(),
            date: String(row[2] || dateInput.value).trim(),
            issuer: String(row[3] || issuerInput.value).trim(),
            category: String(row[4] || categorySelect.value).trim()
          });
        }
      }

      if (participants.length === 0) {
        alert('No valid participant data found in Excel file');
        resetBatchUI();
        return;
      }

      // Generate certificates
      await generateBatchCertificates(participants);
    } catch(err) {
      alert('Error processing Excel: ' + err.message);
      resetBatchUI();
    }
  };
  reader.readAsArrayBuffer(file);
}

async function generateBatchCertificates(participants) {
  const JSZip = window.JSZip;
  
  if (!JSZip) {
    // Load JSZip for creating ZIP files
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
    script.onload = async () => {
      await createBatchZip(participants);
    };
    script.onerror = async () => {
      // Fallback: download as PNG files without ZIP
      await createBatchWithoutZip(participants);
    };
    document.head.appendChild(script);
  } else {
    await createBatchZip(participants);
  }
}

async function createBatchZip(participants) {
  const zip = new JSZip();
  let successCount = 0;
  const total = participants.length;
  const template = templateSelect.value;

  for (let i = 0; i < participants.length; i++) {
    try {
      const p = participants[i];
      
      // Determine template based on category if provided
      let certTemplate = template;
      if (p.category && categoryTemplateMap[p.category]) {
        certTemplate = categoryTemplateMap[p.category][0];
      }
      
      // Update certificate with participant data
      certName.textContent = p.name;
      certEvent.innerHTML = `has successfully participated in <strong>${p.event}</strong>`;
      certDate.textContent = p.date;
      certIssuer.textContent = p.issuer;
      cert.className = `certificate ${certTemplate}`;
      
      // Generate PNG
      const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png', 1.0);
      const base64Data = imgData.split(',')[1];
      
      // Add to ZIP
      zip.file(`${p.name.replace(/[^a-z0-9]/gi, '_')}.png`, base64Data, { base64: true });
      
      // Also generate PDF
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      const pdfData = pdf.output('arraybuffer');
      zip.file(`${p.name.replace(/[^a-z0-9]/gi, '_')}.pdf`, pdfData, { binary: true });
      
      successCount++;
      updateProgress(successCount, total);
    } catch(e) {
      console.error(`Error processing ${participants[i].name}:`, e);
    }
  }

  try {
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = `certificates_${new Date().getTime()}.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    showBatchComplete(successCount, total);
  } catch(e) {
    alert('Error creating ZIP: ' + e.message);
  }
  
  resetBatchUI();
}

async function createBatchWithoutZip(participants) {
  let successCount = 0;
  const total = participants.length;
  const template = templateSelect.value;

  for (let i = 0; i < participants.length; i++) {
    try {
      const p = participants[i];
      
      certName.textContent = p.name;
      certEvent.innerHTML = `has successfully participated in <strong>${p.event}</strong>`;
      certDate.textContent = p.date;
      certIssuer.textContent = p.issuer;
      cert.className = `certificate ${template}`;
      
      const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
      const dataURL = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${p.name.replace(/[^a-z0-9]/gi, '_')}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      successCount++;
      updateProgress(successCount, total);
    } catch(e) {
      console.error(`Error processing ${participants[i].name}:`, e);
    }
  }
  
  showBatchComplete(successCount, total);
  resetBatchUI();
}

function updateProgress(current, total) {
  const percentage = Math.round((current / total) * 100);
  progressFill.style.width = percentage + '%';
  progressText.textContent = `Processing: ${current}/${total}`;
  progressPercent.textContent = percentage + '%';
}

function resetBatchUI() {
  processExcelBtn.disabled = false;
  progressContainer.style.display = 'none';
  progressFill.style.width = '0%';
  progressText.textContent = 'Processing: 0/0';
  progressPercent.textContent = '0%';
  
  // Restore original certificate
  updatePreview();
}

function showBatchComplete(success, total) {
  const modal = document.getElementById('batch-modal');
  const overlay = document.getElementById('modal-overlay');
  const message = document.getElementById('modal-message');
  const stats = document.getElementById('modal-stats');
  
  message.textContent = `Successfully generated ${success} out of ${total} certificates!`;
  stats.innerHTML = `
    <div>✅ Completed: ${success}</div>
    <div>❌ Failed: ${total - success}</div>
    <div>📦 Download: Check your Downloads folder for the ZIP file</div>
  `;
  
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

function closeBatchModal() {
  const modal = document.getElementById('batch-modal');
  const overlay = document.getElementById('modal-overlay');
  modal.style.display = 'none';
  overlay.style.display = 'none';
  excelInput.value = '';
}

// Live-update on field change
[participantInput, eventInput, dateInput, issuerInput, templateSelect, categorySelect].forEach(el => {
  el.addEventListener('input', updatePreview);
  el.addEventListener('change', updatePreview);
});

// Initialize preview
updatePreview();
