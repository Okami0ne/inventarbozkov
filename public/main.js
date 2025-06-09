
async function loadItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = '';
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.total_count}</td>
            <td>${item.current_count}</td>
            <td class="d-none admin-actions">
              <button class="btn btn-sm btn-warning">✏️</button>
              <button class="btn btn-sm btn-danger">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function loadProjects() {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    const select = document.getElementById('projectSelect');
    select.innerHTML = '';
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.project_name;
        option.textContent = project.project_name;
        select.appendChild(option);
    });
    if (projects.length > 0) {
        loadExpeditions(projects[0].project_name);
    }
}

async function loadExpeditions(projectName) {
    const response = await fetch(`/api/expeditions/${encodeURIComponent(projectName)}`);
    const expeditions = await response.json();
    const tbody = document.getElementById('expeditionsTableBody');
    tbody.innerHTML = '';
    expeditions.forEach(exp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exp.name}</td>
            <td>${exp.count}</td>
            <td class="d-none admin-exp-actions">
              <button class="btn btn-sm btn-warning">✏️</button>
              <button class="btn btn-sm btn-danger">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

window.onload = () => {
    loadItems();
    document.getElementById('projectSelect').addEventListener('change', (e) => {
        loadExpeditions(e.target.value);
    });
    document.getElementById('showStockBtn').addEventListener('click', () => {
        document.getElementById('stockSection').classList.remove('d-none');
        document.getElementById('projectsSection').classList.add('d-none');
    });
    document.getElementById('showProjectsBtn').addEventListener('click', () => {
        document.getElementById('projectsSection').classList.remove('d-none');
        document.getElementById('stockSection').classList.add('d-none');
        loadProjects();
    });
};
