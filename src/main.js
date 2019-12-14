const baseURL =
    'https://docs.google.com/forms/d/e/1FAIpQLScXNGcvU1LTpe24-FfLitJ3tQbR2di-avYg9cVYVG0wwuA3Eg/formResponse?';

class InterestForm extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const tmpl = document.querySelector('#interest-form');
    this.appendChild(tmpl.content.cloneNode(true));

    this.form = this.querySelector('form');
    this.form.onsubmit = (e) => {
      e.preventDefault();

      const queryString = new URLSearchParams(new FormData(this.form)).toString();
      fetch(baseURL + queryString, {
        method: 'POST',
        mode: 'no-cors',
      }).then(() => {
        if (!this.done) {
          this.done = document.createElement('p');
          this.done.innerText = 'Done!';
          this.appendChild(this.done);

          this.querySelector('button').remove()
        }
      })
    }
  }
}

customElements.define('interest-form', InterestForm);
