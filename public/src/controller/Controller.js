class Controller {
  constructor() {
    this.btnFileEl = document.querySelector('#btn-send-file');
    this.inputFileEl = document.querySelector('#files');
    this.barModalEl = document.querySelector('#react-snackbar-root');

    this.initEvent();
  }

  initEvent() {
    this.btnFileEl.addEventListener('click', (e) => {

      this.inputFileEl.click();

    });

    this.inputFileEl.addEventListener('change', (e) => {

      this.upLoadFile(e.target.files)

      this.barModalEl.style.display = 'block';


    });
  }

  upLoadFile(files) {

    let promises = [];

    [...files].forEach(file => {

      promises.push(new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest();

        ajax.open('POST', '/upload');

        ajax.onload = e => {

          try {

            resolve(JSON.parse(ajax.responseText));

          } catch (e) {

            reject(e);

          }
        }

        ajax.onerror = e => {

          reject(e);
        }

        let formData = new FormData();

        formData.append('input-file', file);

        ajax.send(formData)

      }))


    })

    return Promise.all(promises);

  }
}
