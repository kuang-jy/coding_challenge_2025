// 主应用程序
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentSort = '';
        this.init();
    }

    async init() {
        // 初始化组件
        this.todoForm = new TodoForm(
            document.getElementById('todoForm'),
            (todo) => this.addTodo(todo)
        );

        this.filterBar = new FilterBar(
            document.getElementById('filterBar'),
            (filter) => this.filterTodos(filter),
            (sort) => this.sortTodos(sort)
        );

        this.todoList = new TodoList(
            document.getElementById('todoList'),
            (id) => this.toggleTodo(id),
            (id) => this.deleteTodo(id)
        );

        // 加载初始数据
        await this.loadTodos();
    }

    async loadTodos() {
        try {
            this.todos = await apiService.getTodos(this.currentSort) || [];
            this.todoList.setTodos(this.todos);
        } catch (error) {
            console.error('Failed to load todos:', error);
            this.showError('加载任务失败');
        }
    }

    async addTodo(todoData) {
        try {
            const newTodo = await apiService.createTodo(todoData);
            this.todos.push(newTodo);
            this.todoList.setTodos(this.todos);
        } catch (error) {
            console.error('Failed to add todo:', error);
            this.showError('添加任务失败');
        }
    }

    async toggleTodo(id) {
        try {
            const todo = this.todos.find(t => t.id === id);
            if (!todo) return;

            const updatedTodo = await apiService.updateTodo(id, {
                ...todo,
                completed: !todo.completed
            });

            Object.assign(todo, updatedTodo);
            this.todoList.setTodos(this.todos);
        } catch (error) {
            console.error('Failed to toggle todo:', error);
            this.showError('更新任务失败');
        }
    }

    async deleteTodo(id) {
        try {
            await apiService.deleteTodo(id);
            this.todos = this.todos.filter(t => t.id !== id);
            this.todoList.setTodos(this.todos);
        } catch (error) {
            console.error('Failed to delete todo:', error);
            this.showError('删除任务失败');
        }
    }

    filterTodos(filter) {
        this.todoList.setFilter(filter);
    }

    async sortTodos(sort) {
        this.currentSort = sort;
        await this.loadTodos();
    }

    showError(message) {
        // 简单的错误提示
        alert(message);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});