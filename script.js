// Hardcoded default students data so table isn't empty
const initialStudents = [
    {
        id: 1,
        name: 'John Doe',
        grade: 100,
    },
    {
        id: 2,
        name: 'Jane Doe',
        grade: 99,
    },
    {
        id: 3,
        name: 'Jim Doe',
        grade: 98,
    },
    {
        id: 4,
        name: 'Jill Doe',
        grade: 85,
    },
    {
        id: 5,
        name: 'Jack Doe',
        grade: 75,
    },
]

const students = JSON.parse(localStorage.getItem('students'));

// If there is no students data in localStorage, set the initial students data
if (!students || students.length === 0) {
    localStorage.setItem('students', JSON.stringify(initialStudents));
}

// no need for else because if there is students data in localStorage, we don't need to set the initial students data

const studentForm = document.getElementById('student-form');

// Form event listener to add a student
studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(studentForm);
    const values = Object.fromEntries(data.entries());
    const students = JSON.parse(localStorage.getItem('students'));
    let name = values.name;
    let grade = Number(values.grade);

    // add validations for name and grade
    if (!name || !grade) {
        alert('Please fill in all fields');
        return;
    }

    if (name.length < 2) {
        alert('Name must be at least 2 characters long');
        return;
    }

    if (typeof grade !== 'number' || grade < 0 || grade > 100) {
        alert('Grade must be a number between 0 and 100');
        return;
    }

    // check if the student already exists
    const existingStudent = students.find(student => student.name === name);
    if (existingStudent) {
        alert('Student already exists');
        return;
    }

    const lastStudentId = students[students.length - 1].id;

    students.push({ id: lastStudentId + 1, name, grade });
    localStorage.setItem('students', JSON.stringify(students));

    studentForm.reset();
    renderStudentsTable();
});

// Calculate average grade
const calculateAverageGrade = () => {
    const students = JSON.parse(localStorage.getItem('students'));
    const averageGrade = students.reduce((sum, student) => sum + Number(student.grade), 0) / students.length;
    document.getElementById('average-grade-value').textContent = isNaN(averageGrade) ? 0 : averageGrade.toFixed(2);
}

// Delete student function
const deleteStudent = (id) => {
    const students = JSON.parse(localStorage.getItem('students'));
    const filteredStudents = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(filteredStudents));
    renderStudentsTable();
}

// Render the students table
const renderStudentsTable = () => {
    const students = JSON.parse(localStorage.getItem('students'));
    const studentTableBody = document.getElementById('student-table-body');

    // Calculate average grade
    calculateAverageGrade();

    // Clear previously rendered data rows
    while (studentTableBody.rows.length > 0) {
        studentTableBody.deleteRow(0);
    }

    students.forEach(student => {
        const row = studentTableBody.insertRow();
        row.insertCell().textContent = student.id;
        row.insertCell().textContent = student.name;
        row.insertCell().textContent = student.grade;
        row.insertCell().innerHTML = `<button class="delete-button" onclick="deleteStudent(${student.id})">Delete</button>`;
    });
}


renderStudentsTable();
