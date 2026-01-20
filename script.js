// Certificate Generator - client side
// Requires html2canvas and jsPDF (UMD) loaded in the page

const participantInput = document.getElementById('participant');
const eventInput = document.getElementById('event');
const dateInput = document.getElementById('date');
const issuerInput = document.getElementById('issuer');
const templateSelect = document.getElementById('template-select');

const logoInput = document.getElementById('logo-input');
const sigInput = document.getElementById('sig-input');

const previewBtn = document.getElementById('preview-btn');
const downloadPngBtn = document.getElementById('download-png');
const downloadPdfBtn = document.getElementById('download-pdf');

const cert = document.getElementById('certificate');
const certName = document.getElementById('cert-name');
const certEvent = document.getElementById('cert-event');
const certDate = document.getElementById('cert-date');
const certIssuer = document.getElementById('cert-issuer');
const certLogo = document.getElementById('cert-logo');
const certSig = document.getElementById('cert-sig');

// Apply initial values
function updatePreview() {
  certName.textContent = participantInput.value || 'Participant Name';
  certEvent.innerHTML = `has successfully participated in <strong>${eventInput.value || 'Event / Course'}</strong>`;
  certDate.textContent = dateInput.value || '';
  certIssuer.textContent = issuerInput.value || '';

  // template
  cert.classList.remove('classic','modern');
  cert.classList.add(templateSelect.value);

  // logo and signature visibility handled by file readers
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

// Downloads
downloadPngBtn.addEventListener('click', async () => {
  updatePreview();
  const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
  const dataURL = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  link.download = `${participantInput.value || 'certificate'}.png`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  link.remove();
});

downloadPdfBtn.addEventListener('click', async () => {
  updatePreview();
  // Create high-res canvas
  const canvas = await html2canvas(cert, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png', 1.0);

  // Create PDF sized to certificate aspect ratio
  const { jsPDF } = window.jspdf;
  // A4 in points: 595.28 x 841.89 (approx)
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'pt',
    format: [canvas.width, canvas.height]
  });

  // Add image to pdf full size
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(`${participantInput.value || 'certificate'}.pdf`);
});

// Live-update on field change
[participantInput, eventInput, dateInput, issuerInput, templateSelect].forEach(el => {
  el.addEventListener('input', updatePreview);
});

// Initialize preview
updatePreview();