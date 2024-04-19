const openModal = () => {
    document.getElementById('modal').classList.add('active')
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('registerUser').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

const CalcValues = (event) =>{

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
                <button type="button" class="button green" onclick="DeleteUser()">update</button>
                <button type="button" class="button red" onclick="DeleteUser(id)">Delete</button>
            </td>

            </tr>

        `

    });

    table.innerHTML = template

}

const foundUser = () => {

    let listDeleteUsers = []



}

const DeleteUser = (id) => {

    const findId = this.get()
    const foundUser = findId.filter(find => find.id !== id)
    this.set(foundUser)
    this.get()

    window.location.reload()

}
