//  const form = document.getElementById("studentForm");
// const output = document.getElementById("output");

//  let students = [];


//  function getSelectedGender() {
//      const gender = document.querySelector("input[name='gender']:checked")?.value;
//    
//  }

//  function validateForm(name, age, email, subjects, gender) {
//    return name && !isNaN(age) && age > 0 && email && subjects.length > 0 && gender;
//  }

// function displayStudents() {
//    output.innerHTML = students.map((student, index) => `

//     Student ${index + 1}<br>
//   Name: ${student.name}<br>
//      Age: ${student.age}<br>
//            Email: ${student.email}<br>
//      Subjects: ${student.subjects.join(", ")}<br>
//       Gender: ${student.gender}
//  }

 
function displayData(event) {                                                    //stop refresh
    event.preventDefault();
    const fullname = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;


    console.log(fullname);
    console.log(age);
    console.log(email);
    

    if (!fullname || !age || !email) {
      alert("Please fill all the fields")
    };

document.getElementById('output').innerHTML = 
  `<h1>students </h1> 
  <p>Name:  <b>${fullname}</b><br>
    Age:  <b>${age}</b><br>
      Email:  <b>${email}</b><br>
  </p>`;
}  

function ClearEntries() {
  document.getElementById("StudentForm").reset;
};




//     let name = document.getElementById("txtName").value;
//     alert("please fill out fields correctly")
//     document.getElementById("display-container").innerHTML = `<h1>
   
