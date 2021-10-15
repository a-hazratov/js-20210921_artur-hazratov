export default class NotificationMessage {
  constructor (message, {duration = 0, type = ''} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render();
  }
  static activeNote;
   element;

   get template () {
     return `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
   }

   render () {
     const msgDiv = document.createElement('div');
     msgDiv.innerHTML = this.template;
     this.element = msgDiv.firstElementChild;
   }

   show (target = document.body) {
     if (NotificationMessage.activeNote) {
       NotificationMessage.activeNote.remove()
     }
     
     target.append(this.element);
     setTimeout(()=>{
       this.remove();
     }, this.duration);
     NotificationMessage.activeNote = this;

   }

   remove() {
     if (this.element) {
       this.element.remove();
     }
     
   }

   destroy () {
     this.element = null;
     this.message = '';
     this.remove();
   }
}
