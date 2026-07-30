const form = document.getElementById("messageForm");

form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.filename) {
        const shareLinkInput = document.getElementById("shareLink");
        if (shareLinkInput) {
            shareLinkInput.value = `${window.location.origin}/${result.filename}`;
        }
    }
});
