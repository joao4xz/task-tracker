(function(){
  let addButton = document.getElementById('Add');
  let addHelper = document.getElementById('add-helper');

  addButton.addEventListener('click', () => {
    let addHelperDisplayStyle = window.getComputedStyle(addHelper).display;
    if(addHelperDisplayStyle === 'none') {
      addHelper.style.display = 'flex';
    }
    else{
      addHelper.style.display = 'none';
    }
  });

  let removeCardButtons = document.querySelectorAll('.X-button');

  removeCardButtons.forEach( function(button){
    button.addEventListener('click', function(){
      let card = this.closest('.task-cards > div');

      card.remove();
    });
  });

  let confirmButton = document.getElementById('confirm');
  

  const cards = [];

  function addCard(title, description, deadline, status) {
    const card = {
      title: title,
      description: description,
      deadline: deadline,
      status: status
    };
    cards.push(card);
  }

  function renderCard() {
    // Create elements
    const card = document.createElement('div');
    const status = document.createElement('div');
    if(cards[cards.length-1].status === 'Completed'){
      card.classList.add('card', 'completed-card');
      status.classList.add('completed-status');
    }
    else{
      card.classList.add('card', 'not-completed-card');
      status.classList.add('not-completed-status');
    }


    const left = document.createElement('div');
    left.classList.add('left');

    const checkedImg = document.createElement('img');
    if(cards[cards.length-1].status === 'Completed'){
      checkedImg.src = 'image/accept.png';
    }
    else{
      checkedImg.src = 'image/delete.png';
    }
    checkedImg.alt = 'checked';
    checkedImg.classList.add('checked');

    const statusText = document.createElement('div');
    statusText.textContent = cards[cards.length-1].status;

    const right = document.createElement('div');
    right.classList.add('right');

    const xButton = document.createElement('button');
    xButton.classList.add('X-button');

    xButton.addEventListener('click', function(){
      let card = this.closest('.task-cards > div');
      card.remove();
    });

    const crossImg = document.createElement('img');
    crossImg.src = 'image/cross.png';
    crossImg.alt = 'cross';

    const taskName = document.createElement('div');
    taskName.classList.add('task-name');
    taskName.textContent = cards[cards.length-1].title;

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('description');
    taskDescription.textContent = cards[cards.length-1].description;

    const taskDeadline = document.createElement('div');
    taskDeadline.classList.add('deadline');

    const calendarImg = document.createElement('img');
    calendarImg.src = 'image/calendar.png';
    calendarImg.alt = 'calendar';

    const deadlineText = document.createElement('div');
    deadlineText.textContent = cards[cards.length-1].deadline;

    // Build the structure
    left.appendChild(checkedImg);
    left.appendChild(statusText);

    right.appendChild(xButton);
    xButton.appendChild(crossImg);

    status.appendChild(left);
    status.appendChild(right);

    taskDeadline.appendChild(calendarImg);
    taskDeadline.appendChild(deadlineText);

    card.appendChild(status);
    card.appendChild(taskName);
    card.appendChild(taskDescription);
    card.appendChild(taskDeadline);

    // Append the card to the container
    const container = document.querySelector('.task-cards');
    container.appendChild(card);
  }

  confirmButton.addEventListener('click', () => {
    const inputtitle = document.getElementById('input-title').value;
    const inputdescription = document.getElementById('input-description').value;
    const inputdeadline = document.getElementById('input-deadline').value;
    const inputstatus = document.getElementById('input-status').value;

    // Parse input deadline as Date object
    let deadlineDate = new Date(inputdeadline);

     // Adjust for time zone offset
    let timeZoneOffset = deadlineDate.getTimezoneOffset();
    deadlineDate.setMinutes(deadlineDate.getMinutes() + timeZoneOffset);

    // Format the date as "Month day, year"
    let formattedDeadline = deadlineDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    addCard(inputtitle, inputdescription, formattedDeadline, inputstatus);

    // console.log(inputtitle);
    // console.log(inputdescription);
    // console.log(formattedDeadline);
    // console.log(inputstatus);
    console.log(cards);

    renderCard();
  });
})();