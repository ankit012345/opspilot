const statusClass = (value) => value.toLowerCase().replaceAll(" ", "-");
const badge = (value) => `<span class="status ${statusClass(value)}">${value}</span>`;

async function loadDashboard() {
  const [servicesResponse, deploymentsResponse] = await Promise.all([
    fetch("/api/services"),
    fetch("/api/deployments")
  ]);
  if (!servicesResponse.ok || !deploymentsResponse.ok) {
    throw new Error("The dashboard API returned an error.");
  }

  const services = await servicesResponse.json();
  const deployments = await deploymentsResponse.json();

  document.querySelector("#service-count").textContent = services.length;
  document.querySelector("#healthy-count").textContent = services.filter(s => s.status === "Healthy").length;
  document.querySelector("#success-count").textContent = deployments.filter(d => d.status === "Success").length;
  document.querySelector("#failed-count").textContent = deployments.filter(d => d.status === "Failed").length;

  document.querySelector("#services-body").innerHTML = services.map(s => `
    <tr>
      <td>${s.name}</td><td class="env">${s.environment}</td><td>${badge(s.status)}</td>
      <td>${s.version}</td><td>${s.uptime}</td><td>${s.region}</td>
    </tr>`).join("");

  document.querySelector("#deployments-body").innerHTML = deployments.map(d => `
    <tr>
      <td>${d.id}</td><td>${d.service}</td><td class="env">${d.environment}</td>
      <td>${badge(d.status)}</td><td>${d.time}</td><td>${d.author}</td>
    </tr>`).join("");

  document.querySelector("#last-updated").textContent = `Demo API refreshed at ${new Date().toLocaleTimeString()}`;
}

document.querySelector("#refresh-btn").addEventListener("click", () => {
  loadDashboard().catch(showError);
});

function showError(error) {
  console.error(error);
  document.querySelector("#last-updated").textContent = "Could not load data. Check the server logs.";
}

loadDashboard().catch(showError);
