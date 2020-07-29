class Controller {

  constructor() {

    this.btnFileEl = document.querySelector('#btn-send-file');
    this.inputFileEl = document.querySelector('#files');
    this.barModalEl = document.querySelector('#react-snackbar-root');
    this.progressBarEl = document.querySelector('.mc-progress-bar-fg');
    this.nameFileEl = document.querySelector('.filename');
    this.timeleftEl = document.querySelector('.timeleft');



    this.initEvent();
  }

  initEvent() {
    this.btnFileEl.addEventListener('click', (e) => {

      this.inputFileEl.click();

    });

    this.inputFileEl.addEventListener('change', (e) => {

      this.upLoadFile(e.target.files);

      this.modalShow();

      this.inputFileEl.value = '';

    });
  }

  modalShow(show = true) {

    this.barModalEl.style.display = show ? 'block' : 'none';

  }


  upLoadProgress(event, file) {

    let timeSpent = Date.now() - this.startUploadTime;

    let loaded = event.loaded;
    let total = event.total;
    let porcent = parseInt((loaded / total) * 100);

    let timeLeft = ((100 - porcent) * timeSpent) / porcent;

    this.progressBarEl.style.width = `${porcent}%`;

    this.nameFileEl.innerHTML = file.name;
    this.timeleftEl.innerHTML = this.formatTime(timeLeft);

  }

  formatTime(duration) {

    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    if (hours > 0) {

      return `${hours} horas, ${minutes} minutes e ${seconds} seconds `;
    }

    if (minutes > 0) {

      return ` ${minutes} minutes e ${seconds} seconds `;
    }

    if (seconds > 0) {

      return `${seconds} seconds `;
    }

    return ``;
  }

  upLoadFile(files) {

    let promises = [];

    [...files].forEach(file => {

      promises.push(new Promise((resolve, reject) => {

        let ajax = new XMLHttpRequest();

        ajax.open('POST', '/upload');

        ajax.onload = e => {

          this.modalShow(false);

          try {

            resolve(JSON.parse(ajax.responseText));

          } catch (e) {

            reject(e);

          }
        }

        ajax.onerror = e => {

          this.modalShow(false);

          reject(e);
        }

        ajax.upload.onprogress = (e) => {

          this.upLoadProgress(event, file);

        }

        let formData = new FormData();

        formData.append('input-file', file);

        this.startUploadTime = Date.now();

        ajax.send(formData)

      }))


    })

    return Promise.all(promises);

  }
}
