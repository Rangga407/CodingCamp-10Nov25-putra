console.log("Script loaded successfully."); // Debugging statement

let todoList = [];
let statusFilter = false;

// Tambah todo baru
function addTodo() {
    const todoAktivitas = document.getElementById('todo-masukkan');
    const todoTanggal = document.getElementById('todo-tanggal');

    // Validasi input
    if (todoAktivitas.value === "" || todoTanggal.value === ""){
        alert("Mohon isi semua bagian form aktivitas dan tanggal!");
    } else {
        todoList.push({
            aktivitas: todoAktivitas.value,
            tanggal: todoTanggal.value,
            pending: true
        });
        todoAktivitas.value = "";
        todoTanggal.value = "";
        renderTodoList();
    }
}

// Render daftar todo ke dalam tabel
function renderTodoList() {
    const daftarTodoSection = document.getElementById('tbody-todo');
    daftarTodoSection.innerHTML = "";
    if (todoList.length === 0) {
        daftarTodoSection.innerHTML = '<tr><td colspan="4">Tidak ada aktivitas yang ditemukan</td></tr>';
    } else {
        todoList.forEach((todo, index) => {

        const newRow = daftarTodoSection.insertRow();

        newRow.innerHTML = `
            <td>${todo.aktivitas}</td>
            <td>${todo.tanggal}</td>
            <td>${todo.pending ? "Pending" : "Done"}</td> 
            <td>
                ${todo.pending ? '<button onclick="markAsDone(' + index + ')" class = "button-done-table">Done</button>' : ""}
                <button onclick="deleteTodo(${index})" class = "button-delete-table">Delete</button>
            </td>
        `;
        });
    }
}

// Hapus semua todo
function clearAllTodo() {
    // Validasi jika tidak ada aktivitas yang dapat dihapus
    if (todoList.length === 0){
        alert("Tidak ada aktivitas yang dapat dihapus!");
    } else {
        todoList = [];
        renderTodoList();
    }
}

// Filter todo berdasarkan tanggal (Ascending/Descending)
function filterDateTodo() {
    // Implementasi filter berdasarkan tanggal
    i = 0;
    while (i < todoList.length-1) {
        target = i;
        idx = i+1;
        while (idx < todoList.length) {
            if (statusFilter && (todoList[idx].tanggal > todoList[target].tanggal)) {
                target = idx;
            } else if (!statusFilter && (todoList[idx].tanggal < todoList[target].tanggal)) {
                target = idx;
            } 
            idx++;
        }
        if (target !== i) {
            let temp = todoList[i]
            todoList[i] = todoList[target];
            todoList[target] = temp;
        }
        i++;
    }
    statusFilter = !statusFilter;
    renderTodoList();
}

// Selesai kegiatan todo di kolom action
function markAsDone(index) {
    todoList[index].pending = false;
    renderTodoList();
}

// Hapus todo di kolom action
function deleteTodo(index) {
    todoList.splice(index, 1);
    renderTodoList();
}