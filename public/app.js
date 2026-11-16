const apiStatus = document.getElementById("apiStatus");
const refreshButton = document.getElementById("refreshButton");
const toast = document.getElementById("toast");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

async function refreshDashboard() {
  try {
    const response = await fetch("/api/health");
    if (!response.ok) throw new Error("Health check failed");
    const health = await response.json();
    apiStatus.innerHTML = "<i></i> Connected";
    apiStatus.title = `Uptime: ${health.uptimeSeconds} seconds`;
  } catch (error) {
    apiStatus.textContent = "Unavailable";
    apiStatus.style.color = "#d17a65";
  }

  try {
    const response = await fetch("/api/metrics");
    const metrics = await response.json();
    document.getElementById("instancesValue").innerHTML =
      `${String(metrics.activeInstances).padStart(2, "0")} <small>/ 10</small>`;
    document.getElementById("deploymentsValue").textContent = metrics.deploymentsToday;
  } catch (error) {
    console.error("Could not load dashboard metrics", error);
  }
}

refreshButton.addEventListener("click", async () => {
  refreshButton.disabled = true;
  refreshButton.querySelector("span").textContent = "…";
  await refreshDashboard();
  refreshButton.disabled = false;
  refreshButton.querySelector("span").textContent = "↻";
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
});

menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));

refreshDashboard();
