document.addEventListener('DOMContentLoaded', () => {
  const authenticatedUser = localStorage.getItem('authenticatedUser');
  const currentPage = window.location.pathname.split('/').pop().split('.').shift();

  if (authenticatedUser !== currentPage) {
      // Redirect to login page if user is not authenticated or accessing a different page
      window.location.href = 'login.html';
  }

  // Add any additional page-specific logic here
});








let staffDatabase = [
  {
    username: "staff",
    staffId: "S001",
    mobileNumber: "0752525225",
    staffName: "Ashan Sajitha",
    staffAddress: "4/1, Galle Road, Galle",
    staffNIC: "98608866V",
  },
];

let customerDatabase = [
  {
    customerId: "C001",
    customerName: "Anusara Dias",
    customerEmail: "anu@gmail.com",
    customerPhone: "0721311314"

  },
  {
    customerId: "C002",
    customerName: "Kochana Herath",
    customerEmail: "kochana@gmail.com",
    customerPhone: "0721366550",
  },
  {
    customerId: "C003",
    customerName: "Kasuni Perera",
    customerEmail: "kasuni@gmail.com",
    customerPhone: "0721300314"

  },
  {
    customerId: "C004",
    customerName: "Nimesha Samarajiwa",
    customerEmail: "nimesha@gmail.com",
    customerPhone: "0721366550",
  },
];

document.addEventListener('DOMContentLoaded', function() {
  showSection('home'); 
});


function logout() {
  
  localStorage.removeItem('authenticatedUser');
  
 
  window.location.href = 'login.html'; 
}


function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    const staffButtons = document.querySelector('.staff-buttons');
    const customerButtons = document.querySelector('.customer-buttons');

   
    if (sectionId === 'staff') {
        staffButtons.style.display = 'block';
        customerButtons.style.display = 'none';
    } else if (sectionId === 'customers') {
        staffButtons.style.display = 'none';
        customerButtons.style.display = 'block';
    } else {
        staffButtons.style.display = 'none';
        customerButtons.style.display = 'none';
    }
}

function showModalContent(modalId) {
    const staffModalContent = document.getElementById('staffModalContent');
    const customerModalContent = document.getElementById('customerModalContent');
    const templates = document.querySelectorAll('.modal-template');

    
    
    templates.forEach(template => {
        if (template.id === modalId) {
            if (modalId.includes('Staff')) {
                staffModalContent.innerHTML = template.innerHTML;

                
                if (modalId === 'addStaff') {
                    document.getElementById('staffId').value = generateStaffId();
                }

                
                if (modalId === 'viewStaff') {
                    viewAllStaff();
                }
            } else if (modalId.includes('Customer')) {
                customerModalContent.innerHTML = template.innerHTML;

                
                if (modalId === 'addCustomer') {
                    document.getElementById('customerId').value = generateCustomerId();
                }

                
                if (modalId === 'viewCustomers') {
                    viewAllCustomers();
                }
            }
        }
    });

   
    document.querySelector('.staff-buttons').style.display = 'none';
    document.querySelector('.customer-buttons').style.display = 'none';
}




function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

  








function showStaffButtons() {
    const staffModalContent = document.getElementById('staffModalContent');
    if (staffModalContent) {
        staffModalContent.innerHTML = '';
    }
    document.querySelector('.staff-buttons').style.display = 'block';
}

function showCustomerButtons() {
    const customerModalContent = document.getElementById('customerModalContent');
    if (customerModalContent) {
        customerModalContent.innerHTML = '';
    }
    document.querySelector('.customer-buttons').style.display = 'block';
}

function generateStaffId() {
    let lastId = "S000";
    if (staffDatabase.length > 0) {
        lastId = staffDatabase[staffDatabase.length - 1].staffId;
    }
    const newIdNumber = parseInt(lastId.substring(1)) + 1;
    const newId = 'S' + newIdNumber.toString().padStart(3, '0');
    return newId;
}

function addStaffMember() {
    const staffId = document.getElementById('staffId').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const staffName = document.getElementById('staffName').value;
    const staffAddress = document.getElementById('staffAddress').value;
    const staffNIC = document.getElementById('staffNIC').value;

    staffDatabase.push({ staffId, mobileNumber, staffName, staffAddress, staffNIC });

    console.log('Added staff member:', { staffId, mobileNumber, staffName, staffAddress, staffNIC });

    document.getElementById('addStaffForm').reset();
    document.getElementById('staffId').value = generateStaffId();  
}

