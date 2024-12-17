document.getElementById('ticket-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Ambil tipe tiket yang dipilih dari dropdown
    const ticketType = document.getElementById('ticket-type').value;
    
    // Panggil fungsi untuk "membeli" tiket
    purchaseTicket(ticketType);
});

function purchaseTicket(type) {
    let loadingElement = document.getElementById(`loading-${type}`);
    let transactionElement = document.getElementById(`transaction-${type}`);
    
    // Tampilkan spinner loading
    loadingElement.style.display = 'block';
    
    setTimeout(() => {
        // Simulasikan pembuatan hash transaksi
        let transactionHash = '0x' + Math.floor(Math.random() * 1e16).toString(16);
        
        // Sembunyikan spinner loading
        loadingElement.style.display = 'none';
        
        // Tampilkan pesan sukses transaksi dengan hash
        transactionElement.innerHTML = `Transaction Successful! Ticket ID: <span class="success">${transactionHash}</span>`;
        
        // Pindah ke halaman konfirmasi setelah transaksi sukses
        document.querySelector('.tickets').style.display = 'none';
        document.querySelector('.tickets-confirmation').style.display = 'block';
        
        // Menampilkan jenis tiket yang dibeli di konfirmasi
        document.getElementById('ticket-type-confirmation').innerText = type.charAt(0).toUpperCase() + type.slice(1);
    }, 2000); // Simulasikan delay transaksi
}
