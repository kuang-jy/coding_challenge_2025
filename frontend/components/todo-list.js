// 待办事项列表组件
class TodoList {
    constructor(container, onToggle, onDelete) {
        this.container = container;
        this.onToggle = onToggle;
        this.onDelete = onDelete;
        this.todos = [];
        this.filter = 'all';
        this.searchTerm = '';
        this.bindEvents();
    }

    setTodos(todos) {
        this.todos = todos;
        this.render();
    }

    setFilter(filter) {
        this.filter = filter;
        this.render();
    }

    setSearchTerm(searchTerm) {
        this.searchTerm = searchTerm.toLowerCase();
        this.render();
    }

    render() {
        const filtered = this.getFilteredTodos();
        
        if (filtered.length === 0) {
            const message = this.searchTerm ? 
                `未找到包含 "${this.searchTerm}" 的任务` : 
                '暂无任务';
            this.container.innerHTML = `<p class="empty-message">${message}</p>`;
            return;
        }

        let html = '';
        if (this.searchTerm && filtered.length > 0) {
            html += `<div class="search-results">找到 ${filtered.length} 个相关任务</div>`;
        }
        html += filtered.map(todo => this.renderTodoItem(todo)).join('');
        this.container.innerHTML = html;
    }

    renderTodoItem(todo) {
        const createdAt = new Date(todo.created_at).toLocaleString('zh-CN');
        const dueDate = todo.due_date ? new Date(todo.due_date).toLocaleDateString('zh-CN') : null;
        const priorityText = {high: '高', medium: '中', low: '低'}[todo.priority] || '中';
        const priorityClass = `priority-${todo.priority || 'medium'}`;
        
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                       class="todo-checkbox">
                <div class="todo-content">
                    <div class="todo-title">${this.escapeHtml(todo.title)}</div>
                    <div class="todo-meta">
                        ${todo.description ? `<div class="todo-description">${this.escapeHtml(todo.description)}</div>` : ''}
                        <span class="category">${todo.category}</span>
                        <span class="priority ${priorityClass}">优先级: ${priorityText}</span>
                        ${dueDate ? `<span class="due-date">截止: ${dueDate}</span>` : ''}
                        <span class="created-time">${createdAt}</span>
                    </div>
                </div>
                <button class="btn-small btn-danger delete-btn">删除</button>
            </div>
        `;
    }

    bindEvents() {
        this.container.addEventListener('change', (e) => {
            if (e.target.classList.contains('todo-checkbox')) {
                const id = parseInt(e.target.closest('.todo-item').dataset.id);
                this.onToggle(id);
            }
        });

        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                const id = parseInt(e.target.closest('.todo-item').dataset.id);
                if (confirm('确定要删除这个任务吗？')) {
                    this.onDelete(id);
                }
            }
        });
    }

    getFilteredTodos() {
        return this.todos.filter(todo => {
            // 应用过滤器
            let matchesFilter = true;
            switch (this.filter) {
                case 'all': matchesFilter = true; break;
                case 'pending': matchesFilter = !todo.completed; break;
                case 'completed': matchesFilter = todo.completed; break;
                default: matchesFilter = todo.category === this.filter;
            }
            
            // 应用搜索
            let matchesSearch = true;
            if (this.searchTerm) {
                const title = todo.title.toLowerCase();
                const description = (todo.description || '').toLowerCase();
                matchesSearch = title.includes(this.searchTerm) || description.includes(this.searchTerm);
            }
            
            return matchesFilter && matchesSearch;
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

window.TodoList = TodoList;