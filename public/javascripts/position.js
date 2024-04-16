const positionAdds = document.querySelectorAll('[id=positionAdd]');
const positionUpdates = document.querySelectorAll('[id=positionUpdate]');

const addPosition = () => {
  const add = event.target
  const name = document.getElementById(`positionNameAddInput${add.value}`).value;
  const size = document.getElementById(`positionSizeAddInput${add.value}`).value;
  const platform = document.getElementById(`positionPlatformAddInput${add.value}`).value;
  const demonames = document.getElementById(`positionDemoNamesAddInput${add.value}`).value.split("\n");
  const demolinks = document.getElementById(`positionDemoLinksAddInput${add.value}`).value.split("\n");
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
  const name = document.getElementById(`positionNameUpdateInput${update.value}`).value;
  const size = document.getElementById(`positionSizeUpdateInput${update.value}`).value;
  const platform = document.getElementById(`positionPlatformUpdateInput${update.value}`).value;
  const demonames = document.getElementById(`positionDemoNamesUpdateInput${update.value}`).value.split("\n");
  const demolinks = document.getElementById(`positionDemoLinksUpdateInput${update.value}`).value.split("\n");
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

positionAdds.forEach((add,index) => {
  add.addEventListener("click", addPosition)}
)

positionUpdates.forEach((update,index) => {
  update.addEventListener("click", updatePosition)}
)

