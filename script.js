
let productData = [];

function generateProductForms() {
    const numProducts = parseInt(document.getElementById('num-products').value, 10);
    if (isNaN(numProducts) || numProducts <= 0) {
        alert('Please enter a valid number of products.');
        return;
    }

    document.getElementById('product-forms-section').innerHTML = '';

    for (let i = 1; i <= numProducts; i++) {
        const productForm = document.createElement('div');
        productForm.classList.add('input-section');
        productForm.innerHTML = `
            <h3>Product ${i}</h3>
            <label for="product-name-${i}">Product Name:</label>
            <select id="product-name-${i}">
                <option value="foldyphones">Foldyphones</option>
                
                <option value="tinyphones">Tinyphones</option>
                   
            </select>
         
            <label for="quantity-${i}">Quantity:</label>
            <input type="number" id="quantity-${i}" min="1" placeholder="Enter quantity">
            <br><br>
        `;
        document.getElementById('product-forms-section').appendChild(productForm);
    }

    const estimatedDateForm = `
        <label for="estimated-date">Estimated Delivery Date:</label>
        <input type="date" id="estimated-date">
        <br><br>
    `;

    const calculateButton = `<button onclick="calculateProduction()">Calculate</button>`;

    document.getElementById('product-forms-section').innerHTML += estimatedDateForm + calculateButton;
    document.getElementById('num-products-section').style.display = 'none';
}

function calculateProduction() {
    productData = [];
    const numProducts = parseInt(document.getElementById('num-products').value, 10);

    for (let i = 1; i <= numProducts; i++) {
        const productName = document.getElementById(`product-name-${i}`).value;
        const quantity = parseInt(document.getElementById(`quantity-${i}`).value, 10);

        if (!productName || isNaN(quantity) || quantity <= 0) {
            alert(`Please fill in valid details for Product ${i}.`);
            return;
        }

        productData.push({ productName, quantity });
    }

    const estimatedDeliveryDate = new Date(document.getElementById('estimated-date').value);
    if (!estimatedDeliveryDate || isNaN(estimatedDeliveryDate.getTime())) {
        alert('Please provide a valid estimated delivery date.');
        return;
    }

    const totalFoldyphonesProduced = productData.filter(p => p.productName === 'foldyphones').reduce((acc, p) => acc + p.quantity, 0);
    const totalTinyphonesProduced = productData.filter(p => p.productName === 'tinyphones').reduce((acc, p) => acc + p.quantity, 0);
    const totalManufacturingTime = totalFoldyphonesProduced * 60 + totalTinyphonesProduced * 20;

    const today = new Date();
    const calculatedDeliveryDate = new Date(today.getTime() + totalManufacturingTime * 60000);

    document.getElementById('output-section').style.display = 'block';
    document.getElementById('total-time').innerText = totalManufacturingTime;
    document.getElementById('foldyphones-produced').innerText = totalFoldyphonesProduced;
    document.getElementById('tinyphones-produced').innerText = totalTinyphonesProduced;

    
    function machineAllocation() {
            let machineData = {};

            for (let i = 1; i <= 7; i++) {
                let machineElement = document.getElementById(`Machine_${i}`);
                if (machineElement) {
                    machineData[`Machine_${i}`] = machineElement.innerText; // Extracts only text content
                }
            }

            console.log(machineData); // Output the extracted data to the console
            alert(JSON.stringify(machineData, null, 2)); // Display as an alert (optional)
        }

        // Trigger function when the div is clicked
        document.getElementById("machine-allocation").addEventListener("click", machineAllocation);

    document.getElementById('foldyphones-time').innerText = totalFoldyphonesProduced * 60;
    document.getElementById('tinyphones-time').innerText = totalTinyphonesProduced * 20;
    document.getElementById('delivery-date-output').innerText = calculatedDeliveryDate.toDateString();

    if (calculatedDeliveryDate > estimatedDeliveryDate) {
        alert('Sorry for the delay. The calculated delivery date exceeds the estimated delivery date.');
    }
}
