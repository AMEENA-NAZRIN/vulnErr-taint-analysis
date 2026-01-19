function analyze() {
  const fileInput = document.getElementById("file");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").textContent =
      JSON.stringify(data, null, 2);
  });
}
