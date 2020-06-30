const username = document.getElementById('username');
const saveUserBtn = document.getElementById('saveUserBtn');

username.addEventListener('keyup',() => {
    saveUserBtn.disabled = !username.value;
});

homePage = (e) =>  {
    console.log("clicked on the Next button");
    e.preventDefault();

    localStorage.setItem('Username',username.value);
    window.location.assign("/homepage.html");
};   