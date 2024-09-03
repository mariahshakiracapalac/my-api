const fetchUsersBtn = document.getElementById('fetchUsersBtn');
const userContainer = document.getElementById('userContainer');
const searchInput = document.getElementById('searchInput');

let usersData = []; 


function fetchUsers() {
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            usersData = users; 
            displayUsers(users); 
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userContainer.innerHTML = '<p style="color:red;">Failed to fetch user data. Please try again later.</p>';
        });
}


function displayUsers(users) {
    userContainer.innerHTML = ''; 
    if (users.length === 0) {
        userContainer.innerHTML = '<p>No users found. Try a different search term.</p>';
        return;
    }
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <p>Company: ${user.company.name}</p>
        `;

        userContainer.appendChild(userCard);
    });
}


function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = usersData.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
}


fetchUsersBtn.addEventListener('click', fetchUsers);


searchInput.addEventListener('input', filterUsers);


window.addEventListener('load', () => fetchUsers());