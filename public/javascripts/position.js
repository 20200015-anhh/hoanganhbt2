const addPositionButtons = document.querySelectorAll('[id=addPosition]');
const updatePositionButtons = document.querySelectorAll('[id=updatePosition]');

const addPosition = () => {
  const add = event.target
  console.log(add.value);
  const name = document.getElementById(`positionNameAddInput`).value;
  const size = document.getElementById(`positionSizeAddInput`).value;
  const platform = document.getElementById(`positionPlatformAddInput`).value;
  const demonames = document.getElementById(`positionDemoNamesAddInput`).value.split("\n");
  const demolinks = document.getElementById(`positionDemoLinksAddInput`).value.split("\n");
  fetch('/position/add/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'owner': add.value,
      'name': name,
      'size': size,
      'platform': platform,
      'demonames': demonames,
      'demolinks': demolinks,
    })
  })
    .then(response => {
      window.location.reload()
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const updatePosition = () => {
  const update = event.target
  console.log(update.value);
  const name = document.getElementById(`positionNameUpdateInput`).value;
  const size = document.getElementById(`positionSizeUpdateInput`).value;
  const platform = document.getElementById(`positionPlatformUpdateInput`).value;
  const demonames = document.getElementById(`positionDemoNamesUpdateInput`).value.split("\n");
  const demolinks = document.getElementById(`positionDemoLinksUpdateInput`).value.split("\n");
  fetch('/position/update/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'id': update.value,
      'name': name,
      'size': size,
      'platform': platform,
      'demonames': demonames,
      'demolinks': demolinks,
    })
  })
    .then(response => {
      window.location.reload()
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const createAddPositionForm = (event) => {
  const clientID = event.target.value;
  console.log(clientID);
  const modal = document.createElement("div")
  modal.className = "modal fade"
  modal.id = "addpositionform"
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
  title.textContent = "Add position"
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
  nameLabel.htmlFor = "positionNameAddInput"
  nameLabel.className ="form-label"
  nameLabel.textContent = "Name"
  const nameInput = document.createElement("input")
  nameInput.type = "text"
  nameInput.className = "form-control"
  nameInput.id = "positionNameAddInput"
  name.append(nameLabel,nameInput)
  const size = document.createElement("div")
  size.className="mb-3 text-start"
  const sizeLabel = document.createElement("label")
  sizeLabel.htmlFor = "positionSizeAddInput"
  sizeLabel.className ="form-label"
  sizeLabel.textContent = "Size"
  const sizeInput = document.createElement("input")
  sizeInput.type = "text"
  sizeInput.className = "form-control"
  sizeInput.id = "positionSizeAddInput"
  size.append(sizeLabel,sizeInput)
  const platform = document.createElement("div")
  platform.className="mb-3 text-start"
  const platformLabel = document.createElement("label")
  platformLabel.htmlFor = "positionPlatformAddInput"
  platformLabel.className ="form-label"
  platformLabel.textContent = "Platform"
  const platformInput = document.createElement("input")
  platformInput.type = "text"
  platformInput.className = "form-control"
  platformInput.id = "positionPlatformAddInput"
  platform.append(platformLabel,platformInput)
  const demonames = document.createElement("div")
  demonames.className="mb-3 text-start"
  const demonamesLabel = document.createElement("label")
  demonamesLabel.htmlFor = "positionDemoNamesAddInput"
  demonamesLabel.className ="form-label"
  demonamesLabel.textContent = "DemoNames divided by '\n'"
  const demonamesInput = document.createElement("input")
  demonamesInput.type = "text"
  demonamesInput.className = "form-control"
  demonamesInput.id = "positionDemoNamesAddInput"
  demonames.append(demonamesLabel,demonamesInput)
  const demolinks = document.createElement("div")
  demolinks.className="mb-3 text-start"
  const demolinksLabel = document.createElement("label")
  demolinksLabel.htmlFor = "positionDemoLinksAddInput"
  demolinksLabel.className ="form-label"
  demolinksLabel.textContent = "DemoLinks divided by '\n'"
  const demolinksInput = document.createElement("input")
  demolinksInput.type = "text"
  demolinksInput.className = "form-control"
  demolinksInput.id = "positionDemoLinksAddInput"
  demolinks.append(demolinksLabel,demolinksInput)
  inputField.append(name,size,platform,demonames,demolinks)
  body.append(inputField)
  const footer = document.createElement("div")
  footer.className="modal-footer"
  const add = document.createElement("button")
  add.className="btn btn-primary"
  add.type = "button"
  add.id = "positionAdd"
  add.setAttribute("data-bs-dissmiss", "modal")
  add.textContent = "Add"
  add.addEventListener("click" , addPosition)
  add.value=clientID
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
}

const createUpdatePositionForm = (event) => {
  const positionID = event.target.value;
  console.log(positionID);
  const modal = document.createElement("div")
  modal.className = "modal fade"
  modal.id = "updatepositionform"
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
  title.textContent = "Update position"
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
  nameLabel.htmlFor = "positionNameUpdateInput"
  nameLabel.className ="form-label"
  nameLabel.textContent = "Name"
  const nameInput = document.createElement("input")
  nameInput.type = "text"
  nameInput.className = "form-control"
  nameInput.id = "positionNameUpdateInput"
  name.append(nameLabel,nameInput)
  const size = document.createElement("div")
  size.className="mb-3 text-start"
  const sizeLabel = document.createElement("label")
  sizeLabel.htmlFor = "positionSizeUpdateInput"
  sizeLabel.className ="form-label"
  sizeLabel.textContent = "Size"
  const sizeInput = document.createElement("input")
  sizeInput.type = "text"
  sizeInput.className = "form-control"
  sizeInput.id = "positionSizeUpdateInput"
  size.append(sizeLabel,sizeInput)
  const platform = document.createElement("div")
  platform.className="mb-3 text-start"
  const platformLabel = document.createElement("label")
  platformLabel.htmlFor = "positionPlatformUpdateInput"
  platformLabel.className ="form-label"
  platformLabel.textContent = "Platform"
  const platformInput = document.createElement("input")
  platformInput.type = "text"
  platformInput.className = "form-control"
  platformInput.id = "positionPlatformUpdateInput"
  platform.append(platformLabel,platformInput)
  const demonames = document.createElement("div")
  demonames.className="mb-3 text-start"
  const demonamesLabel = document.createElement("label")
  demonamesLabel.htmlFor = "positionDemoNamesUpdateInput"
  demonamesLabel.className ="form-label"
  demonamesLabel.textContent = "DemoNames divided by '\n'"
  const demonamesInput = document.createElement("input")
  demonamesInput.type = "text"
  demonamesInput.className = "form-control"
  demonamesInput.id = "positionDemoNamesUpdateInput"
  demonames.append(demonamesLabel,demonamesInput)
  const demolinks = document.createElement("div")
  demolinks.className="mb-3 text-start"
  const demolinksLabel = document.createElement("label")
  demolinksLabel.htmlFor = "positionDemoLinksUpdateInput"
  demolinksLabel.className ="form-label"
  demolinksLabel.textContent = "DemoLinks divided by '\n'"
  const demolinksInput = document.createElement("input")
  demolinksInput.type = "text"
  demolinksInput.className = "form-control"
  demolinksInput.id = "positionDemoLinksUpdateInput"
  demolinks.append(demolinksLabel,demolinksInput)
  inputField.append(name,size,platform,demonames,demolinks)
  body.append(inputField)
  const footer = document.createElement("div")
  footer.className="modal-footer"
  const update = document.createElement("button")
  update.className="btn btn-primary"
  update.type = "button"
  update.id = "positionUpdate"
  update.setAttribute("data-bs-dissmiss", "modal")
  update.textContent = "Update"
  update.addEventListener("click" , updatePosition)
  update.value=positionID
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

addPositionButtons.forEach((add,index) => {
  add.addEventListener("click", createAddPositionForm)}
)

updatePositionButtons.forEach((update,index) => {
  update.addEventListener("click", createUpdatePositionForm)}
)