function fetchAndShowStaff(action) {
    const staffId = document.getElementById(action + 'StaffId').value;
    const staff = staffDatabase.find(s => s.staffId === staffId);

    if (staff) {
        const detailsDiv = document.getElementById(action + 'StaffDetails');
        detailsDiv.innerHTML = `
            <label for="${action}MobileNumber">Enter Mobile Number:</label>
            <input type="text" id="${action}MobileNumber" name="${action}MobileNumber" value="${staff.mobileNumber}" required><br>
            <label for="${action}StaffName">Staff Member Name:</label>
            <input type="text" id="${action}StaffName" name="${action}StaffName" value="${staff.staffName}" required><br>
            <label for="${action}StaffAddress">Staff Member Address:</label>
            <input type="text" id="${action}StaffAddress" name="${action}StaffAddress" value="${staff.staffAddress}" required><br>
            <label for="${action}StaffNIC">Staff Member NIC:</label>
            <input type="text" id="${action}StaffNIC" name="${action}StaffNIC" value="${staff.staffNIC}" required><br>
        `;
    } else {
        console.log('Staff member not found');
    }
}

function updateStaffMember() {
    const staffId = document.getElementById('updateStaffId').value;
    const mobileNumber = document.getElementById('updateMobileNumber').value;
    const staffName = document.getElementById('updateStaffName').value;
    const staffAddress = document.getElementById('updateStaffAddress').value;
    const staffNIC = document.getElementById('updateStaffNIC').value;

    const staffIndex = staffDatabase.findIndex(s => s.staffId === staffId);
    if (staffIndex > -1) {
        staffDatabase[staffIndex] = { staffId, mobileNumber, staffName, staffAddress, staffNIC };
        console.log('Updated staff member:', { staffId, mobileNumber, staffName, staffAddress, staffNIC });
    } else {
        console.log('Staff member not found');
    }

    document.getElementById('updateStaffForm').reset();
    document.getElementById('updateStaffDetails').innerHTML = '';
}

function deleteStaffMember() {
    const staffId = document.getElementById('deleteStaffId').value;

    staffDatabase = staffDatabase.filter(s => s.staffId !== staffId);
    console.log('Deleted staff member with ID:', staffId);

    document.getElementById('deleteStaffForm').reset();
}

function viewAllStaff() {
    const staffList = document.getElementById('staffList').querySelector('tbody');
    staffList.innerHTML = staffDatabase.map(staff => `
        <tr>
            <td>${staff.staffId}</td>
            <td>${staff.staffName}</td>
            <td>${staff.mobileNumber}</td>
            <td>${staff.staffAddress}</td>
            <td>${staff.staffNIC}</td>
        </tr>
    `).join('');
}



function generateCustomerId() {
    let lastId = "C000";
    if (customerDatabase.length > 0) {
        lastId = customerDatabase[customerDatabase.length - 1].customerId;
    }
    const newIdNumber = parseInt(lastId.substring(1)) + 1;
    const newId = 'C' + newIdNumber.toString().padStart(3, '0');
    return newId;
}

function addCustomer() {
    const customerId = document.getElementById('customerId').value;
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;

    customerDatabase.push({ customerId, customerName, customerEmail, customerPhone });

    console.log('Added customer:', { customerId, customerName, customerEmail, customerPhone });

    document.getElementById('addCustomerForm').reset();
    document.getElementById('customerId').value = generateCustomerId();  
}

function fetchAndShowCustomer(action) {
    const customerId = document.getElementById(action + 'CustomerId').value;
    const customer = customerDatabase.find(c => c.customerId === customerId);

    if (customer) {
        const detailsDiv = document.getElementById(action + 'CustomerDetails');
        detailsDiv.innerHTML = `
            <label for="${action}CustomerName">Customer Name:</label>
            <input type="text" id="${action}CustomerName" name="${action}CustomerName" value="${customer.customerName}" required><br>
            <label for="${action}CustomerEmail">Customer Email:</label>
            <input type="email" id="${action}CustomerEmail" name="${action}CustomerEmail" value="${customer.customerEmail}" required><br>
            <label for="${action}CustomerPhone">Customer Phone:</label>
            <input type="text" id="${action}CustomerPhone" name="${action}CustomerPhone" value="${customer.customerPhone}" required><br>
        `;
    } else {
        console.log('Customer not found');
    }
}

function updateCustomer() {
    const customerId = document.getElementById('updateCustomerId').value;
    const customerName = document.getElementById('updateCustomerName').value;
    const customerEmail = document.getElementById('updateCustomerEmail').value;
    const customerPhone = document.getElementById('updateCustomerPhone').value;

    const customerIndex = customerDatabase.findIndex(c => c.customerId === customerId);
    if (customerIndex > -1) {
        customerDatabase[customerIndex] = { customerId, customerName, customerEmail, customerPhone };
        console.log('Updated customer:', { customerId, customerName, customerEmail, customerPhone });
    } else {
        console.log('Customer not found');
    }

    document.getElementById('updateCustomerForm').reset();
    document.getElementById('updateCustomerDetails').innerHTML = '';
}

function deleteCustomer() {
    const customerId = document.getElementById('deleteCustomerId').value;

    customerDatabase = customerDatabase.filter(c => c.customerId !== customerId);
    console.log('Deleted customer with ID:', customerId);

    document.getElementById('deleteCustomerForm').reset();
}

console.log(customerDatabase);


