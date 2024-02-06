const fruitList = document.querySelector('#fruitList')
const API_URL = 'https://fruits-backend-student-neog.replit.app/fruits'
const successMessage = document.querySelector('#successMessage')
const selectType = document.querySelector('#selectType')
const fruitData = []

function fetchData() {
  fruitList.innerHTML = ' '
  successMessage.innerHTML = " "
  fetch(API_URL)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      if (data) {
        generateList(data)
        deleteList()
        fruitData.push(data)
      }
    })
}

function generateList(data) {
  fruitList.innerHTML = ' '
  for (let i = 0; i < data.length; i++) {
    const listElement = document.createElement('li')

    listElement.className = 'list-group-item d-flex justify-content-between'

    listElement.innerHTML = `<p>${data[i].name} - Quantity: ${data[i].quantity} - Category: ${data[i].category}</p><button id="deleteBtn" data_id="${data[i]._id}" class="btn btn-danger">DELETE</button>`


    fruitList.appendChild(listElement)
  }


}

function deleteList() {
  const deleteBtn = document.querySelectorAll('#deleteBtn')

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', function(event) {
      const fruitId = event.target.getAttribute('data_id')

      fetch(`${API_URL}/${fruitId}`, {
        method: 'DELETE'
      })
        .then(function(response) {
          return response.json()
        })
        .then(function(data) {
          successMessage.innerHTML = `<p>Deteled successfully</p>`
          fetchData()
        })

    })
  }
}



selectType.addEventListener('change', applyFilter)

function applyFilter() {
  const selectedType = selectType.value
  const filteredData = []
  if (selectedType !== 'All') {
    for (let i = 0; i < fruitData[0].length; i++) {

      if (selectedType === fruitData[0][i].category) {
        filteredData.push(fruitData[0][i])
      }
    }
    generateList(filteredData)
  } else {
    generateList(fruitData[0])
  }
}

fetchData()
