const types = document.querySelectorAll('[id=type]');
const billAdds = document.querySelectorAll('[id=billAdd]');

console.log(document);

const chooseType = (event) => {
  const choose = event.target;
  const position = choose.getAttribute('data-whatever')
  const propertynames = choose.value.split(",");
  const inputGroup = document.querySelector(`[id=billFormInputGroup${position}]`)
  console.log(choose.value);
  const typeLabel = document.querySelector(`[id=typeLabel${position}]`)
  const typeTrigger = document.querySelector(`[id=typetrigger${position}]`)
  inputGroup.innerHTML = '';
  typeTrigger.value = choose.textContent;
  typeLabel.textContent = `${choose.textContent}`,
    propertynames.forEach((property) => {
      var label = document.createElement("LABEL")
      label.htmlFor = `bill${property}AddInput`
      label.className = "form-label"
      label.textContent = property,
        inputGroup.append(label)
      var input = document.createElement("INPUT")
      input.setAttribute("type", "text")
      input.id = `bill${property}AddInput`
      input.className = "form-control text-bg-dark"
      inputGroup.append(input) 
    })
}

const addBill = () => {
  const add = event.target
  const position = add.value
  const inputGroup = document.querySelector(`[id=billFormInputGroup${position}]`)
  const typeTrigger = document.querySelector(`[id=typetrigger${position}]`)
  console.log(inputGroup);
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

types.forEach((type, index) => {
  type.addEventListener("click", chooseType)
}
)

billAdds.forEach((add, index) => {
  add.addEventListener("click", addBill)
}
)

