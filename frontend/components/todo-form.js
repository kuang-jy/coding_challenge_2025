// 待办事项表单组件
class TodoForm {
    constructor(container, onSubmit) {
        this.container = container;
        this.onSubmit = onSubmit;
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="add-form">
                <input type="text" id="title" placeholder="任务标题" required>
                <input type="text" id="description" placeholder="任务描述（可选）">
                <select id="category">
                    <option value="工作">工作</option>
                    <option value="学习">学习</option>
                    <option value="生活">生活</option>
                    <option value="其他">其他</option>
                </select>
                <select id="priority">
                    <option value="high">高优先级</option>
                    <option value="medium" selected>中优先级</option>
                    <option value="low">低优先级</option>
                </select>
                <input type="date" id="dueDate" title="截止日期（可选）">
                <button type="button" id="addBtn">添加任务</button>
            </div>
        `;
    }

    bindEvents() {
        const addBtn = this.container.querySelector('#addBtn');
        const titleInput = this.container.querySelector('#title');

        addBtn.addEventListener('click', () => this.handleSubmit());
        titleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.handleSubmit();
        });
    }

    handleSubmit() {
        const title = this.container.querySelector('#title').value.trim();
        if (!title) return;

        const todo = {
            title,
            description: this.container.querySelector('#description').value.trim(),
            category: this.container.querySelector('#category').value,
            priority: this.container.querySelector('#priority').value,
            due_date: this.container.querySelector('#dueDate').value || null
        };

        this.onSubmit(todo);
        this.reset();
    }

    reset() {
        this.container.querySelector('#title').value = '';
        this.container.querySelector('#description').value = '';
        this.container.querySelector('#priority').value = 'medium';
        this.container.querySelector('#dueDate').value = '';
    }
}

window.TodoForm = TodoForm;