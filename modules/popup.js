const  funcPopup = () => {
  const popupLibrary = {
    popUp: null,
    trigger: null,
    popupClose: null,
    isActive: false,

    // инициализация popup
    init(trig) {
      // if (!this.isActive) return; // если уже активен, ничего не делаем
      this.popUp = document.querySelector('.popup');
      this.popUpWindow = document.querySelector('.popup-body');
      const that = this;

      this.popUp.addEventListener('click', function(e) { that.close(e); });
      this.popUpWindow.addEventListener('click', function(e) { e.stopPropagation(); } );

      this.popUpClose = document.querySelector('.popup-close');
      this.popUpClose.addEventListener('click', function(e) {
        that.close(e);
      });

      if (trig) {
        this.trigger = trig;
        this.trigger.addEventListener('click', function(e) {
          that.open(e, popupHTML);
        });
      }
            // this.open.bind(this) // или так
      // Или
      // this.trigger.addEventListener('click', (e) => {
      //   this.open(e);
      // });

      window.addEventListener("keyup", function(e) {
        if (e.key === 'Escape') {
          that.close();
        }
      }, true);
    },

    // открытие popup
    open(e,someHTML) {
      if (someHTML) {
        console.log(this.popUp);
        this.popUp
          .querySelector('.popup-inner')
          .innerHTML = someHTML;
      }

      this.popUp.style.display = 'block';
      this.isActive = true;
    },

    // закрытие popup
    close() {
      console.log(this.popUp);
      this.popUp.style.display = 'none';
      this.isActive = false;
    },

    // сброс popup
    reset() {
      this.popUp = null;
      this.trigger.removeEventListener('click', this.open);
      this.trigger = null;
    }
  };
}
export default funcPopup;