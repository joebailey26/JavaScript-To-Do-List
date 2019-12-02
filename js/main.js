//get localstorage todolist
var todoList = []

document.addEventListener("DOMContentLoaded", run);

function run() {
  let todos = localStorage.getItem('list');
  if (todos) {
    todoList = localStorage.getItem('list').split(',');
  }
  /**
   * List is defined within a function.
   * Such we cannot access it outside of the function
   * it was defined in. Therefore, we must pass
   * list to any function that needs to use it
   **/
  buildList();

  /***
   * Set up an event to listen that fires on enter being pressed
   */
  document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(e) {
  const newTodoItem = document.querySelector("#todoInput")
  if (newTodoItem.value != "" && e.key == "Enter") {
    todoList.push(newTodoItem.value);
    localStorage.setItem('list', todoList);
    newTodoItem.value = "";
    buildList();
  }
}

function handleCloseClick(e) {
  /**
   *  What is going on here?
   *  First explore what the data set is
   *  Next, look up array.slice (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
   */
  //Look at how you would use array filter
  todoList.splice(parseInt(e.target.dataset.outerItem), 1);
  const outer_item = document.querySelector(`#outer-item-${e.target.dataset.outerItem}`);
  outer_item.style.opacity = 0;
  setTimeout(() => {
    buildList();
  }, 1000);
}

function buildList() {

  //Put list in local storage
  /**
   * Reverse the list
   */

   todoList.reverse();

  /**
   * Here we grab a reference to our list
   */

  const listHtmlElm = document.querySelector(".list");

  /**
   * Below, I use the array.map method to iterate over our todo list
   * I pass an arrow function into map https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
   * Can you work out what's going on below? Why are we using map here and for...of below
   */
  let htmlList = todoList.map((item, id) => buildListItemTemplate(item, id)).join(' ');
  listHtmlElm.innerHTML = htmlList;



  /**
   * Below, I use the query selector to grab all of the close span tags by class and add a click
   * event listener
   */

  for(const element of document.querySelectorAll(".close")) {
    element.addEventListener("click", handleCloseClick)
  }
}

function buildListItemTemplate(listItem, id) {
  /**
   * observe how we are using a new javaScript
   * feature here, template literals (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
   * Template literals are incredibly useful and allow us to easily embed
   * vars in a string
   **/

  var btn = document.createElement("BUTTON");

  return `<div class="outer-item" id="outer-item-${id}" >
    <div class="to-do-item">
      <p> ${listItem} </p>
      <span class="close" data-outer-item="${id}" >  X </span>
    </div>
    <!-- /.to-do-item -->
  </div>
  <!-- /.outer-item -->`
}
