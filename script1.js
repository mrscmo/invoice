// Function to display the invoice preview
function displayPreview() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const encodedData = urlParams.get('data');

    // Decode and parse the data
    const jsonData = JSON.parse(decodeURIComponent(encodedData));

    // Build HTML for preview
    let previewHTML = `
        <h2>Customer Details</h2>
        <p><strong>Customer Name:</strong> ${jsonData.customerName}</p>
        <p><strong>Invoice Date:</strong> ${jsonData.invoiceDate}</p>
        <p><strong>Invoice Number:</strong> ${jsonData.invoiceNumber}</p>
        <h2>Products</h2>
    `;

    // Iterate over products and add them to the preview
    for (let i = 0; i < jsonData['description[]'].length; i++) {
        const description = jsonData['description[]'][i];
        const quantity = jsonData['quantity[]'][i];
        const unitPrice = jsonData['unitPrice[]'][i];
        const total = quantity * unitPrice;

        previewHTML += `
            <div>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Unit Price:</strong> $${unitPrice}</p>
                <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            </div>
        `;
    }

    // Add total to preview
    previewHTML += `<h2>Total</h2>`;
    previewHTML += `<p><strong>Total:</strong> $${jsonData.total}</p>`;

    // Display preview
    document.getElementById('preview').innerHTML = previewHTML;
}

// Call displayPreview when the page loads
window.onload = displayPreview;
