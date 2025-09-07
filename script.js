const form = document.getElementById("invitationForm");
const statusDiv = document.getElementById("status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  statusDiv.textContent = "Mengirim data...";
  statusDiv.style.color = "orange";

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzZzUDPe-V0_vIfdGpTmGQmjDSU9I1xXNPJUExuOTWklnri8_qdiU4er2SD8kN2_wuwAw/exec"; // <-- PENTING: Ganti dengan URL Anda
  const formData = new FormData(form);

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        statusDiv.textContent = "Data berhasil terkirim!";
        statusDiv.style.color = "green";
        form.reset();
        setTimeout(() => {
          statusDiv.textContent = "";
        }, 5000);
      } else {
        throw new Error(
          data.error || "Terjadi kesalahan yang tidak diketahui."
        );
      }
    })
    .catch((error) => {
      console.error("Error!", error.message);
      statusDiv.textContent = "Gagal mengirim data! Cek konsol untuk detail.";
      statusDiv.style.color = "red";
    });
});
