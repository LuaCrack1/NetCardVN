// ===== ADMIN JS =====

// Load đơn hàng
async function loadOrders() {
    const res = await fetch("/admin/orders/data");
    const data = await res.json();

    const table = document.getElementById("ordersTable");
    table.innerHTML = "";

    data.forEach(o => {
        table.innerHTML += `
            <tr>
                <td>${o.id}</td>
                <td>${o.user}</td>
                <td>${o.telco}</td>
                <td>${o.amount}</td>
                <td>${o.status}</td>
                <td>${o.time}</td>
            </tr>
        `;
    });
}

// Load nhật ký NCC
async function loadLogs() {
    const res = await fetch("/admin/logs/data");
    const data = await res.json();

    const table = document.getElementById("logsTable");
    table.innerHTML = "";

    data.forEach(log => {
        table.innerHTML += `
            <tr>
                <td>${log.id}</td>
                <td>${log.ncc}</td>
                <td>${log.status}</td>
                <td>${log.response}</td>
                <td>${log.time}</td>
            </tr>
        `;
    });
}
