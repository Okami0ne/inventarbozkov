
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
            <td>${item.expedited}</td>
            <td class="d-none admin-actions">
              <button class="btn btn-sm btn-warning">✏️</button>
              <button class="btn btn-sm btn-danger">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

window.onload = loadItems;
