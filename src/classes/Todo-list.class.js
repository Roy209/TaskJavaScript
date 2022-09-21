import { Todo } from "./todo.class";

export class TodoList{

    constructor(){
        // this.todos = [];
        this.cargarLocalStorage();
    }


    nuevoTodo(todo){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        this.todos = this.todos.filter(ele => ele.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado( id ){
        id*=1;
        for(const todo of this.todos){
            console.log(id, todo.id);
            if(todo.id === id){
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(ele => !ele.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    cargarLocalStorage(){

        this.todos =  localStorage.getItem('todos')?
              JSON.parse(localStorage.getItem('todos')) : [];

        this.todos = this.todos.map(Todo.fromJson)
    }

}