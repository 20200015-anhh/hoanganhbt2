const clientUpdates = document.querySelectorAll('[id=clientUpdate]');
const addedClientData = document.getElementById('clientNameAddInput');
const clientAdd = document.getElementById('clientAdd');

const updateClient = () => {
  const update = event.target
  const data = document.getElementById(`clientNameUpdateInput${update.value}`).value;
  console.log(data);
  fetch('/client/update/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'id': update.value,
      'name': data
    })
  })
    .then(response => {
      window.location.reload()
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const addClient = () => {
  const data = addedClientData.value;
  console.log(data);
  fetch('/client/add/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'name': data
    })
  })
    .then(response => {
      window.location.reload()
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

clientUpdates.forEach((update,index) => {
  update.addEventListener("click", updateClient)}
)

clientAdd.addEventListener("click", addClient)

