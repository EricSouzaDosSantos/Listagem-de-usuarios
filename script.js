const openModal = () => {
    document.getElementById('modal').classList.add('active')
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('registerUser').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

const Execute = (event) =>{

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


window.addEventListener('DOMContentLoaded', () => LoadUser())

const BuildTable = (listUsers) => {

    let table = document.getElementById('table-body');

    let template = "";

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
                <button type="button" class="button green" onclick="updateUser(${people.id}, '${people.name}', '${people.phone}', '${people.city}', '${people.email}')">update</button>
                <button type="button" class="button red" onclick="deleteUser(${people.id})">Delete</button>
            </td>

            </tr>

        `

    });

    table.innerHTML = template

}

const updateUser = (id, name, phone, city, email) => {
    let listUsers = JSON.parse(localStorage.getItem("userRegistration"));
    const userIndex = listUsers.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        const newName = document.getElementById('name').value=name
        const newEmail = document.getElementById('email').value=email
        const newCity = document.getElementById('city').value=city
        const newPhone = document.getElementById('phone').value=phone

        listUsers[userIndex].name = newName;
        listUsers[userIndex].phone = newPhone;
        listUsers[userIndex].city = newCity;
        listUsers[userIndex].email = newEmail;

        localStorage.setItem("userRegistration", JSON.stringify(listUsers));

        LoadUser();

        openModal();
    }
}

const deleteUser = (id) => {
    let listUsers = JSON.parse(localStorage.getItem("userRegistration"))
    listUsers = listUsers.filter(user => user.id !== id)
    localStorage.setItem("userRegistration", JSON.stringify(listUsers))
    LoadUser()
}