function viewAllCustomers() {
    const customerList = document.getElementById('customerList').querySelector('tbody');
    console.log('Populating customer list'); 
    customerList.innerHTML = customerDatabase.map(customer => `
        <tr>
            <td>${customer.customerId}</td>
            <td>${customer.customerName}</td>
            <td>${customer.customerEmail}</td>
            <td>${customer.customerPhone}</td>
        </tr>
    `).join('');
}


document.addEventListener('DOMContentLoaded', () => {
   
    document.getElementById('staffId').value = generateStaffId();
    
    document.getElementById('customerId').value = generateCustomerId();
});


//------------------------item------------------------------

const items = [
    // Burgers
    {
      itemCode: "B1001",
      category: "Burgers",
      itemName: "Classic Burger (Large)",
      price: 750.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-1.png"
    },
    {
      itemCode: "B1002",
      category: "Burgers",
      itemName: "Classic Burger (Regular)",
      price: 1500.0,
      discount: 15,
      image: "./asset/img/items/burgers/burger-2.png"
    },
    {
      itemCode: "B1003",
      category: "Burgers",
      itemName: "Turkey Burger",
      price: 1600.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-3.png"
    },
    {
      itemCode: "B1004",
      category: "Burgers",
      itemName: "Chicken Burger (Large)",
      price: 1400.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-4.png"
    },
    {
      itemCode: "B1005",
      category: "Burgers",
      itemName: "Chicken Burger (Regular)",
      price: 800.0,
      discount: 20,
      image: "./asset/img/items/burgers/burger-5.png"
    },
    {
      itemCode: "B1006",
      category: "Burgers",
      itemName: "Cheese Burger (Large)",
      price: 1000.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-6.png"
    },
    {
      itemCode: "B1007",
      category: "Burgers",
      itemName: "Cheese Burger (Regular)",
      price: 600.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-7.png"
    },
    {
      itemCode: "B1008",
      category: "Burgers",
      itemName: "Bacon Burger",
      price: 650.0,
      discount: 15,
      image: "./asset/img/items/burgers/burger-8.png"
    },
    {
      itemCode: "B1009",
      category: "Burgers",
      itemName: "Shawarma Burger",
      price: 800.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-9.png"
    },
    {
      itemCode: "B1010",
      category: "Burgers",
      itemName: "Olive Burger",
      price: 1800.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-10.png"
    },
    {
      itemCode: "B1012",
      category: "Burgers",
      itemName: "Double-Cheese Burger",
      price: 1250.0,
      discount: 20,
      image: "./asset/img/items/burgers/burger-11.png"
    },
    {
      itemCode: "B1013",
      category: "Burgers",
      itemName: "Crispy Chicken Burger (Regular)",
      price: 1200.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-8.png"
    },
    {
      itemCode: "B1014",
      category: "Burgers",
      itemName: "Crispy Chicken Burger (Large)",
      price: 1600.0,
      discount: 10,
      image: "./asset/img/items/burgers/burger-6.png"
    },
    {
      itemCode: "B1015",
      category: "Burgers",
      itemName: "Paneer Burger",
      price: 900.0,
      discount: 0,
      image: "./asset/img/items/burgers/burger-5.png"
    },
  
    // Submarines
    {
      itemCode: "B1016",
      category: "Submarines",
      itemName: "Crispy Chicken Submarine (Large)",
      price: 2000.0,
      discount: 0,
      image: "./asset/img/items/submarines/submarine-1.jpg"
    },
    {
      itemCode: "B1017",
      category: "Submarines",
      itemName: "Crispy Chicken Submarine (Regular)",
      price: 1500.0,
      discount: 0,
      image: "./asset/img/items/submarines/submarine-2.jpg"
    },
    {
      itemCode: "B1018",
      category: "Submarines",
      itemName: "Chicken Submarine (Large)",
      price: 1800.0,
      discount: 3,
      image: "./asset/img/items/submarines/submarine-3.jpg"
    },
    {
      itemCode: "B1019",
      category: "Submarines",
      itemName: "Chicken Submarine (Regular)",
      price: 1400.0,
      discount: 0,
      image: "./asset/img/items/submarines/submarine-4.jpg"
    },
    {
      itemCode: "B1020",
      category: "Submarines",
      itemName: "Grinder Submarine",
      price: 2300.0,
      discount: 0,
      image: "./asset/img/items/submarines/submarine-5.jpg"
    },
    {
      itemCode: "B1021",
      category: "Submarines",
      itemName: "Cheese Submarine",
      price: 2200.0,
      discount: 0,
      image: "./asset/img/items/submarines/submarine-6.jpg"
    },
    {
      itemCode: "B1022",
      category: "Submarines",
      itemName: "Double Cheese n Chicken Submarine",
      price: 1900.0,
      discount: 16,
      image: "./asset/img/items/submarines/submarine-7.jpg"
    },
    {
      itemCode: "B1023",
      category: "Submarines",
      itemName: "Special Horgie Submarine",
      price: 2800.0,
      discount: 0,
      image: "./asset/img/items/submarines/submarine-8.jpg"
    },
    {
      itemCode: "B1024",
      category: "Submarines",
      itemName: "MOS Special Submarine",
      price: 3000.0,
      discount: 0,
      image: "./asset/img/items/submarines/submarine-9.jpg"
    },
  
    // Fries
    {
      itemCode: "B1025",
      category: "Fries",
      itemName: "Steak Fries (Large)",
      price: 1200.0,
      discount: 0,
      image: "./asset/img/items/fries/fries-1.jpg"
    },
    {
      itemCode: "B1026",
      category: "Fries",
      itemName: "Steak Fries (Medium)",
      price: 600.0,
      discount: 0,
      image: "./asset/img/items/fries/fries-1.jpg"
    },
    {
      itemCode: "B1027",
      category: "Fries",
      itemName: "French Fries (Large)",
      price: 800.0,
      discount: 0,
      image: "./asset/img/items/fries/fries-2.jpg"
    },
    {
      itemCode: "B1028",
      category: "Fries",
      itemName: "French Fries (Medium)",
      price: 650.0,
      discount: 0,
      image: "./asset/img/items/fries/fries-2.jpg"
    },
    {
      itemCode: "B1029",
      category: "Fries",
      itemName: "French Fries (Small)",
      price: 450.0,
      discount: 0,
      image: "./asset/img/items/fries/fries-3.jpg"
    },
    {
      itemCode: "B1030",
      category: "Fries",
      itemName: "Sweet Potato Fries (Large)",
      price: 600.0,
      discount: 0,
      image: "./asset/img/items/fries/fries-3.jpg"
    },
  
    // Pasta
    {
      itemCode: "B1031",
      category: "Pasta",
      itemName: "Chicken n Cheese Pasta",
      price: 1600.0,
      discount: 15,
      image: "./asset/img/items/pasta/pasta-1.jpg"
    },
    {
      itemCode: "B1032",
      category: "Pasta",
      itemName: "Chicken Penne Pasta",
      price: 1700.0,
      discount: 0,
      image: "./asset/img/items/pasta/pasta-2.jpg"
    },
    {
      itemCode: "B1033",
      category: "Pasta",
      itemName: "Ground Turkey Pasta Bake",
      price: 2900.0,
      discount: 10,
      image: "./asset/img/items/pasta/pasta-3.jpg"
    },
    {
      itemCode: "B1034",
      category: "Pasta",
      itemName: "Creamy Shrimp Pasta",
      price: 2000.0,
      discount: 0,
      image: "./asset/img/items/pasta/pasta-4.jpg"
    },
    {
      itemCode: "B1035",
      category: "Pasta",
      itemName: "Lemon Butter Pasta",
      price: 1950.0,
      discount: 0,
      image: "./asset/img/items/pasta/pasta-5.jpg"
    },
    {
      itemCode: "B1036",
      category: "Pasta",
      itemName: "Tagliatelle Pasta",
      price: 2400.0,
      discount: 1,
      image: "./asset/img/items/pasta/pasta-6.jpg"
    },
    {
      itemCode: "B1037",
      category: "Pasta",
      itemName: "Baked Ravioli",
      price: 2000.0,
      discount: 1,
      image: "./asset/img/items/pasta/pasta-7.jpg"
    },
  
    // Chicken
    {
      itemCode: "B1038",
      category: "Chicken",
      itemName: "Fried Chicken (Small)",
      price: 1200.0,
      discount: 0,
      image: "./asset/img/items/chicken/chicken-1.jpg"
    },
    {
      itemCode: "B1039",
      category: "Chicken",
      itemName: "Fried Chicken (Regular)",
      price: 2300.0,
      discount: 10,
      image: "./asset/img/items/chicken/chicken-2.jpg"
    },
    {
      itemCode: "B1040",
      category: "Chicken",
      itemName: "Fried Chicken (Large)",
      price: 3100.0,
      discount: 5,
      image: "./asset/img/items/chicken/chicken-3.jpg"
    },
    {
      itemCode: "B1041",
      category: "Chicken",
      itemName: "Hot Wings (Large)",
      price: 2400.0,
      discount: 0,
      image: "./asset/img/items/chicken/chicken-4.jpg"
    },
    {
      itemCode: "B1042",
      category: "Chicken",
      itemName: "Devilled Chicken (Large)",
      price: 900.0,
      discount: 0,
      image: "./asset/img/items/chicken/chicken-5.jpg"
    },
    {
      itemCode: "B1043",
      category: "Chicken",
      itemName: "BBQ Chicken (Regular)",
      price: 2100.0,
      discount: 0,
      image: "./asset/img/items/chicken/chicken-6.jpg"
    },
  
    // Beverages
    {
      itemCode: "B1044",
      category: "Beverages",
      itemName: "Pepsi (330ml)",
      price: 990.0,
      discount: 5,
      expiryDate: "2024-12-31",
      image: "./asset/img/items/beverages/beverage-1.jpg"
    },
    {
      itemCode: "B1045",
      category: "Beverages",
      itemName: "Coca-Cola (330ml)",
      price: 1230.0,
      discount: 0,
      image: "./asset/img/items/beverages/beverage-2.jpg",
      expiryDate: "2024-12-31"
    },
    {
      itemCode: "B1046",
      category: "Beverages",
      itemName: "Sprite (330ml)",
      price: 1500.0,
      discount: 3,
      expiryDate: "2024-07-05",
      image: "./asset/img/items/beverages/beverage-3.jpg"
    },
    {
      itemCode: "B1047",
      category: "Beverages",
      itemName: "Mirinda (330ml)",
      price: 850.0,
      discount: 7,
      expiryDate: "2024-12-31",
      image: "./asset/img/items/beverages/beverage-4.jpg"
    },
  ];


  
  const itemContainer = document.getElementById('item-container');
  const editDialog = document.getElementById('edit-dialog');
  const editForm = document.getElementById('edit-form');
  const addDialog = document.getElementById('add-dialog');
  const addForm = document.getElementById('add-form');
  
  document.addEventListener('DOMContentLoaded', () => {
      displayItems('ALL');
      setupEventListeners();
  });
  
  function displayItems(category) {
      itemContainer.innerHTML = '';
      const filteredItems = category === 'ALL' ? items : items.filter(item => item.category === category);
  
      filteredItems.forEach(item => {
          const itemBox = document.createElement('div');
          itemBox.classList.add('item-box');
  
          const currentDate = new Date();
          const expiryDate = item.expiryDate ? new Date(item.expiryDate) : null;
          const isExpired = expiryDate && expiryDate < currentDate;
  
          const itemDetails = `
              <img src="${item.image}" alt="${item.itemName}">
              <h3>${item.itemName}</h3>
              <p>Price: Rs. ${item.price.toFixed(2)}</p>
              ${item.discount > 0 ? `<p>Discount: ${item.discount.toFixed(2)}%</p>` : ''}
              ${isExpired ? `<p class="expired-warning">This item has expired!</p>` : ''}
              <button class="edit-btn" data-id="${item.itemCode}">Edit</button>
              <button class="delete-btn" data-id="${item.itemCode}">Delete</button>
          `;
  
          itemBox.innerHTML = itemDetails;
          itemContainer.appendChild(itemBox);
      });
  }
  
  function setupEventListeners() {
      document.querySelectorAll('.filter-btn').forEach(button => {
          button.addEventListener('click', (e) => {
              const category = e.target.getAttribute('data-category');
              displayItems(category);
              document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
              e.target.classList.add('active');
          });
      });
  
      itemContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('edit-btn')) {
              const itemCode = e.target.getAttribute('data-id');
              openEditDialog(itemCode);
          } else if (e.target.classList.contains('delete-btn')) {
              const itemCode = e.target.getAttribute('data-id');
              deleteItem(itemCode);
          }
      });
  
      document.getElementById('add-item-btn').addEventListener('click', () => {
        document.getElementById('add-dialog').style.display = 'flex';
    });
    
    document.getElementById('close-add-dialog').addEventListener('click', () => {
        document.getElementById('add-dialog').style.display = 'none';
    });
    
    document.getElementById('add-form').addEventListener('submit', (e) => {
        e.preventDefault();
  
      
        const newItem = {
            itemCode: document.getElementById('add-item-code').value,
            itemName: document.getElementById('add-item-name').value,
            price: parseFloat(document.getElementById('add-item-price').value),
            discount: parseFloat(document.getElementById('add-item-discount').value) || 0,
            image: document.getElementById('add-item-image').value,
            category: document.getElementById('add-item-category').value,
            expiryDate: document.getElementById('add-item-expiry').value || null
        };
          addItem(newItem);
          addDialog.style.display = 'none';
      });
  
      document.querySelector('.close-btn').addEventListener('click', () => {
          editDialog.style.display = 'none';
      });
  
      editForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const itemCode = document.getElementById('edit-item-id').value;
          const updatedItem = {
              itemCode: document.getElementById('edit-item-code').value,
              itemName: document.getElementById('edit-item-name').value,
              price: parseFloat(document.getElementById('edit-item-price').value),
              discount: parseFloat(document.getElementById('edit-item-discount').value),
              image: document.getElementById('edit-item-image').value,
              expiryDate: document.getElementById('edit-item-expiry').value
          };
          updateItem(itemCode, updatedItem);
          editDialog.style.display = 'none';
      });
  }
  
  function openEditDialog(itemCode) {
      const item = items.find(item => item.itemCode === itemCode);
      if (item) {
          document.getElementById('edit-item-id').value = item.itemCode;
          document.getElementById('edit-item-code').value = item.itemCode;
          document.getElementById('edit-item-name').value = item.itemName;
          document.getElementById('edit-item-price').value = item.price;
          document.getElementById('edit-item-discount').value = item.discount;
          document.getElementById('edit-item-image').value = item.image;
          document.getElementById('edit-item-expiry').value = item.expiryDate || '';
          editDialog.style.display = 'flex';
      } else {
          console.error(`Item with itemCode: ${itemCode} not found`);
      }
  }
  
  function updateItem(itemCode, updatedItem) {
      const index = items.findIndex(item => item.itemCode === itemCode);
      if (index !== -1) {
          items[index] = { ...items[index], ...updatedItem };
          displayItems(document.querySelector('.filter-btn.active').getAttribute('data-category'));
      } else {
          console.error(`Item with itemCode: ${itemCode} not found for update`);
      }
  }
  
  function deleteItem(itemCode) {
      const index = items.findIndex(item => item.itemCode === itemCode);
      if (index !== -1) {
          items.splice(index, 1);
          displayItems(document.querySelector('.filter-btn.active').getAttribute('data-category'));
      } else {
          console.error(`Item with itemCode: ${itemCode} not found for deletion`);
      }
  }
  
  function addItem(newItem) {
      items.push(newItem);
      displayItems(document.querySelector('.filter-btn.active').getAttribute('data-category'));
  }










  document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const orders = []; 

    function populateCustomerDropdown() {
        const customerSelect = document.getElementById('customer-select');
        customerSelect.innerHTML = ''; 
        customerDatabase.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.customerId;
            option.textContent = customer.customerName;
            customerSelect.appendChild(option);
        });
    }

    function displayItems(category = 'ALL') {
        const itemContainer = document.getElementById('home-item-container');
        itemContainer.innerHTML = '';

        const filteredItems = category === 'ALL' ? items : items.filter(item => item.category === category);
        const currentDate = new Date();

        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';

            
            const expiryDate = item.expiryDate ? new Date(item.expiryDate) : null;
            const isExpired = expiryDate && expiryDate < currentDate;

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.itemName}">
                <h4>${item.itemName}</h4>
                <p>Price: Rs. ${item.price.toFixed(2)}</p>
                ${item.discount > 0 ? `<p>Discount: ${item.discount.toFixed(2)}%</p>` : ''}
                <button onclick="addToCart('${item.itemCode}')" >Add to Cart</button>
                ${isExpired ? `<p class="expired-warning">This item has expired!</p>` : ''}
            `;
            itemContainer.appendChild(itemElement);
        });
    }

    function displayCart() {
        const cartItems = document.getElementById('cart-items');
        const totalPriceElem = document.getElementById('total-price');
        const discountPriceElem = document.getElementById('discount-price');
        const finalTotalPriceElem = document.getElementById('final-total-price');

        cartItems.innerHTML = '';
        let totalPrice = 0;
        let totalDiscount = 0;

        cart.forEach(cartItem => {
            const item = items.find(i => i.itemCode === cartItem.id);
            if (!item) return;

            const discountAmount = (item.discount / 100) * item.price * cartItem.quantity;
            const priceAfterDiscount = item.price * cartItem.quantity - discountAmount;

            const itemElement = document.createElement('li');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span class="item-name">${cartItem.name}</span>
                <span class="item-price">${item.price.toFixed(2)}</span>
                <span class="item-quantity">${cartItem.quantity}</span>
                <span class="item-total">${priceAfterDiscount.toFixed(2)}</span>
                <button onclick="removeFromCart('${cartItem.id}')" style="background-color: #dc3545; color: #fff; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer; font-size: 16px; display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px;">
                <i class="fa fa-remove"></i>
                </button>
            `;
            cartItems.appendChild(itemElement);

            totalPrice += item.price * cartItem.quantity;
            totalDiscount += discountAmount;
        });

        const finalTotalPrice = totalPrice - totalDiscount;

        totalPriceElem.textContent = totalPrice.toFixed(2);
        discountPriceElem.textContent = totalDiscount.toFixed(2);
        finalTotalPriceElem.textContent = finalTotalPrice.toFixed(2);
    }

    function sendOrderDetails() {
        const selectedCustomerId = document.getElementById('customer-select').value;
        const customer = customerDatabase.find(c => c.customerId === selectedCustomerId);

        if (!customer) {
            alert('Please select a customer.');
            return;
        }

        const orderDetails = {
            timestamp: new Date().toLocaleString(), 
            customerCode: customer.customerId,
            customerName: customer.customerName,
            items: cart.map(cartItem => {
                const item = items.find(i => i.itemCode === cartItem.id);
                return {
                    name: item.itemName,
                    price: item.price, 
                    quantity: cartItem.quantity
                };
            }),
            totalPrice: parseFloat(document.getElementById('total-price').textContent),
            discountPrice: parseFloat(document.getElementById('discount-price').textContent),
            finalTotalPrice: parseFloat(document.getElementById('final-total-price').textContent)
        };

        
        orders.push(orderDetails);

        
        updateOrdersSection();

       
        clearCart();
    }

    function updateOrdersSection(searchCustomerId = '') {
        const orderDetailsContainer = document.getElementById('orders-table').getElementsByTagName('tbody')[0];
        orderDetailsContainer.innerHTML = '';

        let customerTotalDiscount = 0;
        let customerFinalTotalPrice = 0;

        
        const filteredOrders = searchCustomerId
            ? orders.filter(order => order.customerCode === searchCustomerId)
            : orders;

        
        filteredOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        filteredOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.timestamp}</td>
                <td>${order.customerCode}</td>
                <td>${order.customerName}</td>
                <td>${order.items.map(item => item.name).join(', ')}</td>
                <td>${order.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                <td>${order.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</td>
                <td>${order.finalTotalPrice.toFixed(2)}</td>
            `;
            orderDetailsContainer.appendChild(row);

            customerTotalDiscount += order.discountPrice;
            customerFinalTotalPrice += order.finalTotalPrice;
        });

        
        const totalSummary = document.querySelector('.total-summary');
        totalSummary.innerHTML = `
            <b><p class="discount-price">Discount Price: Rs. ${customerTotalDiscount.toFixed(2)}</p></b>
            <b><p class="final-total-price">Final Total: Rs. ${customerFinalTotalPrice.toFixed(2)}</p></b>
        `;

        
    }

    function clearCart() {
        cart.length = 0;
        displayCart();
    }

    function clearSearch() {
        document.getElementById('search-bar').value = '';
        updateOrdersSection(); 
    }

    window.addToCart = function(itemCode) {
        const item = items.find(i => i.itemCode === itemCode);
        if (item) {
            const cartItem = cart.find(ci => ci.id === itemCode);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ 
                    id: item.itemCode, 
                    name: item.itemName, 
                    price: item.price, 
                    quantity: 1 
                });
            }
            displayCart();
        }
    };

    window.removeFromCart = function(itemId) {
        const itemIndex = cart.findIndex(ci => ci.id === itemId);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            displayCart();
        }
    };

    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            displayItems(category);

            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    
    document.getElementById('send-order-btn').addEventListener('click', sendOrderDetails);
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchValue = document.getElementById('search-bar').value.trim();
        updateOrdersSection(searchValue);
    });
    document.getElementById('clear-search-btn').addEventListener('click', clearSearch);
  

    
// Function to hide all report sections
function hideAllReports() {
  document.querySelectorAll('.report-section').forEach(section => {
      section.style.display = 'none';
  });
}

// Function to display a specific report section
function showReportSection(sectionId) {
  hideAllReports();
  document.getElementById(sectionId).style.display = 'block';
}

// Function to generate Monthly Sales Report
function generateMonthlySalesReport() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  let totalMonthlyPrice = 0;
  let totalQuantity = 0;

  const monthlyOrders = orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate.getFullYear() === currentYear && orderDate.toLocaleString('default', { month: 'long' }) === currentMonth;
  });

  monthlyOrders.forEach(order => {
      totalMonthlyPrice += order.finalTotalPrice;
      order.items.forEach(item => {
          totalQuantity += item.quantity;
      });
  });

  const tableBody = document.querySelector('#monthly-report-table tbody');
  tableBody.innerHTML = `
      <tr>
          <td>${currentMonth}</td>
          <td>Rs. ${totalMonthlyPrice.toFixed(2)}</td>
          <td>${totalQuantity}</td>
      </tr>
  `;

  showReportSection('monthly-report');
}

// Function to generate Annual Sales Report
function generateAnnualSalesReport() {
  const currentYear = new Date().getFullYear();
  let totalAnnualPrice = 0;

  const annualOrders = orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate.getFullYear() === currentYear;
  });

  annualOrders.forEach(order => {
      totalAnnualPrice += order.finalTotalPrice;
  });

  const tableBody = document.querySelector('#annual-report-table tbody');
  tableBody.innerHTML = `
      <tr>
          <td>${currentYear}</td>
          <td>Rs. ${totalAnnualPrice.toFixed(2)}</td>
      </tr>
  `;

  showReportSection('annual-report');
}

// Function to view Top Customers
function viewTopCustomers() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  const monthlyOrders = orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate.getFullYear() === currentYear && orderDate.toLocaleString('default', { month: 'long' }) === currentMonth;
  });

  const customerSpending = monthlyOrders.reduce((acc, order) => {
      if (!acc[order.customerCode]) {
          acc[order.customerCode] = 0;
      }
      acc[order.customerCode] += order.finalTotalPrice;
      return acc;
  }, {});

  const customerNames = {};
  customerDatabase.forEach(customer => {
      customerNames[customer.customerId] = customer.customerName;
  });

  const topCustomers = Object.keys(customerSpending).map(id => ({
      customerId: id,
      customerName: customerNames[id],
      totalSpent: customerSpending[id]
  })).sort((a, b) => b.totalSpent - a.totalSpent);

  const tableBody = document.querySelector('#top-customers-table tbody');
  tableBody.innerHTML = topCustomers.map(customer => `
      <tr>
          <td>${customer.customerId}</td>
          <td>${customer.customerName}</td>
          <td>Rs. ${customer.totalSpent.toFixed(2)}</td>
      </tr>
  `).join('');

  showReportSection('top-customers-report');
}

// Function to generate Food Items Count Report
function generateFoodItemsCountReport() {
  const itemCount = orders.reduce((acc, order) => {
      order.items.forEach(item => {
          acc[item.name] = (acc[item.name] || 0) + item.quantity;
      });
      return acc;
  }, {});

  const itemCountArray = Object.keys(itemCount).map(itemName => ({
      name: itemName,
      totalSold: itemCount[itemName]
  }));

  itemCountArray.sort((a, b) => b.totalSold - a.totalSold);

  const tableBody = document.querySelector('#food-items-table tbody');
  tableBody.innerHTML = itemCountArray.map(item => `
      <tr>
          <td>${item.name}</td>
          <td>${item.totalSold}</td>
      </tr>
  `).join('');

  showReportSection('food-items-report');
}

// Event listeners for buttons
document.getElementById('monthly-report-btn').addEventListener('click', generateMonthlySalesReport);
document.getElementById('annual-report-btn').addEventListener('click', generateAnnualSalesReport);
document.getElementById('top-customers-btn').addEventListener('click', viewTopCustomers);
document.getElementById('food-items-report-btn').addEventListener('click', generateFoodItemsCountReport);




    
    populateCustomerDropdown();
    displayItems();
    displayCart();
});














document.addEventListener('DOMContentLoaded', function () {
  const cart = document.querySelector('.cart');
  const toggleButton = document.getElementById('cart-toggle');

  // Toggle cart visibility
  toggleButton.addEventListener('click', function () {
      if (cart.style.display === 'none' || !cart.style.display) {
          cart.style.display = 'flex'; // Show the cart
      } else {
          cart.style.display = 'none'; // Hide the cart
      }
  });
});




















document.getElementById('generate-pdf-btn').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4'); 

  
  const titleFontSize = 18;
  const headerFontSize = 14;
  const textFontSize = 10;
  const margin = 15;
  const logoWidth = 40; 
  const logoHeight = 20; 

  
  const logoUrl = './asset/img/logo.png'; 
  doc.addImage(logoUrl, 'PNG', margin, margin, logoWidth, logoHeight);

  
  
  doc.setFontSize(titleFontSize);
  doc.setFont("helvetica", "bold");
  doc.text('Invoice', margin, margin + logoHeight + titleFontSize + 20);

  
  const now = new Date();
  const orderDate = now.toLocaleDateString(); // Format as needed (e.g., 'MM/DD/YYYY')
  const orderTime = now.toLocaleTimeString(); // Format as needed (e.g., 'HH:MM:SS')
  doc.setFontSize(textFontSize);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${orderDate}`, margin, margin + logoHeight + titleFontSize + 30);
  doc.text(`Time: ${orderTime}`, margin, margin + logoHeight + titleFontSize + 40);

 
  const customerSelect = document.getElementById('customer-select');
  const selectedCustomer = customerSelect.options[customerSelect.selectedIndex]?.text || 'Not Selected';
  doc.text(`Customer: ${selectedCustomer}`, margin, margin + logoHeight + titleFontSize + 50);

  
  const cartItems = document.getElementById('cart-items').children;
  const tableData = [];

  
  const columns = [
      { header: 'Item', dataKey: 'name' },
      { header: 'Price', dataKey: 'price' },
      { header: 'Quantity', dataKey: 'quantity' },
      { header: 'Total', dataKey: 'total' }
  ];

  Array.from(cartItems).forEach(item => {
      const itemName = item.querySelector('.item-name')?.textContent.trim() || 'N/A';
      const itemPrice = item.querySelector('.item-price')?.textContent.trim() || '0.00';
      const itemQuantity = item.querySelector('.item-quantity')?.textContent.trim() || '0';
      const itemTotal = item.querySelector('.item-total')?.textContent.trim() || '0.00';

      tableData.push({
          name: itemName,
          price: `Rs. ${itemPrice}`,
          quantity: itemQuantity,
          total: `Rs. ${itemTotal}`
      });
  });

  
  doc.autoTable(columns, tableData, {
      startY: margin + logoHeight + titleFontSize + 60,
      margin: { horizontal: margin },
      styles: { fontSize: textFontSize },
      headStyles: { fillColor: [100, 100, 255] }, 
      theme: 'striped' 
  });

  
  const finalY = doc.lastAutoTable.finalY;
  doc.setFontSize(headerFontSize);
  doc.setFont("helvetica", "bold");
  doc.text('Summary:', margin, finalY + 10);

  doc.setFontSize(textFontSize);
  doc.setFont("helvetica", "normal");
  doc.text(`Total: Rs. ${document.getElementById('total-price').textContent.trim()}`, margin, finalY + 20);
  doc.text(`Discount: Rs. ${document.getElementById('discount-price').textContent.trim()}`, margin, finalY + 30);
  doc.text(`Final Total: Rs. ${document.getElementById('final-total-price').textContent.trim()}`, margin, finalY + 40);

  
  doc.save('invoice.pdf');
});



