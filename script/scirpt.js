document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userMap = {
        "mahmoud.kader": "Mr.Mahmoud",
        "mohand.hassan": "Mohand",
        "julia.samy": "Julia",
        "mohamed.sayed": "Mohamed",
        "beshoy.adel": "Mr.Beshoy",
        "basmala.ahmed": "EL-Zeftaa🥱",
        "mohammed.alsisi": "Mr:Muhammed Al-Sisi"
        
    };

    // كلمات المرور مخصصة لكل مستخدم
    const passwordMap = {
        "mahmoud.kader": "Abcd12345@",
        "mohand.hassan": "Abcd12345@",
        "julia.samy": "Abcd12345@",
        "mohamed.sayed": "Abcd12345@",
        "beshoy.adel": "Abcd12345@",
        "basmala.ahmed": "Abc12345@",  
        "mohammed.alsisi":"Abc123@"
    };

    const username = document.getElementById('username').value.trim();
    const enteredPassword = document.getElementById('password').value;

    if (userMap[username] && passwordMap[username] && enteredPassword === passwordMap[username]) {
        localStorage.setItem('currentUser', userMap[username]);
        window.location.href = 'home.html';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
});


