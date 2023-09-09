// Fetch the list of doctors and populate the dropdown menu
fetch('http://localhost:1234/doctors')
    .then(response => response.json())
    .then(doctors => {
        const doctorSelect = document.getElementById('doctor');
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.text = `${doctor.firstname} ${doctor.lastname} - ${doctor.speciality}`;
            doctorSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching doctors:', error));

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const dateTimeString = `${date}T${time}`;
    const formattedDateTime = new Date(dateTimeString);

    const appointmentData = {
        date: formattedDateTime.toISOString().slice(0, 10), // Format as YYYY-MM-DD
        time: formattedDateTime.toTimeString().slice(0, 8), // Format as HH:mm:ss
        details: document.getElementById('details').value,
        observations: "No obs",
        type: "CONSULTATION",
        patient: {
            id: localStorage.getItem("patientId")
        },
        doctor: {
            id: document.getElementById('doctor').value // Get the selected doctor's ID
        }
    };

    fetch('http://localhost:1234/appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));

    location.href = "PatientMainPage.html";
});
