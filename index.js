const users = JSON.parse(localStorage.getItem("users")) || [];
// const users = [
//     {firstname: "Pham", lastname: "Hoang", username: "Kem", password: "123", login: false, isEditing: false},
//     {firstname: "Viet", lastname: "Anh", username: "Yasuo", password: "123", login: false, isEditing: false},
//     {firstname: "Tuan", lastname: "Anh", username: "Yone", password: "123", login: false, isEditing: false},
//     {firstname: "Hong", lastname: "Nhi", username: "Cat", password: "123", login: false, isEditing: false},
//     {firstname: "Van", lastname: "Anh", username: "Stranger", password: "123", login: false, isEditing: false},
//     {firstname: "Bich", lastname: "Phuong", username: "Idol", password: "123", login: false, isEditing: false},
//     {firstname: "Le", lastname: "Hai", username: "Owner", password: "123", login: false, isEditing: false},
// ]
localStorage.setItem("users", JSON.stringify(users))
const loginUser = users.filter(user => {
    return user.login
})

const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)

function handleDisplayInfo() {
    $("header").querySelector(".detail-info").classList.toggle('display')
    $(".detail-info").querySelector("ul").innerHTML = `
    <li>First Name: ${loginUser[0].firstname}</li>
    <li>Last Name: ${loginUser[0].lastname}</li>
    <li>Username: ${loginUser[0].username}</li>
    <li>Password: ${loginUser[0].password}</li>
    `
}

function handleLogOut() {
    const newUsers = users.map(user => {
        if(user.login) {
            return {...user, login: false}
        }
        return {...user}
    })
    localStorage.setItem("users", JSON.stringify(newUsers))
    $('main').querySelector('a').click()
}

if(loginUser[0]) {
    document.getElementById("user-info").innerHTML = `Xin chao ${loginUser[0].username} ! <i class="fa-sharp fa-solid fa-angle-down" onclick="handleDisplayInfo()"></i>`
} else {
    document.getElementById("user-info").innerHTML = `<a class="mx-5" href="/src/components/SignUp/signup.html">Login / Register</a>`
}