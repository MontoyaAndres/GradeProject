const API = process.env.REACT_APP_SERVER_URL;

function simulateClick(response) {
  // create new element <a> to "download" the file
  const save = document.createElement("a");
  save.href = response.url;
  save.download = "";
  // creating click event
  const clickEvent = new MouseEvent("click", {
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
  await fetch(`${API}/download/${CodigoPrograma}/${TipoSemestre}`).then(
    response => simulateClick(response)
  );
}

async function downloadFileCompared(
  periodSelected1,
  periodSelected2,
  career,
  periodSelected
) {
  await fetch(
    `${API}/compare/${periodSelected1}/${periodSelected2}/${career}/${periodSelected}`
  ).then(response => simulateClick(response));
}

async function donwloadGraphic(
  style,
  CodigoPrograma,
  TipoSemestre,
  graphicBy,
  isVariable
) {
  await fetch(
    `${API}/grafica/${style}/${CodigoPrograma}/${TipoSemestre}/${graphicBy}/${isVariable}`
  ).then(response => simulateClick(response));
}

export { downloadFilePeriod, downloadFileCompared, donwloadGraphic };
