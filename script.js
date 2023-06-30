(function(){
  let addButton = document.getElementById('Add');
  let addHelper = document.getElementById('add-helper');

  let sortButton = document.getElementById('Sort');
  let sortHelper = document.getElementById('sort-helper');

  addButton.addEventListener('click', () => {
    let addHelperDisplayStyle = window.getComputedStyle(addHelper).display;
    if(addHelperDisplayStyle === 'none') {
      addHelper.style.display = 'flex';
      sortHelper.style.display = 'none';
    }
    else{
      addHelper.style.display = 'none';
    }
  });

  sortButton.addEventListener('click', () => {
    let sortHelperDisplayStyle = window.getComputedStyle(sortHelper).display;
    if(sortHelperDisplayStyle === 'none') {
      sortHelper.style.display = 'flex';
      addHelper.style.display = 'none';
    }
    else{
      sortHelper.style.display = 'none';
    }
  });

  let removeCardButtons = document.querySelectorAll('.X-button');

  removeCardButtons.forEach( function(button){
    button.addEventListener('click', function(){
      let card = this.closest('.task-cards > div');

      card.remove();
    });
  });

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

  function renderCard(i) {
    // Create elements
    const card = document.createElement('div');
    const status = document.createElement('div');
    if(cards[i].status === 'Completed'){
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
    if(cards[i].status === 'Completed'){
      checkedImg.src = 'image/accept.png';
    }
    else{
      checkedImg.src = 'image/delete.png';
    }
    checkedImg.alt = 'checked';
    checkedImg.classList.add('checked');

    const statusText = document.createElement('div');
    statusText.textContent = cards[i].status;

    const right = document.createElement('div');
    right.classList.add('right');

    const xButton = document.createElement('button');
    xButton.classList.add('X-button');

    xButton.addEventListener('click', function(){
      let card = this.closest('.task-cards > div');
      let index = cards.findIndex(c => c.title === card.querySelector('.task-name').textContent);
      if (index !== -1) {
        cards.splice(index, 1);
      }
      card.remove();
      console.log(cards);
    });

    const crossImg = document.createElement('img');
    crossImg.src = 'image/cross.png';
    crossImg.alt = 'cross';

    const taskName = document.createElement('div');
    taskName.classList.add('task-name');
    taskName.textContent = cards[i].title;

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('description');
    taskDescription.textContent = cards[i].description;

    const taskDeadline = document.createElement('div');
    taskDeadline.classList.add('deadline');

    const calendarImg = document.createElement('img');
    calendarImg.src = 'image/calendar.png';
    calendarImg.alt = 'calendar';

    const deadlineText = document.createElement('div');
    deadlineText.textContent = cards[i].deadline;

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
  let confirmButton = document.getElementById('confirm');

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

    //Check if the input title is repeated
    const isTitleRepeated = cards.some((card) => card.title === inputtitle);

    if(inputtitle !== "" && inputdescription !== "" && inputdeadline !== ""){
      if(isTitleRepeated) {
        alert("A task with the same title already exists.");
      }
      else {
        addCard(inputtitle, inputdescription, formattedDeadline, inputstatus);
        renderCard(cards.length-1);
        console.log(cards);
      }
    }
    else {
      alert("Please fill in all required fields.");
    }
  });

  let isDescendingOrder = false;

  function sortCardsByDeadline() {
    cards.sort((a, b) => {
      const deadlineDateA = new Date(a.deadline);
      const deadlineDateB = new Date(b.deadline);
      
      // Compare the deadline dates based on the sorting order state
      if (isDescendingOrder) {
        return deadlineDateB - deadlineDateA; // Sort in descending order
      } else {
        return deadlineDateA - deadlineDateB; // Sort in ascending order
      }
    });

    let parentDiv = document.querySelector('.task-cards');
    parentDiv.innerHTML = "";

    for(let i = 0; i<cards.length; i++){
      renderCard(i);
    }

    // Toggle the sorting order state for the next click
    isDescendingOrder = !isDescendingOrder;
  }

  let deadlineSort = document.getElementById('deadline-sort');

  deadlineSort.addEventListener('click', sortCardsByDeadline);

})();