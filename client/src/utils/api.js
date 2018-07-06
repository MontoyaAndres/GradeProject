const API = 'http://181.51.3.153:8080';

function simulateClick(response) {
  // create new element <a> to "download" the file
  const save = document.createElement('a');
  save.href = response.url;
  save.download = '';
  // creating click event
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  // simulate click to download the file
  save.dispatchEvent(clickEvent);
  // cleaning resources
  (window.URL || window.webkitURL).revokeObjectURL(save.href);
}

// eslint-disable
async function downloadFilePeriod(CodigoPrograma, TipoSemestre) {
  await fetch(`${API}/download/${CodigoPrograma}/${TipoSemestre}`).then(response => simulateClick(response));
}

async function downloadFileCompared(periodSelected1, periodSelected2, career) {
  await fetch(`${API}/compare/${periodSelected1}/${periodSelected2}/${career}`).then(response =>
    simulateClick(response)
  );
}

export { downloadFilePeriod, downloadFileCompared };