var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function loadTodos() {
  $.ajax({
    url: 'http://localhost:3000/todos',
    // url: 'https://examen-final-web-817562.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)
      let newHTML = ''

      for( let i = 0; i < data.length; i++) {
        console.log(data[i].description)
        addTodo(data[i]._id, data[i].description, data[i].completed)
        
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'http://localhost:3000/todos',
      // url: 'https://examen-final-web-817562.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        addTodo(data._id, data.description, data.completed)
        
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})


function addTodo(id, todoText, completed) {
  newHTML = `
        <li><input type="checkbox" name="todo" value="
        ${id}
        "`
        if (completed) {
          newHTML += ` checked`
        }
        newHTML += `><span>
            ${todoText}
        </span></li>
        `
  
    $('#todo-list').append(newHTML)
}

$('#logout_button').on('click', function(){
  localStorage.removeItem('token')
  window.location = './index.html'
})