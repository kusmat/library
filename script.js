
// declaring variables
const myLibrary = [];

//using for the editing function only.
let edit = false;
let element = "";

addBookToLibrary();
displayBooks();


/************ FUNCTIONS TO ADD BOOKS AND DISPLAY ON THE PAGE ******************/

//Book bunction to add books to the library

function Book(title, author, pages, read, name, visible) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.name = name;
    this.visible = visible;
    let read_sentence = "";

    if (read == true) {

        read_sentence = " is a great book!";
    }
    else {

        read_sentence = " is said to be a great book and I need to read it.";

    }

    this.info = function () {
        return "Book " + title + ", written by " + author + read_sentence;
    }
}


//Adding few books to the library.
function addBookToLibrary() {
    const book1 = new Book("The Hobbit: Or There and Back Again", "J.R.R. Tolkien", 320, false, "0",true);
    const book2 = new Book("Harry Potter 1 and the Philosopher's Stone", "J.K. Rowling", 368, true, "1", true);
    
    myLibrary.push(book1);
    myLibrary.push(book2);
    
}

//Function used to remove book elements from the display before repopulating new list.
//https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



function countBooksAndUpdateDisplay(){

    let count = 0;
    let read = 0;
    let pages = 0;    
    
    for (let book of myLibrary){

        if (book.visible == true){
            count++;
            pages+= Number(book.pages);
            console.log(pages);

            if (book.read == true){
                read++;
            }
        }
        

    }

    document.querySelector(".book_summary :nth-child(1)").innerHTML = 'Number of books: ' + count;
    document.querySelector(".book_summary :nth-child(3)").innerHTML = 'Number of books read: ' + read;
    document.querySelector(".book_summary :nth-child(5)").innerHTML = 'Number of pages: ' + pages;
    console.log(pages);
    

}


//Function to display books: First removes them using removeAllChildNodes and then add new ones in the loop.
function displayBooks() {

    //counting all books and displaying summary on the top of the page.
    countBooksAndUpdateDisplay()
    console.log(myLibrary);

    //removing all content before adding new books again to display
    const container = document.querySelector('.main');
    removeAllChildNodes(container);

    //Counter will be used to ensure each book has new class name
    let i = 0;

    //this filter function is run for each book separately
    myLibrary.filter((book) => {

            // Using function addToDomByClass to allow for easy addition of dom elements.
            addToDomByClass('main', 'book_card', 'div', 'book_card_'+i);
            addToDomByClass('book_card', 'book_details', 'div');
            addToDomByClass('book_details', 'book_title_' + i, 'h3');
            addToDomByClass('book_details', 'book_title_out_' + i, 'h4');
            addToDomByClass('book_details', 'class', 'br');
            addToDomByClass('book_details', 'book_author_' + i, 'h3');
            addToDomByClass('book_details', 'book_author_out_' + i, 'h4');
            addToDomByClass('book_details', 'class', 'br');
            addToDomByClass('book_details', 'book_pages_' + i, 'h3');
            addToDomByClass('book_details', 'book_pages_out_' + i, 'h4');
            addToDomByClass('book_details', 'class', 'br');
            addToDomByClass('book_details', 'read_' + i, 'label');
            addToDomByClass('book_details', 'read_out_' + i, 'input');
            addToDomByClass('book_card', 'card_button', 'button', 'edit_book_' + i);
            addToDomByClass('book_card', 'card_button', 'button', 'remove_book_' + i);

        //VARIABLES//

        //Buttons*****************/
        
        //edit button
        let edit_button = document.querySelector(`#edit_book_${i}`);
        
        edit_button.innerHTML = "EDIT";

        edit_button.setAttribute("name", i);

        edit_button.setAttribute("onclick", `edit_book(${i})`);
    
        // //delete button
        let delete_button = document.querySelector(`#remove_book_${i}`);

        delete_button.innerHTML = "REMOVE";

        delete_button.setAttribute("name", i);
        
        delete_button.setAttribute("onclick", `remove_book(${i})`);

        //book card visibility
        let book_card = document.querySelector(`#book_card_${i}`);

        //Checks for parameter "visible" in the library.
        if (book.visible ==false){
            book_card.setAttribute("id", "hidden");
        }

        //label for read book
        let lbl = document.querySelector('.read_' + i);
        lbl.innerHTML = "Read ";

        //checkbox for read book
        let inpt = document.querySelector('.read_out_' + i);
        inpt.type = 'checkbox';
        inpt.disabled = true;

        if (book.read) {
            inpt.checked = true;
        }

        //book information filll in with the titles.

        let title = document.querySelector('.book_title' + "_" + i);

        let title2 = document.querySelector('.book_title_out' + "_" + i);
        title2.innerHTML = book.title;

        title.innerHTML = "Title: ";

        let author = document.querySelector('.book_author' + "_" + i);
        author.innerHTML = "Author: ";

        let author2 = document.querySelector('.book_author_out' + "_" + i);
        author2.innerHTML = book.author;

        let pages = document.querySelector('.book_pages' + "_" + i);
        pages.innerHTML = "Pages: ";
        
        let pages2 = document.querySelector('.book_pages_out' + "_" + i);
        pages2.innerHTML = book.pages;

        //Next book.
        i++;
    }        
    )
}


