const openModal = () => {
    document.getElementById('modal').classList.add('active')

    document.getElementById('title-modal').innerText = "New User"
    document.getElementById('save-Value').innerText = "Save"
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('registerUser').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

const ExecuteUser = (event) => {

    event.preventDefault()

    let dataUsers = GetValuesUsers()

    CreateUsers(dataUsers)

    window.location.reload();
}



const GetValuesUsers = () => {

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    const city = document.getElementById('city').value
    const id = Math.floor(Math.random() * 100)
    const dataUsers = {
        id: id,
        name: name,
        email: email,
        phone: phone,
        city: city
    }

    return dataUsers

}

const CreateUsers = (users) => {

    let listUsers = []

    if (localStorage.getItem("userRegistration")) {
        listUsers = JSON.parse(localStorage.getItem("userRegistration"))
    }

    listUsers.push(users)

    localStorage.setItem("userRegistration", JSON.stringify(listUsers))

}

const LoadUser = () => {

    let listUsers = []

    if (localStorage.getItem("userRegistration")) {
        listUsers = JSON.parse(localStorage.getItem("userRegistration"))
    }
    BuildTable(listUsers)

}


window.addEventListener('DOMContentLoaded', LoadUser)

const BuildTable = (listUsers) => {

    let table = document.getElementById('table-body');

    let template = ""

    listUsers.forEach(people => {

        template += `
        
        <tr>
            
            <td data-cell="name">
                ${people.name}
            </td>

            <td data-cell="email">
                ${people.email}
            </td>

            <td data-cell="phone">
                ${people.phone}
            </td>

            <td data-cell="city">
                ${people.city}
            </td>

            <td data-cell="buttons">
                <button type="button" class="button green" onclick="updateUser(${people.id})">update</button>
                <button type="button" class="button red" onclick="deleteUser(${people.id})">Delete</button>
            </td>

            </tr>

        `

    });

    table.innerHTML = template

}

// const updateUser = (id) => {

//     openModal()

//     document.getElementById('title-modal').innerText = "Update User"
//     document.getElementById('save-Value').innerText = "Update"

//     let form = document.getElementById('form')
//     form.removeEventListener('submit', Execute)

//     let retornData = JSON.parse(localStorage.getItem("userRegistration"))

//     retornData = retornData.find(user => user.id === id)

//     if (retornData) {

//         const updateName = document.getElementById('name').value = retornData.name
//         const updateEmail = document.getElementById('email').value = retornData.email
//         const updatePhone = document.getElementById('phone').value = retornData.phone
//         const newCity = document.getElementById('city').value = retornData.city

//         document.getElementById('saveValue').addEventListener('submit', () => updateUserInfo())
//     }

// }

// const updateUserInfo = () => {
//     const updateName = document.getElementById('name').value
//     const updateEmail = document.getElementById('email').value
//     const updatePhone = document.getElementById('phone').value
//     const updateCity = document.getElementById('city').value 

//     const userList = JSON.parse(localStorage.getItem('userRegistration')) || []

//     const userIndexFind = userList.findIndex(user => user.id == id)

//     if(userIndexFind !== -1){

//         userList[userIndexFind].name = updateName
//         userList[userIndexFind].email = updateEmail
//         userList[userIndexFind].phone = updatePhone
//         userList[userIndexFind].city = updateCity

//         localStorage.setItem('userRegistration')
        
// }
// }



const updateUserInfo = (id) => {

    const updateName = document.getElementById('name').value
    const updateEmail = document.getElementById('email').value
    const updatePhone = document.getElementById('phone').value
    const updateCity = document.getElementById('city').value 

    const userList = JSON.parse(localStorage.getItem('userRegistration')) || [];

    const userIndexFind = userList.findIndex(user => user.id == id)

    if(userIndexFind !== -1){

        userList[userIndexFind].name = updateName
        userList[userIndexFind].email = updateEmail
        userList[userIndexFind].phone = updatePhone
        userList[userIndexFind].city = updateCity

        localStorage.setItem('userRegistration', JSON.stringify(userList))

    }

}

const updateUser = (id) => {

    openModal()

    document.getElementById('title-modal').innerText = "Update User"
    document.getElementById('save-Value').innerText = "Update"

    let form = document.getElementById('form')
    form.onsubmit = null;

    let retornData = JSON.parse(localStorage.getItem("userRegistration"))

    retornData = retornData.find(user => user.id === id)

    if (retornData !== undefined) {

        document.getElementById('name').value = retornData.name
        document.getElementById('email').value = retornData.email
        document.getElementById('phone').value = retornData.phone
        document.getElementById('city').value = retornData.city

        form.onsubmit = () => updateUserInfo(id)

    }

}


const deleteUser = (id) => {
    let listUsers = JSON.parse(localStorage.getItem("userRegistration"))
    listUsers = listUsers.filter(user => user.id !== id)
    localStorage.setItem("userRegistration", JSON.stringify(listUsers))
    LoadUser()
}


