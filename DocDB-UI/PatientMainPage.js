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

fetch(`http://localhost:1234/PatientFutureAppointments?id=${localStorage.getItem('patientId')}`, {
  method: 'GET',
})
.then(res => res.json())
.then(data => {
  console.log(data);
  const appointmentsTable = document.getElementById('appointmentsTable');
  data.forEach(element => {
    console.log(element);
      // Create a row using the inserRow() method and
      // specify the index where you want to add the row
      let row = table.insertRow(-1); // We are adding at the end
   
      // Create table cells
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);
   
      // Add data to c1 and c2
      c1.innerText = element.date;
      c2.innerText = element.doctor.firstname + " " + element.doctor.lastname;
      c3.innerText = element.type;
      c4.innerText = element.details;
    
  });
});

