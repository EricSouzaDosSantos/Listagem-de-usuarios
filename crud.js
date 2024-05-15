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

const ExecuteUser = () => {

    let dataUsers = GetValuesUsers()

    CreateUsers(dataUsers)

    window.location.reload();
}

document.getElementById('save-Value').addEventListener('click', ExecuteUser)



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

function updateUser(id) {
    openModal();

    document
        .getElementById('save-Value')
        .removeEventListener("click", ExecuteUser);

    document.getElementById("title-modal").innerText = "Update User";
    document.getElementById("save-Value").innerText = "Update";

    const retornData = JSON.parse(localStorage.getItem("userRegistration"));

    const UserFound = retornData.find(
        (userFind) => userFind.id == id
    );

    document.getElementById('city').value = UserFound.city
    document.getElementById('name').value = UserFound.name
    document.getElementById('email').value = UserFound.email
    document.getElementById('phone').value = UserFound.phone

    document
        .getElementById('save-Value').addEventListener('click', () => updateUserInfos(id))
}

function updateUserInfos(id) {
    const newName = document.getElementById("name").value;
    const newEmail = document.getElementById("email").value;
    const newPhone = document.getElementById("phone").value;
    const newCity = document.getElementById("city").value;

    const userList = JSON.parse(localStorage.getItem('userRegistration')) || []

    const userIndexFind = userList.findIndex((user) => user.id == id);

    if (userIndexFind !== -1) {
        userList[userIndexFind].name = newName;
        userList[userIndexFind].email = newEmail;
        userList[userIndexFind].phone = newPhone;
        userList[userIndexFind].city = newCity;

        localStorage.setItem('userRegistration', JSON.stringify(userList))
    }

    closeModal();
    window.location.reload();
}


const deleteUser = (id) => {
    let listUsers = JSON.parse(localStorage.getItem("userRegistration"))
    listUsers = listUsers.filter(user => user.id !== id)
    localStorage.setItem("userRegistration", JSON.stringify(listUsers))
    LoadUser()
}


