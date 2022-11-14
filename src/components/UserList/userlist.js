const users = JSON.parse(localStorage.getItem("users")) || []
// const users = [
//     {firstname: "Pham", lastname: "Hoang", username: "Kem", password: "123", login: false, isEditing: false},
//     {firstname: "Viet", lastname: "Anh", username: "Yasuo", password: "123", login: false, isEditing: false},
//     {firstname: "Tuan", lastname: "Anh", username: "Yone", password: "123", login: false, isEditing: false},
//     {firstname: "Hong", lastname: "Nhi", username: "Cat", password: "123", login: true},
//     {firstname: "Van", lastname: "Anh", username: "Stranger", password: "123", login: false, isEditing: false},
//     {firstname: "Bich", lastname: "Phuong", username: "Idol", password: "123", login: false, isEditing: false},
//     {firstname: "Le", lastname: "Hai", username: "Owner", password: "123", login: false, isEditing: false},
// ]

const loginUser = users.filter(user => {
    return user.login
})

const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)

let currentPage = 1
let perPage = 2
let totalPage = 0
let perUser = []

function renderUsers() {
    perUser = users.slice(
        (currentPage - 1) * perPage,
        (currentPage - 1) * perPage + perPage
    )
    $$('#user-list').innerHTML = ""
    perUser.forEach((user, index) => {
        $$('#user-list').innerHTML += `<li class="d-flex justify-content-between">
            <div>
                First Name: ${user.firstname}<br/>
                Last Name: ${user.lastname}<br/>
                User Name: ${user.username}
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div><i class="fa-solid fa-pen-to-square edit-info" onclick="handleEdit(${(currentPage - 1) * perPage + index})"></i></div>
                <div class="delete mx-5 d-flex  align-items-center" onclick="handleDelete(${(currentPage - 1) * perPage + index})">&times;</div>
            </div>
            
        </li>`
    })
}

function handlePageNumber(num) {
    $('#pagination').querySelector('.active').classList.remove('active')
    $('#pagination').querySelector(`span:nth-child(${num})`).classList.add('active')
    currentPage = num
    perUser = users.slice(
        (currentPage - 1) * perPage,
        (currentPage - 1) * perPage + perPage
    )
    renderUsers()
}

function renderPageNumber() {
    $('#pagination').innerHTML = ""
    totalPage = Math.ceil(users.length / perPage)
    if(currentPage > totalPage) {
        currentPage = totalPage
        renderUsers()
    }
    for(let i = 1; i <= totalPage; i++) {
        $('#pagination').innerHTML += `<span onclick="handlePageNumber(${i})">${i}</span>`
    }
    $('#pagination').querySelector(`span:nth-child(${currentPage})`).classList.add('active')
}

function handleSearch() {
    let valueSearchInput = $('#search').value.toUpperCase()
    let usersSearch = users.filter (user => {
        if(valueSearchInput === "") {
            return false
        } else {
            return user.username.toUpperCase().includes(valueSearchInput.toUpperCase())
        }
    })
    $('.list-search').innerHTML = ""
    usersSearch.forEach(user => {
        $('.list-search').innerHTML += `<li>${user.username}</li>`
    })
}

function handleEdit(id) {
        const newUser =  users.map((user, index) => {
            if(index === id) {
                return {...user, isEditing: true}
            }
            return user
        })
        console.log(newUser)
        localStorage.setItem("users", JSON.stringify(newUser))
        document.querySelector("#edit-direct").click()
}

function handleDelete(index) {
    const newUsers  = users;
    if(newUsers[index].login) {
        confirm('You are in this user')
    } else {
        if(confirm('Do you want to delete this user ?')) {
        newUsers.splice((currentPage - 1) * perPage + index, 1)
        renderUsers()
        renderPageNumber()
    }
    localStorage.setItem("users", JSON.stringify(newUsers))
    }
}

if(loginUser[0]) {
    document.getElementById("container").innerHTML = `<div class="d-flex justify-content-center position-relative">
    <input type="text" id="search" placeholder="search" oninput="handleSearch()">
    <ul class="list-search position-absolute">
    </ul>
    </div>
    <ul id="user-list">
    </ul>
    <div id="pagination" class="d-flex justify-content-center"></div>`
    renderUsers()
    renderPageNumber()
} else {
    document.getElementById("container").innerHTML = `<div class="text-center font-18">Ban chua <a href="../SignIn/signin.html">Dang Nhap</a></div>`
}