//Function (helper) to add elements to the dom, with a loop.
function addToDomByClass(class_name_parent, class_name_child, new_element, id_name_child) {

    // making it easy to add new elements to the dom

    const parent = document.querySelectorAll("." + class_name_parent);
    const child = document.createElement(new_element);


    for (let parnt of parent) {
        child.classList.add(class_name_child);
        if (id_name_child != null) {
            child.setAttribute('id', id_name_child);
        }
        parnt.appendChild(child);
    }
}

function edit_book(name) {

    openForm()
    edit = true;

    //reading elements for edit
    document.getElementById("title").value = myLibrary[name].title;
    document.getElementById("author").value = myLibrary[name].author;
    document.getElementById("pages").value = myLibrary[name].pages;
    document.getElementById("read").checked =myLibrary[name].read;

    //saving elements after changes done by add_book() function after clicking save_button.

    element = name;

    
}

/************ FUNCTIONS TO MANIPULATE BOOKS ******************/

function clear_forms(){
    
    //Clearning all input fields
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
}
//
function add_book(event) {

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    //adding new book if all fields are filled out.
    if (title.length !== 0 && author.length !== 0 && pages.length !== 0) {

        if (edit == false){
        
        myLibrary.push(new Book(title, author, pages, read, myLibrary.length, true));

        console.log(myLibrary.length);

        clear_forms();

        }
        else{
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const pages = document.getElementById("pages").value;
            const read = document.getElementById("read").checked;
        
            console.log(element);
            myLibrary[element].title = title; 
            myLibrary[element].author = author;
            myLibrary[element].pages = pages;
            myLibrary[element].read = read;
        };
        //Closing form
        closeForm();
        //recreating list of books
        displayBooks();

        //preventing submission.
        event.preventDefault();

    }
    else {
        alert("Enter all required information");        
    }


}

//
function remove_book(name) {

    const book_title = document.querySelector(`#book_card_${name}`).title;

    if (confirm(`Book ${book_title} will be removed. Confirm by clicking OK.`)) {

        // document.querySelector(`#book_card_${name}`).setAttribute("id", "hidden"); //removed, not required as displayBooks() checks for visibility.
        myLibrary[Number(name)].visible = false;
        
    } else {
        //no action, just cancel.
    }
    
    displayBooks();
}

//Pop up entry form for books********************/

//Additional buttons on the entry form.

//variables
const close_button = document.querySelector("#close_window");
close_button.addEventListener("click", close, true)

const save_button = document.querySelector("#add_book");
save_button.addEventListener("click", add_book, true)


const x_button = document.querySelector("#close");
x_button.addEventListener("click", close, true)

//Function to open the pop up window to add elements to the library
function openForm() {

    edit = false;
    
    const pop_up_window = document.getElementById("pop_up_window");
    pop_up_window.style.display = "block";

    // const pop_up_form = document.getElementById("pop_up_form");

    window.onclick = function (event) {
        if (event.target == pop_up_window) {
            pop_up_window.style.display = "none";
        }
    }
}

//Function to close the pop up window to add elements to the library
function closeForm() {
    document.getElementById("pop_up_window").style.display = "none";
    
    //returning to default values
    edit = false;
    element = "";
    clear_forms();

}

//Function to close the pop up window to add elements to the library - with event.preventDefault.
function close(event) {
    document.getElementById("pop_up_window").style.display = "none";

    //returning to default values
    edit = false;
    element = "";
    clear_forms();

    event.preventDefault();
    
}

