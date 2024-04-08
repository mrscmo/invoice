function submitInvoice() {
    // Fetch form data
    const formData = new FormData(document.getElementById('invoiceForm'));
    
    // Convert to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    // Send data to server (you need to implement this part)
    fetch('/submit-invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => {
        if (response.ok) {
            alert('Invoice submitted successfully!');
        } else {
            alert('Failed to submit invoice');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Function to add an item to the invoice
function addItem() {
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const total = quantity * unitPrice;

    // Create item HTML
    const itemHTML = `
        <div>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Unit Price:</strong> $${unitPrice}</p>
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        </div>
    `;

    // Append item to itemsList
    document.getElementById('itemsList').insertAdjacentHTML('beforeend', itemHTML);

    // Update total
    updateTotal();
}

// Function to update total
function updateTotal() {
    let total = 0;
    const itemList = document.querySelectorAll('#itemsList div');
    itemList.forEach(item => {
        const totalText = item.querySelector('p:last-child').textContent;
        total += parseFloat(totalText.slice(8));
    });
    document.getElementById('total').value = total.toFixed(2);
}

// Function to add a product to the invoice
function addProduct() {
    const productsDiv = document.getElementById('products');
    
    // Create product fields
    const productFields = `
        <div class="product">
            <label for="description">Description:</label>
            <textarea class="description" name="description[]" required></textarea>
            <label for="quantity">Quantity:</label>
            <input type="number" class="quantity" name="quantity[]" min="1" required>
            <label for="unitPrice">Unit Price:</label>
            <input type="number" class="unitPrice" name="unitPrice[]" min="0" step="0.01" required>
        </div>
    `;
    
    // Append product fields to productsDiv
    productsDiv.insertAdjacentHTML('beforeend', productFields);
}

// Function to calculate total
function calculateTotal() {
    let total = 0;
    const productDivs = document.querySelectorAll('.product');
    
    productDivs.forEach(productDiv => {
        const quantity = parseInt(productDiv.querySelector('.quantity').value);
        const unitPrice = parseFloat(productDiv.querySelector('.unitPrice').value);
        total += quantity * unitPrice;
    });

    document.getElementById('total').value = total.toFixed(2);
}

// Function to update preview
function updatePreview() {
    const previewDiv = document.getElementById('preview');
    previewDiv.innerHTML = ''; // Clear previous content

    // Customer details
    const customerName = document.getElementById('customerName').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
    const invoiceNumber = document.getElementById('invoiceNumber').value;

    // Create preview HTML
    let previewHTML = `
        <h2>Invoice Preview</h2>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Invoice Date:</strong> ${invoiceDate}</p>
        <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
        <h3>Products:</h3>
    `;

    // Product details
    const productDivs = document.querySelectorAll('.product');
    productDivs.forEach(productDiv => {
        const description = productDiv.querySelector('.description').value;
        const quantity = productDiv.querySelector('.quantity').value;
        const unitPrice = productDiv.querySelector('.unitPrice').value;
        const total = quantity * unitPrice;

        previewHTML += `
            <div>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Quantity:</strong> ${quantity}</p>
                <p><strong>Unit Price:</strong> $${unitPrice}</p>
                <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            </div>
        `;
    });

    // Update preview section
    previewDiv.innerHTML = previewHTML;

    // Update total
    calculateTotal();
}

// Function to add a product to the invoice
function addProduct() {
    const productsDiv = document.getElementById('products');
    
    // Create product fields
    const productFields = `
        <div class="product">
            <label for="description">Description:</label>
            <textarea class="description" name="description[]" required></textarea>
            <label for="quantity">Quantity:</label>
            <input type="number" class="quantity" name="quantity[]" min="1" required>
            <label for="unitPrice">Unit Price:</label>
            <input type="number" class="unitPrice" name="unitPrice[]" min="0" step="0.01" required>
        </div>
    `;
    
    // Append product fields to productsDiv
    productsDiv.insertAdjacentHTML('beforeend', productFields);

    // Update preview
    updatePreview();
}

// Function to calculate total
function calculateTotal() {
    let total = 0;
    const productDivs = document.querySelectorAll('.product');
    
    productDivs.forEach(productDiv => {
        const quantity = parseInt(productDiv.querySelector('.quantity').value);
        const unitPrice = parseFloat(productDiv.querySelector('.unitPrice').value);
        total += quantity * unitPrice;
    });

    document.getElementById('total').value = total.toFixed(2);
}

// Function to submit invoice
function submitInvoice() {
    // Fetch form data
    const formData = new FormData(document.getElementById('invoiceForm'));

    // Convert to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        if (key === 'description[]' || key === 'quantity[]' || key === 'unitPrice[]') {
            if (!jsonData[key]) {
                jsonData[key] = [];
            }
            jsonData[key].push(value);
        } else {
            jsonData[key] = value;
        }
    });

    // Send data to server (you need to implement this part)
    fetch('/submit-invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => {
        if (response.ok) {
            alert('Invoice submitted successfully!');
        } else {
            alert('Failed to submit invoice');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Event listener to update preview when input fields change
document.getElementById('invoiceForm').addEventListener('input', updatePreview);
// Function to open preview page in a new tab
function openPreviewPage() {
    // Fetch form data
    const formData = new FormData(document.getElementById('invoiceForm'));

    // Convert to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        if (key === 'description[]' || key === 'quantity[]' || key === 'unitPrice[]') {
            if (!jsonData[key]) {
                jsonData[key] = [];
            }
            jsonData[key].push(value);
        } else {
            jsonData[key] = value;
        }
    });

    // Encode JSON data as URI component
    const encodedData = encodeURIComponent(JSON.stringify(jsonData));

    // Open preview page in a new tab
    window.open(`preview.html?data=${encodedData}`);
}
