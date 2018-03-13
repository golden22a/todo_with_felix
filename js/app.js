var content;
var todos=[];
$(document).ready(function(){
content=$('.content');
$.ajax({
  url:'http://super-crud.herokuapp.com/api/todos',
  method:'get',
  success:function(json){
    todos=json.todos;
    content.append(json.todos.sort(sortByPriority).map(displayTodo));

  },
  error:function(err){
    console.log(err)
  }
});

content.on('click','.view',function(){
  let id=$(this).attr('todo-id');
  todoOne(id);
});
content.on('click','.back',function(){
  init();
});
content.on('click','.edit',function(){
  let id=$(this).attr('todo-id');
  editOne(id);
});
content.on('submit','#edit',function(e){
  e.preventDefault();
  editTodo($(this).serialize(),$('input[name=_id]').val());
});
content.on('click','.delete',function(e){
  let id=$(this).attr('todo-id');
  deleteTodo(id);
});
$('#add').on('submit',function(e){
  e.preventDefault();
  var data=$(this).serialize();
  addTodo(data);
});
});
function displayTodo(todo){
  if(!todo.completed){
  return `<hr><div class="col-10"><p style="color:hsl(187, 100%, ${10-parseInt(todo.priority)}0%)">${todo.body} </p></div><div class="col-2"><button class='bt bt-blue view' todo-id="${todo._id}" >View</button> <button class='bt bt-orange edit' todo-id="${todo._id}"  >Edit</button><button class='bt bt-red delete' todo-id="${todo._id}">Delte</button></div>`;
}
}
function sortByPriority(a,b) {
  return b.priority-a.priority

}
function todoOne(id){
  $.ajax({
    url:`http://super-crud.herokuapp.com/api/todos/${id}`,
    method:'get',
    success:function(json){
      content.hide(1000,function(){
        content.empty();


      content.append(displayOneTodo(json));
      content.show(100);});
    }

  });
}
function displayOneTodo(todo){
  if(!todo.completed){
  return `<hr><div class="col-10"><p style="color:hsl(187, 100%, ${10-parseInt(todo.priority)}0%)">${todo.body} </p></div><div class="col-2"><button class='bt bt-grey back' >Back</button> <button class='bt bt-orange edit' todo-id="${todo._id}"  >Edit</button><button class='bt bt-red delete' todo-id="${todo._id}">Delte</button></div>`;
}
}
function init(){
  $.ajax({
    url:'http://super-crud.herokuapp.com/api/todos',
    method:'get',
    success:function(json){
      todos=json.todos;
      content.hide(1000,function(){
        content.empty();


      content.append(json.todos.sort(sortByPriority).map(displayTodo));
      content.show(100);
    });
  },

    error:function(err){
      console.log(err)
    }});
  }
function editOne(id){
  console.log(todos);
  var i=todos.map(el => el._id).indexOf(id);
  console.log(i);
  content.hide(1000,function(){
    content.empty();
  content.append(`
    <div class='col-10'>
    <form id='edit'>
    <input type='text' name='body' value="${todos[i].body}">
    <input type='text' name='priority' value="${todos[i].priority}">
    <input type='text' name='completed' value="${todos[i].completed}">
    <input type='hidden' name='_id' value="${todos[i]._id}">
    <input type='submit' value='submit'>
    </form>
    <button class='bt bt-grey back' >Back</button>
    </div>
    `);
  content.show(100);
});
  }
  function editTodo(data,id){

    $.ajax({
      url:`http://super-crud.herokuapp.com/api/todos/${id}`,
      method:'put',
      data:data,
      success:function(){
        init();
      },
      error:function(){
        alert('NOT UPDATED');
      }
    });
  }
  function deleteTodo(id){

    $.ajax({
      url:`http://super-crud.herokuapp.com/api/todos/${id}`,
      method:'delete',
      success:function(){
        init();
      },
      error:function(){
        alert('NOT deleted');
      }
    });
}

    function addTodo(data){
      $.ajax({
        url:`http://super-crud.herokuapp.com/api/todos/`,
        method:'post',
        data:data,
        success:function(){
          init();
        },
        error:function(){
          alert('NOT ADDED');
        }
      });
    }
