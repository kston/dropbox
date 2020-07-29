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

      console.log(e.target.files);

      this.barModalEl.style.display = 'block';


    });
  }
}
