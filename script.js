// Function to fetch JSON data
function fetchJSON(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error('Error fetching JSON:', error));
  }
  
  // Function to render employee data
  function renderEmployeeData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterSelect = document.getElementById('filterSelect').value.toLowerCase();
  
    fetchJSON('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
      .then(data => {
        const employees = data.employees;
        const filteredEmployees = employees.filter(employee => {
          const name = employee.name ? employee.name.toLowerCase() : '';
          const designation = employee.designation ? employee.designation.toLowerCase() : '';
          const skills = employee.skills ? employee.skills.map(skill => skill.toLowerCase()) : [];
  
          return (name.includes(searchInput) || designation.includes(searchInput)) &&
            (filterSelect === '' || designation.includes(filterSelect) || skills.includes(filterSelect));
        });
  
        const tableBody = document.querySelector('#employeeTable tbody');
        tableBody.innerHTML = '';
  
        filteredEmployees.forEach(employee => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name || '-'}</td>
            <td>${employee.designation || '-'}</td>
            <td>${employee.skills ? employee.skills.join(', ') : '-'}</td>
          `;
          tableBody.appendChild(row);
        });
      });
  }
  
  // Event listeners for search and filter
  document.getElementById('searchInput').addEventListener('input', renderEmployeeData);
  document.getElementById('filterSelect').addEventListener('change', renderEmployeeData);
  
  // Initial rendering
  renderEmployeeData();
  