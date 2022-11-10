// const users = JSON.parse(localStorage.getItem("users")) || []
const users = [
    {username: "Kem", password: "123"},
    {username: "Kem2", password: "123"},
    {username: "Kem3", password: "123"},
    {username: "Kem4", password: "123"},
    {username: "Kem5", password: "123"},
    {username: "Kem6", password: "123"},
    {username: "Kem7", password: "123"},
    {username: "Kem8", password: "123"},
]

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
            <div class="delete mr-5 d-flex  align-items-center" onclick="handleDelete(${index})">&times;</div>
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
function handleDelete(index) {
    // const newUsers  = users;
    if(confirm('Do you want to delete this user ?')) {
        users.splice((currentPage - 1) * perPage + index, 1)
        renderUsers()
        renderPageNumber()
    }
}

renderUsers()
renderPageNumber()




