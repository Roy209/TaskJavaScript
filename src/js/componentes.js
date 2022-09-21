import { todoList } from '../index';
import { Todo } from '../classes';

//Referencia al html

const divTodoList =  document.getElementById('todo-list'); 
const inputText =  document.getElementById('new-todo'); 
const btnElimnarCompletados = document.getElementById('clear-completed');
const ulFiltros = document.getElementById('filter')
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo)=>{
    
    const htmlTodo = `
    <li class="${ (todo.completado)? 'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked':'' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `

    const div = document.createElement('div');

    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild)

    return div;
}

inputText.addEventListener('keyup',(event)=>{
    
    if(event.keyCode == 13 && inputText.value.length >0){
        const newTarea = new Todo(inputText.value);
        todoList.nuevoTodo(newTarea);
        crearTodoHtml(newTarea);
        inputText.value = '';
    }
})

divTodoList.addEventListener('click',(event)=>{
    const nameElement = event.target.localName; //label , input, button
    const todoElement = event.target.parentElement.parentElement;

    const todoId = todoElement.getAttribute('data-id');
    
    if(nameElement.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElement.classList.toggle('completed')
    }

    if(nameElement.includes('button')){
        todoList.eliminarTodo(todoId);

        divTodoList.removeChild(todoElement); // o todoElement.remove()
       
    }

    console.log(todoList)
})

btnElimnarCompletados.addEventListener('click',()=>{
    const listaTodo = divTodoList.children;

    for(let i = divTodoList.children.length-1; i>=0;i--){
        if( divTodoList.children[i].classList.contains('completed') ){
            // divTodoList.removeChild(divTodoList.children[i]);
            divTodoList.children[i].remove();
        }    
    }
    console.log(listaTodo)
})

ulFiltros.addEventListener('click',(event)=>{
    console.log(event.target.text.trim())
    const filtro = event.target.text;
    if(!filtro) return;
    
    anchorFiltros.forEach(ele => ele.classList.remove('selected'))

    event.target.classList.add('selected')

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');
        switch(filtro){
            case 'Pendientes':
                if(completado) elemento.classList.add('hidden');
                break;
            case 'Completados':
                if(!completado) elemento.classList.add('hidden')
                break;
        }
    }

})

