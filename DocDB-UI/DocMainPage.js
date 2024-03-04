const table = document.getElementById("appointmentsTable");

fetch(`http://localhost:1234/doctor?id=${localStorage.getItem("loggedInUserId")}`, {
    method: 'GET',
}).then(res => res.json()).then(data => {
    if (data.id > 0) {
        console.log(data)
        const welcomeTag = document.getElementById("welcome_tag");
        welcomeTag.innerHTML = `Welcome ${data.firstname} ${data.lastname}`;
        localStorage.setItem('doctorId', data.id);
                
    } else {
    error_display_log_in.innerHTML = "Doctor with given user Id does not exist.";
    }
});

fetch(`http://localhost:1234/docAppointmentsDescOrdered?id=${localStorage.getItem('doctorId')}`, {
  method: 'GET',
})
.then(res => res.json())
.then(data => {
  console.log(data);
  const appointmentsTable = document.getElementById('appointmentsTable');
  data.forEach(element => {
    console.log(element);
    let row = table.insertRow(-1);
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    let c6 = row.insertCell(5);
    let c7 = row.insertCell(6);

    c1.innerText = element.date;
    c2.innerText = element.time;
    c3.innerText = element.patient.firstname + " " + element.patient.lastname;
    c4.innerText = element.type;
    c5.innerText = element.details;
    c6.innerText = element.status;

    if (element.status === "PENDING") {
      let createObservationButton = document.createElement("button");
      createObservationButton.innerText = "Create Observation";
      createObservationButton.addEventListener("click", function() {
        window.location.href = "CreateObservation.html?id=" + element.id;
      });

      let cancelAppointmentButton = document.createElement("button");
      cancelAppointmentButton.innerText = "Cancel Appointment";
      cancelAppointmentButton.addEventListener("click", function() {
        fetch(`http://localhost:1234/cancelAppointment?id=${element.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          location.reload();
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });

      c7.appendChild(createObservationButton);
      c7.appendChild(cancelAppointmentButton);
    } else if (element.status === "COMPLETED") { 
      let c7 = row.insertCell(6);

      let viewObservationsButton = document.createElement('button');
      viewObservationsButton.innerText = 'View Observations';
      viewObservationsButton.addEventListener('click', () => {
          // Open a pop-up with observations
          const observationPopup = window.open('', '_blank', 'width=400,height=400');
          
          // Display observations
          observationPopup.document.write(`
              <h2>Observations for Appointment ID ${element.id}</h2>
              <p><strong>Diagnosis:</strong> ${element.observation.diagnosis}</p>
              <p><strong>Applied Procedure:</strong> ${element.observation.appliedProcedure}</p>
              <p><strong>Recommendation:</strong> ${element.observation.recommendation}</p>
              <p><strong>Treatment:</strong> ${element.observation.treatment}</p>
              <p><strong>Referral:</strong> ${element.observation.referral}</p>
          `);
      });
      c7.appendChild(viewObservationsButton);
  }
    
  });
});


