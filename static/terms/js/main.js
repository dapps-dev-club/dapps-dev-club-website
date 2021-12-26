document.addEventListener('DOMContentLoaded', onDocumentLoad);

function onDocumentLoad() {
  contactFormSetup();
}

function contactFormSetup() {
  const formSubmitEl = document.querySelector('.contact-form-submit');
  formSubmitEl.addEventListener('click', onContactFormSubmitClick);
}

// Submit form feature

async function onContactFormSubmitClick(ev) {
  ev.preventDefault();
  const formEl = document.querySelector('.contact-form');
  const formUrl =
    'https://script.google.com/macros/s/AKfycbxLE2JT62WiQeyafuLea5dDC2y0pQNF40RycqqY7tiXnQsQcepm/exec';
  const formFields = {
    ...serialiseFormFields(formEl),
    source: window.location.href,
  }
  let formResponse;
  try {
    formResponse = await httpGet(
      formUrl,
      'POST',
      [
        ['Content-Type', 'application/x-www-form-urlencoded'],
        ['Accept', 'application/json'],
      ],
      xWwwFormUrlEncode(formFields),
    );
  } catch (ex) {
    console.log(ex);
    console.error('Contact form submission failed');
  }
  console.log('formResponse', formResponse);
}

// network utility functions

async function httpGetJson(url) {
  const httpGetResponseData = await httpGet(url, 'GET');
  const json = JSON.parse(httpGetResponseData);
  return json;
}

async function httpGet(
  url,
  method = 'GET',
  headers = [],
  data = undefined,
) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url, true);
    headers.forEach(([key, value]) => {
      request.setRequestHeader(key, value);
    });
    request.onload = function() {
      const statusCode = this.status;
      if (statusCode >= 200 && statusCode < 400) {
        return resolve(this.response);
      } else {
        return reject(`Status code ${statusCode}`);
      }
    };
    request.onerror = function(err) {
      return reject(err);
    };
    if (data) {
      request.send(data);
    } else {
      request.send();
    }
  });
}

// form utility features

function serialiseFormFields(formEl) {
  var out = {};
  [...formEl.elements].forEach((field) => {
    if (!field.name) {
      return;
    }
    out[field.name] = field.value;
  });
  return out;
}

function xWwwFormUrlEncode(obj) {
  return Object.keys(obj).map((key) => (
    encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
  )).join('&');
}
