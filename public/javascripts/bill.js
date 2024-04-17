const types = document.querySelectorAll('[id=type]');
const addBillButtons = document.querySelectorAll('[id=addBill]');

const chooseType = (event) => {
  const choose = event.target;
  const position = choose.getAttribute('data-whatever')
  const propertynames = choose.value.split(",");
  const inputGroup = document.getElementById(`billFormInputGroup`)
  console.log(inputGroup);
  const typeLabel = document.getElementById(`typeLabel`)
  const typeTrigger = document.getElementById(`typetrigger`)
  inputGroup.innerHTML = '';
  typeTrigger.value = choose.textContent;
  typeLabel.textContent = `${choose.textContent}`,
    propertynames.forEach((property) => {
      const inputDiv = document.createElement("div")
      inputDiv.className = "mb-3 text-start"
      const label = document.createElement("LABEL")
      label.htmlFor = `bill${property}AddInput`
      label.className = "form-label"
      label.textContent = property,
        inputGroup.append(label)
      const input = document.createElement("INPUT")
      input.setAttribute("type", "text")
      input.id = `bill${property}AddInput`
      input.className = "form-control text-bg-dark"
      inputDiv.append(label,input)
      inputGroup.append(inputDiv)
    })
}

const addBill = (event) => {
  const add = event.target
  const position = add.value
  const inputGroup = document.getElementById(`billFormInputGroup`)
  const typeTrigger = document.getElementById(`typetrigger`)
  const inputs = inputGroup.getElementsByTagName("input");
  const properties = [];
  const values = [];
  for (let i = 0; i < inputs.length; i++) {
    properties.push(inputs[i].id.replace('AddInput', '').substring(4))
    values.push(inputs[i].value)
  }
  const requestBody = {};
  requestBody['position'] = add.value
  requestBody['type'] = typeTrigger.value
  for (let i = 0; i < properties.length; i++) {
    requestBody[properties[i]] = values[i];
  }

  console.log(requestBody)

  fetch('/bill/add/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      window.location.reload()
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const handleTypeDropMenu = (event) => {
  const button = event.target;
  if(button.ariaExpanded=="false"){
    button.ariaExpanded = "true";
    button.classList.add("show")
    const list = button.parentNode.querySelectorAll("[id=dropmenu]")[0]
    console.log(list);
    list.style.cssText = "position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(16px, 49px); background-color: white; color: black; width:100px; border-radius: 10px;"
    list.setAttribute("data-popper-placement","bottom-start")
  } else {
    button.ariaExpanded = "false";
    const list = button.parentNode.querySelectorAll("[id=dropmenu]")[0]
    console.log(list);
    list.style.cssText = "position: absolute; visibility: hidden;"
  }
}

const createAddBillForm = (event) => {
  const positionID = event.target.value;
  const presentType = event.target.getAttribute('data-presenttype')
  const types = [];
  console.log(event.target.getAttribute(`data-type-${0}`))
  for(let i=0;;i++) {
    if (event.target.getAttribute(`data-type-${i}`) != undefined ) {
      console.log(event.target.getAttribute(`data-type-${i}`));
      types.push(event.target.getAttribute(`data-type-${i}`))
    }
    else
      break
  }
  const modal = document.createElement("div")
  modal.className = "modal fade"
  modal.id = "addbillform"
  modal.setAttribute("data-bs-backdrop", "static")
  modal.setAttribute("data-bs-keyboard", "false")
  modal.tabIndex = -1
  modal.setAttribute("aria-labelledby", "staticBackdropLabel")
  modal.ariaHidden = true
  modal.role = "dialog"
  modal.style.display = "block"
  const dialog = document.createElement("div")
  dialog.className = "modal-dialog text-bg-dark"
  const content = document.createElement("div")
  content.className = "modal-content text-bg-dark"
  const header = document.createElement("div")
  header.className = "modal-header text-bg-dark"
  const title = document.createElement("h1")
  title.className = "modal-title fs-5"
  title.id = "staticBackdropLabel"
  title.textContent = "Add bill"
  const close = document.createElement("button")
  close.className = "btn-close"
  close.addEventListener("click", () => modal.parentNode.removeChild(modal))
  close.ariaLabel = "Close"
  header.append(title, close)
  const body = document.createElement("div")
  body.className = "modal-body"
  const inputField = document.createElement("form")
  inputField.id = "billFormInputGroup"
  const type = document.createElement("div")
  type.className = "mb-3 text-start"
  const typeTrigger = document.createElement("button")
  typeTrigger.type = "button"
  typeTrigger.className = "btn btn-primary btn-sm"
  typeTrigger.value = presentType
  typeTrigger.ariaExpanded = "false"
  typeTrigger.textContent = "Type"
  typeTrigger.addEventListener("click" , handleTypeDropMenu)
  typeTrigger.id = "typetrigger"
  const typeList = document.createElement("div")
  typeList.id = "dropmenu"
  typeList.style.cssText = "position: absolute; visibility: hidden;"
  types.forEach((typeProperties, index) => {
    const typeItem = document.createElement("div")
    const typeButton = document.createElement("button")
    typeButton.type = "button"
    typeButton.className = "btn btn-primary btn-smc dropdown-item d-flex justify-content-center"
    typeButton.id = "type"
    typeButton.setAttribute("data-whatever", positionID)
    typeButton.value = typeProperties
    typeButton.textContent = index
    typeButton.addEventListener("click", chooseType)
    typeItem.append(typeButton)
    typeList.append(typeItem)
  })
  const para = document.createElement("p")
  para.textContent = "Current type:"
  const currentType = document.createElement("p")
  currentType.id = "typeLabel"
  currentType.textContent = presentType
  type.append(typeTrigger,typeList, para, currentType)
  if (types[presentType])
    types[presentType].split(",").forEach((property) => {
      const inputDiv = document.createElement("div")
      inputDiv.className = "mb-3 text-start"
      const label = document.createElement("LABEL")
      label.htmlFor = `bill${property}AddInput`
      label.className = "form-label"
      label.textContent = property
      const input = document.createElement("INPUT")
      input.setAttribute("type", "text")
      input.id = `bill${property}AddInput`
      input.className = "form-control text-bg-dark"
      inputDiv.append(label,input)
      inputField.append(inputDiv)
    })
  body.append(type,inputField)
  const footer = document.createElement("div")
  footer.className = "modal-footer"
  const add = document.createElement("button")
  add.className = "btn btn-primary"
  add.type = "button"
  add.id = "billAdd"
  add.setAttribute("data-bs-dissmiss", "modal")
  add.textContent = "Add"
  add.addEventListener("click", addBill)
  add.value = positionID
  const cancel = document.createElement("button")
  cancel.className = "btn btn-secondary"
  cancel.type = "button"
  cancel.setAttribute("data-bs-dissmiss", "modal")
  cancel.textContent = "Cancel"
  cancel.addEventListener("click", () => modal.parentNode.removeChild(modal))
  footer.append(add, cancel)
  content.append(header, body, footer)
  dialog.append(content)
  modal.append(dialog)
  modal.append(dialog)
  modal.classList.add("show")
  document.querySelector("[id=main]").append(modal)
}

addBillButtons.forEach((add,index) => {
  add.addEventListener("click", createAddBillForm)}
)
