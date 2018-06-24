const API = 'http://localhost:8080';

// eslint-disable
async function downloadFile(CodigoPrograma, TipoSemestre) {
  await fetch(`${API}/download/${CodigoPrograma}/${TipoSemestre}`).then(response => {
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
  });
}

export { downloadFile };
