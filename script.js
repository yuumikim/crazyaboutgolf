// script.js

// Element references
const participantNameInput = document.getElementById('participantName');
const addParticipantButton = document.getElementById('addParticipantButton');
const participantList = document.getElementById('participantList');
const fineTableBody = document.querySelector('#fineTable tbody');
const personSummary = document.getElementById('personSummary');
const totalAmountSpan = document.getElementById('totalAmount');

// State variables
let participants = [];
let fines = {};

// Function to add a new participant
function addParticipant() {
    const name = participantNameInput.value.trim();
    
    // Validate input
    if (!name) {
        alert('이름을 입력하세요.');
        return;
    }

    if (participants.includes(name)) {
        alert('이미 등록된 참여자입니다.');
        return;
    }

    // Add participant to the list
    participants.push(name);
    fines[name] = [];  // Initialize fine list for this participant
    updateParticipantList();
    participantNameInput.value = ''; // Clear input field
}

// Function to update the participant list display
function updateParticipantList() {
    participantList.innerHTML = '';

    participants.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;

        // Add buttons for different penalties
        li.appendChild(createPenaltyButton(name, 'Bunker', 1000));
        li.appendChild(createPenaltyButton(name, 'Hazard', 1000));
        li.appendChild(createPenaltyButton(name, 'OB', 1000));
        li.appendChild(createPenaltyButton(name, 'Off Green', 1000));

        participantList.appendChild(li);
    });
}

// Function to create a penalty button
function createPenaltyButton(name, penaltyType, amount) {
    const button = document.createElement('button');
    button.textContent = penaltyType;
    button.addEventListener('click', () => addPenalty(name, penaltyType, amount));
    return button;
}

// Function to add a penalty fine
function addPenalty(name, penaltyType, amount) {
    fines[name].push({ situation: penaltyType, amount });
    updateFineTable();
    updateSummary();
}

// Function to update the fine table display
function updateFineTable() {
    fineTableBody.innerHTML = '';

    // Loop through each participant and their fines
    participants.forEach(name => {
        if (fines[name].length > 0) {
            // Create a header row for the participant
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `<th colspan="3">${name}</th>`;
            fineTableBody.appendChild(headerRow);

            // Add each fine as a row under the participant
            fines[name].forEach(({ situation, amount }) => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${name}</td><td>${situation}</td><td>${amount}원</td>`;
                fineTableBody.appendChild(row);
            });
        }
    });
}

// Function to update the summary display
function updateSummary() {
    personSummary.innerHTML = '';
    let totalAmount = 0;

    // Calculate and display fines for each participant
    participants.forEach(name => {
        const totalForPerson = fines[name].reduce((sum, fine) => sum + fine.amount, 0);
        if (totalForPerson > 0) {
            const div = document.createElement('div');
            div.textContent = `${name}: ${totalForPerson}원`;
            personSummary.appendChild(div);
            totalAmount += totalForPerson;
        }
    });

    // Display the total amount across all participants
    totalAmountSpan.textContent = totalAmount;
}

// Event listener for adding participants via button click
addParticipantButton.addEventListener('click', addParticipant);

// Event listener for adding participants via Enter key
participantNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addParticipant();
    }
});

// Prompt confirmation before refreshing the page
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '페이지를 새로고침하면 모든 데이터가 초기화됩니다. 계속하시겠습니까?';
});
