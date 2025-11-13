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
                <button id="addBtn">添加任务</button>
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
            category: this.container.querySelector('#category').value
        };

        this.onSubmit(todo);
        this.reset();
    }

    reset() {
        this.container.querySelector('#title').value = '';
        this.container.querySelector('#description').value = '';
    }
}

window.TodoForm = TodoForm;