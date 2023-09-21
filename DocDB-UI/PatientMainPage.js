const table = document.getElementById("appointmentsTable");

fetch(`http://localhost:1234/patient?id=${localStorage.getItem("loggedInUserId")}`, {
    method: 'GET',
}).then(res => res.json()).then(data => {
    if (data.id > 0) {
        console.log(data)
        const welcomeTag = document.getElementById("welcome_tag");
        welcomeTag.innerHTML = `Welcome ${data.firstname} ${data.lastname}`;
        localStorage.setItem('patientId', data.id);
                
    } else {
        error_display_log_in.innerHTML = "Patient with given user Id does not exist.";
    }
});

fetch(`http://localhost:1234/patientDateSpecificAppointment?id=${localStorage.getItem('patientId')}`, {
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

        c1.innerText = element.date;
        c2.innerText = element.time;
        c3.innerText = element.doctor.firstname + " " + element.doctor.lastname;
        c4.innerText = element.type;
        c5.innerText = element.details;
        c6.innerText = element.status;

        const appointmentDate = new Date(element.date + 'T' + element.time);
        const now = new Date();
        // add this condition to the if bellow if needed "appointmentDate > now"
        if (element.status !== "COMPLETED" && element.status !== "CANCELED") {
            let c7 = row.insertCell(6);
            let button = document.createElement('button');
            button.innerText = 'Cancel or Reschedule';
            button.addEventListener('click', () => {
                window.location.href = `CancelOrReschedule.html?appointmentId=${element.id}`;
            });
            c7.appendChild(button);
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

document.getElementById('filterAppointments').addEventListener('click', function() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    
    if (fromDate && toDate) {
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        fetch(`http://localhost:1234/patientDateSpecificAppointment?id=${localStorage.getItem('patientId')}&fromDate=${fromDate}&toDate=${toDate}`, {
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
            
                c1.innerText = element.date;
                c2.innerText = element.time;
                c3.innerText = element.doctor.firstname + " " + element.doctor.lastname;
                c4.innerText = element.type;
                c5.innerText = element.details;
                c6.innerText = element.status;

                const appointmentDate = new Date(element.date + 'T' + element.time);
                const now = new Date();
                // add this condition to the if bellow if needed "appointmentDate > now"
                if (element.status !== "COMPLETED" && element.status !== "CANCELED") {
                    let c7 = row.insertCell(6);
                    let button = document.createElement('button');
                    button.innerText = 'Cancel or Reschedule';
                    button.addEventListener('click', () => {
                        window.location.href = `CancelOrReschedule.html?appointmentId=${element.id}`;
                    });
                    c7.appendChild(button);
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
    } else if (fromDate && !toDate){
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        fetch(`http://localhost:1234/patientDateSpecificAppointment?id=${localStorage.getItem('patientId')}&fromDate=${fromDate}`, {
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
            
                c1.innerText = element.date;
                c2.innerText = element.time;
                c3.innerText = element.doctor.firstname + " " + element.doctor.lastname;
                c4.innerText = element.type;
                c5.innerText = element.details;
                c6.innerText = element.status;

                const appointmentDate = new Date(element.date + 'T' + element.time);
                const now = new Date();
                // add this condition to the if bellow if needed "appointmentDate > now"
                if (element.status !== "COMPLETED" && element.status !== "CANCELED") {
                    let c7 = row.insertCell(6);
                    let button = document.createElement('button');
                    button.innerText = 'Cancel or Reschedule';
                    button.addEventListener('click', () => {
                        window.location.href = `CancelOrReschedule.html?appointmentId=${element.id}`;
                    });
                    c7.appendChild(button);
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
    } else if (!fromDate && toDate){
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        fetch(`http://localhost:1234/patientDateSpecificAppointment?id=${localStorage.getItem('patientId')}&toDate=${toDate}`, {
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
            
                c1.innerText = element.date;
                c2.innerText = element.time;
                c3.innerText = element.doctor.firstname + " " + element.doctor.lastname;
                c4.innerText = element.type;
                c5.innerText = element.details;
                c6.innerText = element.status;

                const appointmentDate = new Date(element.date + 'T' + element.time);
                const now = new Date();
                // add this condition to the if bellow if needed "appointmentDate > now"
                if (element.status !== "COMPLETED" && element.status !== "CANCELED") {
                    let c7 = row.insertCell(6);
                    let button = document.createElement('button');
                    button.innerText = 'Cancel or Reschedule';
                    button.addEventListener('click', () => {
                        window.location.href = `CancelOrReschedule.html?appointmentId=${element.id}`;
                    });
                    c7.appendChild(button);
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
    } else {
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        fetch(`http://localhost:1234/patientDateSpecificAppointment?id=${localStorage.getItem('patientId')}`, {
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
            
                c1.innerText = element.date;
                c2.innerText = element.time;
                c3.innerText = element.doctor.firstname + " " + element.doctor.lastname;
                c4.innerText = element.type;
                c5.innerText = element.details;
                c6.innerText = element.status;

                const appointmentDate = new Date(element.date + 'T' + element.time);
                const now = new Date();
                // add this condition to the if bellow if needed "appointmentDate > now"
                if (element.status !== "COMPLETED" && element.status !== "CANCELED") {
                    let c7 = row.insertCell(6);
                    let button = document.createElement('button');
                    button.innerText = 'Cancel or Reschedule';
                    button.addEventListener('click', () => {
                        window.location.href = `CancelOrReschedule.html?appointmentId=${element.id}`;
                    });
                    c7.appendChild(button);
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
    }
});

