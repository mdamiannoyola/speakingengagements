document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");
    const continueBtn = document.querySelector(".next-btn");
    const progressBar = document.getElementById("progress-bar");
    const progressMessage = document.getElementById("progress-message");

    console.log("🚀 Script Loaded - Tracking Progress!");

    // Ensure the button starts disabled
    if (continueBtn) {
        continueBtn.setAttribute("disabled", "true");
        continueBtn.classList.add("disabled");
    }

    // Safeguard: Ensure progress bar exists
    if (!progressBar) {
        console.error("⚠️ Progress bar not found!");
        return;
    }

    let openedAccordions = new Set();
    let firstClick = false;

    accordions.forEach((accordion, index) => {
        const panel = accordion.nextElementSibling;

        // ✅ Ensure all panels start collapsed
        panel.style.maxHeight = null;

        accordion.addEventListener("click", function () {
            this.classList.toggle("active");

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";

                // ✅ Mark section as opened (only once)
                if (!openedAccordions.has(index)) {
                    openedAccordions.add(index);
                    console.log(`✅ Section ${index + 1} opened`);
                }
            }

            // ✅ Remove pulsing effect on first click
            if (!firstClick) {
                progressMessage?.classList.add("clicked");
                firstClick = true;
                console.log("⏳ First click detected, stopping pulsing effect.");
            }

            updateProgressBar(); // Call the function to update the progress bar
        });
    });

    function updateProgressBar() {
        let percentage = (openedAccordions.size / accordions.length) * 100;
        progressBar.style.width = percentage + "%";

        console.log(`📊 Progress updated: ${percentage}%`);

        if (openedAccordions.size === accordions.length) {
            progressBar.style.background = "#106a94"; // Turns darker blue when complete
            
            if (progressMessage) {
                progressMessage.style.display = "none"; // Hide progress message
            }

            // ✅ Unlock the "Continue" button
            continueBtn.removeAttribute("disabled");
            continueBtn.classList.remove("disabled");
if (continueBtn.getAttribute("href") === "step3.html") {
    continueBtn.innerHTML = "➡️ Continue to Step 3";
} else if (continueBtn.getAttribute("href") === "step2.html") {
    continueBtn.innerHTML = "➡️ Continue to Step 2";
}
            console.log("🎉 All sections completed! Button unlocked.");
        }
    }
});
