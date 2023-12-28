const uploaderForm = document.getElementById('uploader');

uploaderForm.onchange = (ev) => {
  document.getElementById('preview').src = URL.createObjectURL(ev.target.files[0]);
};

uploaderForm.onsubmit = async (ev) => {
  ev.preventDefault();

  // create request body from the form (already set as multipart/form-data)
  const body = new FormData(uploaderForm);

  // send the request
  const response = await fetch("/recognize", { method: "POST", body });

  if (response) {
    // parse the response
    const resBody = await response.json();

    // update the result
    document.getElementById('result').innerText = resBody.data.text;
  }
};
