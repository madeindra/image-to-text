// element references
const uploaderForm = document.getElementById('uploader');
const preview = document.getElementById('preview');
const submitBtn = document.getElementById('submit');
const resultText = document.getElementById('result');
const resultSpinner = document.getElementById('resultSpinner');

// tooltip for result text (copied to clipboard)
const tooltip = new bootstrap.Tooltip(resultText, {
  placement: 'top',
  title: 'text copied!',
  trigger: 'manual',
});

// handle the copy onclick event
resultText.onclick = () => {
  // copy the text inside the text field
  navigator.clipboard.writeText(resultText.innerText);

  // Show the tooltip after copying
  tooltip.show();

  // hide the tooltip after 1 seconds
  setTimeout(() => {
    tooltip.hide();
  }, 1000);
};

// handle preview on file selection
uploaderForm.onchange = (ev) => {
  preview.src = URL.createObjectURL(ev.target.files[0]);
  preview.classList.add('img-thumbnail');
};

// handle api call on form submit
uploaderForm.onsubmit = async (ev) => {
  ev.preventDefault();

  // reset the result
  resultText.innerText = '';

  // disable the submit button and show spinner
  submitBtn.disabled = true;
  resultSpinner.classList.remove('invisible');

  // create request body from the form (already set as multipart/form-data)
  const body = new FormData(uploaderForm);

  // send the request
  const response = await fetch('/recognize', { method: 'POST', body });

  if (response) {
    // parse the response
    const resBody = await response.json();

    // update the result
    resultText.innerText = resBody.data.text;
  }

  // enable the submit button and hide spinner
  submitBtn.disabled = false;
  resultSpinner.classList.add('invisible');
};
