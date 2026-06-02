// Data Siswa (Semua 17 Anak)
let students = [
    { nisn: "0137769529", nama: "MUHAMMAD JIDAN MAULUDIN", dob: "2013-01-23", math: "56.67 (Baik)", bi: "73.33 (Memadai)" },
    { nisn: "0137560841", nama: "SANIA ILMIYATUR ROSYIDA", dob: "2013-10-04", math: "63.33 (Baik)", bi: "76.67 (Baik)" },
    { nisn: "0134147957", nama: "RANDY ADI SAPUTRA", dob: "2013-03-05", math: "50.00 (Memadai)", bi: "70.00 (Memadai)" },
    { nisn: "0133288071", nama: "AISYAH DIAN IRAWATI", dob: "2013-09-09", math: "53.33 (Memadai)", bi: "70.00 (Memadai)" },
    { nisn: "0138549000", nama: "DEWI MAHARANI", dob: "2013-09-15", math: "46.67 (Memadai)", bi: "86.67 (Baik)" },
    { nisn: "0132000791", nama: "VERIN ANDINIA PUTRI", dob: "2013-03-03", math: "53.33 (Memadai)", bi: "80.00 (Baik)" },
    { nisn: "0133053634", nama: "AHMAD RAMADAN FAWZUL ADZIM", dob: "2013-08-04", math: "63.33 (Baik)", bi: "80.00 (Baik)" },
    { nisn: "0131075546", nama: "RAIHAN FABIANDRA", dob: "2013-06-06", math: "36.67 (Memadai)", bi: "50.00 (Memadai)" },
    { nisn: "0131072293", nama: "REVINA DEWI NURAINI", dob: "2013-07-01", math: "70.00 (Baik)", bi: "80.00 (Baik)" },
    { nisn: "0146823724", nama: "VINO HERMAWAN", dob: "2014-01-30", math: "46.67 (Memadai)", bi: "80.00 (Baik)" },
    { nisn: "0138059032", nama: "MUHAMMAD FADIL REVANO", dob: "2013-04-25", math: "43.33 (Memadai)", bi: "83.33 (Baik)" },
    { nisn: "3138984701", nama: "SITI QURBAY", dob: "2013-03-29", math: "46.67 (Memadai)", bi: "70.00 (Memadai)" },
    { nisn: "0143643010", nama: "MUHAMMAD RIZAL", dob: "2014-02-03", math: "40.00 (Memadai)", bi: "66.67 (Memadai)" },
    { nisn: "0139118087", nama: "DIANDRA PUTRA RAMADHANI", dob: "2013-07-15", math: "60.00 (Baik)", bi: "80.00 (Baik)" },
    { nisn: "3131264830", nama: "EZA ANUGERAH PRATAMA", dob: "2013-09-04", math: "53.33 (Memadai)", bi: "60.00 (Memadai)" },
    { nisn: "0133173094", nama: "SANDI ADI SAPUTRA", dob: "2013-09-04", math: "46.67 (Memadai)", bi: "76.67 (Baik)" },
    { nisn: "0141618058", nama: "AHMAD THORIQUL AFANDI", dob: "2014-02-17", math: "40.00 (Memadai)", bi: "50.00 (Memadai)" }
];

// Navigasi Section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// ====== LOGIKA LOGIN SISWA ======
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputNisn = document.getElementById('nisn').value;
    const inputDob = document.getElementById('dob').value;

    // Cari siswa
    const student = students.find(s => s.nisn === inputNisn && s.dob === inputDob);

    if (student) {
        startCountdown(student);
    } else {
        alert("Data tidak ditemukan. Pastikan NISN dan Tanggal Lahir sesuai.");
    }
});

// ====== LOGIKA COUNTDOWN & HASIL ======
function startCountdown(student) {
    showSection('countdown-section');
    let counter = 5;
    const countEl = document.getElementById('countdown-number');
    countEl.innerText = counter;

    const interval = setInterval(() => {
        counter--;
        if (counter > 0) {
            countEl.innerText = counter;
        } else {
            clearInterval(interval);
            showResult(student);
        }
    }, 1000);
}

function showResult(student) {
    showSection('result-section');
    document.getElementById('result-message').innerHTML = `SELAMAT <strong>${student.nama}</strong> DINYATAKAN LULUS DARI SD NEGERI 2 TEGALSARI`;
    document.getElementById('val-math').innerText = student.math;
    document.getElementById('val-bi').innerText = student.bi;
}

// ====== LOGIKA SHORTCUT ADMIN ======
let logoClickCount = 0;
let logoClickTimer;

function handleLogoClick() {
    logoClickCount++;
    clearTimeout(logoClickTimer);
    
    if (logoClickCount === 5) {
        document.getElementById('admin-modal').style.display = 'flex';
        logoClickCount = 0; // Reset
    } else {
        // Reset hitungan jika jeda klik lebih dari 1 detik
        logoClickTimer = setTimeout(() => {
            logoClickCount = 0;
        }, 1000);
    }
}

function closeAdminModal() {
    document.getElementById('admin-modal').style.display = 'none';
}

// ====== LOGIKA LOGIN ADMIN ======
function verifyAdmin() {
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;

    // Kredensial statis
    if (user === 'admin' && pass === 'admin123') {
        closeAdminModal();
        showSection('admin-section');
        renderAdminTable();
    } else {
        alert('Username atau Password salah!');
    }
}

// ====== LOGIKA DASHBOARD ADMIN ======
function renderAdminTable() {
    const tbody = document.getElementById('student-table-body');
    tbody.innerHTML = ''; // Kosongkan tabel

    students.forEach((s, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.nisn}</td>
            <td>${s.nama}</td>
            <td>${s.dob}</td>
            <td>${s.math}</td>
            <td>${s.bi}</td>
            <td><button class="btn-danger" style="padding:5px 10px; width:auto; margin:0;" onclick="deleteStudent(${index})">Hapus</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Tambah Siswa
document.getElementById('add-student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newStudent = {
        nisn: document.getElementById('add-nisn').value,
        nama: document.getElementById('add-nama').value.toUpperCase(),
        dob: document.getElementById('add-dob').value,
        math: document.getElementById('add-math').value,
        bi: document.getElementById('add-bi').value
    };
    
    students.push(newStudent);
    renderAdminTable();
    this.reset(); // Kosongkan form
});

// Hapus Siswa
function deleteStudent(index) {
    if (confirm('Yakin ingin menghapus data siswa ini?')) {
        students.splice(index, 1);
        renderAdminTable();
    }
}
