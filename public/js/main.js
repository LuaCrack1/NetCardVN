// ===== USER SITE MAIN JS =====

// Auto format tiền
function formatMoney(amount) {
    return new Intl.NumberFormat("vi-VN").format(amount);
}

// Gửi mua thẻ
async function buyCard() {
    const telco = document.getElementById("telco").value;
    const amount = document.getElementById("amount").value;

    const res = await fetch("/api/card/buy", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ telco, amount })
    });

    const data = await res.json();
    alert(data.message);
}

// Lịch sử mua
async function loadHistory() {
    const res = await fetch("/api/card/history");
    const data = await res.json();

    const list = document.getElementById("historyList");
    list.innerHTML = "";

    data.forEach(item => {
        list.innerHTML += `
            <div class="card-item">
                <div>
                    <b>${item.telco}</b><br>
                    Mệnh giá: ${formatMoney(item.amount)}đ
                </div>
                <div>
                    <b>${item.status}</b>
                </div>
            </div>
        `;
    });
}
