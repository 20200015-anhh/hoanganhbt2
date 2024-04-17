const addClientButton = document.querySelector('[id=addClient]');
const updateClientButtons = document.querySelectorAll('[id=updateClient]');

const updateClient = (event) => {
  const update = event.target
  const data = document.getElementById(`clientNameUpdateInput`).value;
  console.log(update);
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
  const data = document.getElementById('clientNameAddInput').value;
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

const createAddClientForm = (event) => {
  const modal = document.createElement("div")
  modal.className = "modal fade"
  modal.id = "addclientform"
  modal.setAttribute("data-bs-backdrop", "static")
  modal.setAttribute("data-bs-keyboard", "false")
  modal.tabIndex = -1
  modal.setAttribute("aria-labelledby", "staticBackdropLabel")
  modal.ariaHidden = true
  modal.role = "dialog"
  modal.style.display = "block"
  const dialog = document.createElement("div")
  dialog.className="modal-dialog text-bg-dark"
  const content = document.createElement("div")
  content.className="modal-content text-bg-dark"
  const header = document.createElement("div")
  header.className="modal-header text-bg-dark"
  const title = document.createElement("h1")
  title.className="modal-title fs-5"
  title.id = "staticBackdropLabel"
  title.textContent = "Add client"
  const close = document.createElement("button")
  close.className="btn-close"
  close.addEventListener("click", () => modal.parentNode.removeChild(modal))
  close.ariaLabel="Close"
  header.append(title,close)
  const body = document.createElement("div")
  body.className="modal-body"
  const inputField = document.createElement("form")
  inputField.className = "needs-validation"
  inputField.noValidate = true;
  const name = document.createElement("div")
  name.className="mb-3 text-start"
  const nameLabel = document.createElement("label")
  nameLabel.htmlFor = "clientNameAddInput"
  nameLabel.className ="form-label"
  nameLabel.textContent = "Name"
  const nameInput = document.createElement("input")
  nameInput.type = "text"
  nameInput.className = "form-control"
  nameInput.id = "clientNameAddInput"
  name.append(nameLabel,nameInput)
  inputField.append(name)
  body.append(inputField)
  const footer = document.createElement("div")
  footer.className="modal-footer"
  const add = document.createElement("button")
  add.className="btn btn-primary"
  add.type = "button"
  add.id = "clientAdd"
  add.setAttribute("data-bs-dissmiss", "modal")
  add.textContent = "Add"
  add.addEventListener("click" , addClient)
  const cancel = document.createElement("button")
  cancel.className="btn btn-secondary"
  cancel.type = "button"
  cancel.setAttribute("data-bs-dissmiss", "modal")
  cancel.textContent = "Cancel"
  cancel.addEventListener("click", () => modal.parentNode.removeChild(modal))
  footer.append(add,cancel)
  content.append(header,body,footer)
  dialog.append(content)
  modal.append(dialog)
  modal.append(dialog)
  modal.classList.add("show")
  document.querySelector("[id=main]").append(modal)
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
}

const createUpdateClientForm = (event) => {
  const clientID = event.target.value;
  console.log(clientID);
  const modal = document.createElement("div")
  modal.className = "modal fade"
  modal.id = `updateclientform`
  modal.setAttribute("data-bs-backdrop", "static")
  modal.setAttribute("data-bs-keyboard", "false")
  modal.tabIndex = -1
  modal.setAttribute("aria-labelledby", "staticBackdropLabel")
  modal.ariaHidden = true
  modal.role = "dialog"
  modal.style.display = "block"
  const dialog = document.createElement("div")
  dialog.className="modal-dialog text-bg-dark"
  const content = document.createElement("div")
  content.className="modal-content text-bg-dark"
  const header = document.createElement("div")
  header.className="modal-header text-bg-dark"
  const title = document.createElement("h1")
  title.className="modal-title fs-5"
  title.id = "staticBackdropLabel"
  title.textContent = "Update client"
  const close = document.createElement("button")
  close.className="btn-close"
  close.addEventListener("click", () => modal.parentNode.removeChild(modal))
  close.ariaLabel="Close"
  header.append(title,close)
  const body = document.createElement("div")
  body.className="modal-body"
  const inputField = document.createElement("form")
  const name = document.createElement("div")
  name.className="mb-3 text-start"
  const nameLabel = document.createElement("label")
  nameLabel.htmlFor = "clientNameUpdateInput"
  nameLabel.className ="form-label"
  nameLabel.textContent = "Name"
  const nameInput = document.createElement("input")
  nameInput.type = "text"
  nameInput.className = "form-control"
  nameInput.id = "clientNameUpdateInput"
  name.append(nameLabel,nameInput)
  inputField.append(name)
  body.append(inputField)
  const footer = document.createElement("div")
  footer.className="modal-footer"
  const update = document.createElement("button")
  update.className="btn btn-primary"
  update.type = "button"
  update.id = "clientUpdate"
  update.setAttribute("data-bs-dissmiss", "modal")
  update.textContent = "Update"
  update.addEventListener("click" , updateClient)
  update.value = clientID;
  console.log(update);
  const cancel = document.createElement("button")
  cancel.className="btn btn-secondary"
  cancel.type = "button"
  cancel.setAttribute("data-bs-dissmiss", "modal")
  cancel.textContent = "Cancel"
  cancel.addEventListener("click", () => modal.parentNode.removeChild(modal))
  footer.append(update,cancel)
  content.append(header,body,footer)
  dialog.append(content)
  modal.append(dialog)
  modal.append(dialog)
  modal.classList.add("show")
  document.querySelector("[id=main]").append(modal)
}

addClientButton.addEventListener("click", createAddClientForm)
updateClientButtons.forEach((updateClientButton) => {updateClientButton.addEventListener("click", createUpdateClientForm)})

