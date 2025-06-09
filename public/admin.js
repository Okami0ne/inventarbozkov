
const loginBtn = document.getElementById('loginBtn');
const addItemBtn = document.getElementById('addItemBtn');
const adminActionsHeader = document.getElementById('adminActionsHeader');
const adminExpActionsHeader = document.getElementById('adminExpActionsHeader');
const addExpeditionBtn = document.getElementById('addExpeditionBtn');

loginBtn.addEventListener('click', () => {
    const password = prompt('Zadejte admin heslo:');
    if (password === 'admin123') {
        alert('Přihlášení úspěšné!');
        addItemBtn.classList.remove('d-none');
        addExpeditionBtn.classList.remove('d-none');
        adminActionsHeader.classList.remove('d-none');
        adminExpActionsHeader.classList.remove('d-none');
        document.querySelectorAll('.admin-actions').forEach(el => el.classList.remove('d-none'));
        document.querySelectorAll('.admin-exp-actions').forEach(el => el.classList.remove('d-none'));
    } else {
        alert('Neplatné heslo.');
    }
});

async function addItem() {
    const name = document.getElementById('itemName').value;
    const count = parseInt(document.getElementById('itemCount').value);

    await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, total_count: count, current_count: count })
    });
    loadItems();
}

async function deleteItem(id) {
    if (!confirm('Opravdu chcete smazat položku?')) return;
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    loadItems();
}

function editItem(id, name, total, current) {
    const newName = prompt('Nový název položky:', name);
    const newTotal = parseInt(prompt('Nový celkový počet ks:', total));
    const newCurrent = parseInt(prompt('Nový aktuální počet ks:', current));
    fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, total_count: newTotal, current_count: newCurrent })
    }).then(() => loadItems());
}

async function addExpedition() {
    const projectName = document.getElementById('projectSelect').value;
    const expCount = parseInt(document.getElementById('expCount').value);
    const itemObj = JSON.parse(document.getElementById('expItemSelect').value);

    if (expCount > itemObj.current_count) {
        alert('Nedostatečný počet ks na skladě pro expedici!');
        return;
    }

    await fetch('/api/expeditions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: itemObj.id, project_name: projectName, count: expCount })
    });
    loadItems();
    loadExpeditions(projectName);
}

async function deleteExpedition(id) {
    if (!confirm('Opravdu chcete smazat expedici?')) return;
    const projectName = document.getElementById('projectSelect').value;
    await fetch(`/api/expeditions/${id}`, { method: 'DELETE' });
    loadItems();
    loadExpeditions(projectName);
}

function editExpedition(id, name, count) {
    const newCount = parseInt(prompt(`Nový počet ks pro expedici položky "${name}":`, count));
    const projectName = document.getElementById('projectSelect').value;

    fetch(`/api/expeditions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: newCount })
    }).then(() => {
        loadItems();
        loadExpeditions(projectName);
    });
}
