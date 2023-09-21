document.addEventListener('DOMContentLoaded', function() {
    const cancelButton = document.getElementById('cancelButton');
    const rescheduleButton = document.getElementById('rescheduleButton');
    const newDateInput = document.getElementById('newDate');
    const newTimeInput = document.getElementById('newTime');

    const urlParams = new URLSearchParams(window.location.search);
    const appointmentId = urlParams.get('appointmentId');

    cancelButton.addEventListener('click', function() {
        fetch(`http://localhost:1234/cancelAppointment?id=${appointmentId}`, {
            method: 'PUT',
        }).then(res => {
            console.log("Appointment canceled successfully!");
            window.location.href = 'PatientMainPage.html';
        }).catch(error => {
            console.error('Error:', error);
        });
    });

    rescheduleButton.addEventListener('click', function() {
        const newDate = newDateInput.value;
        var newTime = newTimeInput.value;

        fetch(`http://localhost:1234/rescheduleAppointment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": appointmentId,
                "date": newDate,
                "time": newTime + ':00'
            })
        }).then(res => {
            console.log("Appointment rescheduled successfully!");
            window.location.href = 'PatientMainPage.html';
        }).catch(error => {
            console.error('Error:', error);
        });
    });
});
