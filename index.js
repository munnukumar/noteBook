
// Function to fetch total notebooks from database
let count = 0;
function fetchTotalNotebooks() {

    return count; // For example
}

// Function to fetch notebooks showing on screen
function fetchNotebooksShowing() {
    return document.querySelectorAll('.notebook').length;
}


function addNotebook() {
    const NotebookData = document.getElementById('notebookName').value;
    const description = document.getElementById('notebookDescription').value
    const notebook = { bookName: NotebookData, description: description };

    axios
        .post(
            "https://crudcrud.com/api/7ba30f5df86443a0a4af255f93a8536a/addNote",
            notebook
        )
        .then((response) => {
            getDataFromServer();
        })
        .catch((error) => console.log(error));
    updateNotebookList();
}

function getDataFromServer(){
    axios
    .get(
        "https://crudcrud.com/api/7ba30f5df86443a0a4af255f93a8536a/addNote")
    .then((response) => {
        updateNotebookList(response.data) 

    })
    .catch((error) => console.log(error));

}


function deleteNotebook(notebookId) {
    axios
    .delete(
        `https://crudcrud.com/api/7ba30f5df86443a0a4af255f93a8536a/${notebookId}`)
    .then((response) => {
        getDataFromServer();
         console.log("data deleted");
         count--;

    })
    .catch((error) => console.log(error));


    updateNotebookList();
}

// Function to update notebook list
function updateNotebookList(bookData) {
    var notebookList = document.getElementById('notebookList');
    notebookList.innerHTML = ''; 

    const totalbook = document.getElementById('totalNotebooks');
    console.log(totalbook)
    totalbook.innerText = count;

    // Update notebooks showing on screen
    document.getElementById('notebooksShowing').innerText = fetchNotebooksShowing();

    
    bookData.forEach((notebook)=>{
        var div = document.createElement('div');
        console.log(notebook)
        div.classList.add('notebook');
        div.innerHTML = `<span>${notebook.bookName} - ${notebook.description}</span> 
                                 <button onclick="deleteNotebook(${notebook.id})">Delete</button>`;
        notebookList.appendChild(div);
        count++;
    });

    console.log(count);
}

function filterNotebooks() {
    var filterValue = document.getElementById('filterByName').value.toLowerCase();
    var notebooks = document.querySelectorAll('.notebook');

    notebooks.forEach(function(notebook) {
        var notebookName = notebook.querySelector('span').textContent.toLowerCase();
        if (notebookName.includes(filterValue)) {
            notebook.style.display = 'block';
        } else {
            notebook.style.display = 'none';
        }
    });
}

// Initial update of notebook list
updateNotebookList();
