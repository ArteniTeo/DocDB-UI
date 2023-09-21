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

    c1.innerText = element.date;
    c2.innerText = element.time;
    c3.innerText = element.patient.firstname + " " + element.patient.lastname;
    c4.innerText = element.type;
    c5.innerText = element.details;
    c6.innerText = element.status;
    
  });
});


