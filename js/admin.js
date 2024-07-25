let staffDatabase = []; 


function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    
    const modalContent = document.getElementById('modalContent');
    if (modalContent) {
        modalContent.innerHTML = '';
    }

   
    if (sectionId === 'staff') {
        document.querySelector('.staff-buttons').style.display = 'block';
    }
}


function showModalContent(modalId) {
    const modalContent = document.getElementById('modalContent');
    const templates = document.querySelectorAll('.modal-template');
    templates.forEach(template => {
        if (template.id === modalId) {
            modalContent.innerHTML = template.innerHTML;
        }
    });

    document.querySelector('.staff-buttons').style.display = 'none';
}


function showStaffButtons() {
    const modalContent = document.getElementById('modalContent');
    if (modalContent) {
        modalContent.innerHTML = '';
    }
    document.querySelector('.staff-buttons').style.display = 'block';
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
}


function fetchAndShowStaff(action) {
    const staffId = document.getElementById(action + 'StaffId').value;
    const staff = staffDatabase.find(s => s.staffId === staffId);

    if (staff) {
        const detailsDiv = document.getElementById(action + 'StaffDetails');
        detailsDiv.innerHTML = `
            <label for="${action}MobileNumber">Enter Mobile Number:</label>
            <input type="text" id="${action}MobileNumber" name="${action}MobileNumber" value="${staff.mobileNumber}" required>
            <label for="${action}StaffName">Staff Member Name:</label>
            <input type="text" id="${action}StaffName" name="${action}StaffName" value="${staff.staffName}" required>
            <label for="${action}StaffAddress">Staff Member Address:</label>
            <input type="text" id="${action}StaffAddress" name="${action}StaffAddress" value="${staff.staffAddress}" required>
            <label for="${action}StaffNIC">Staff Member NIC:</label>
            <input type="text" id="${action}StaffNIC" name="${action}StaffNIC" value="${staff.staffNIC}" required>
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
