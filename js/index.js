document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchValue = document.getElementById('search').value.trim();
    if (searchValue === '') {
      alert('Please enter a GitHub username.');
      return;
    }
    fetch(`https://api.github.com/users/${searchValue}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        const userItem = document.createElement('li');
        const userName = document.createElement('h3');
        const userAvatar = document.createElement('img');
        const userProfile = document.createElement('a');
        userName.textContent = data.login;
        userAvatar.src = data.avatar_url;
        userAvatar.alt = data.login + ' avatar';
        userProfile.href = data.html_url;
        userProfile.textContent = 'Profile';
        userItem.appendChild(userName);
        userItem.appendChild(userAvatar);
        userItem.appendChild(userProfile);
        userList.appendChild(userItem);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('User not found. Please enter a valid GitHub username.');
      });
  });
});