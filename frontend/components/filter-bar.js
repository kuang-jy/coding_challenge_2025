// 过滤器组件
class FilterBar {
    constructor(container, onFilterChange, onSortChange) {
        this.container = container;
        this.onFilterChange = onFilterChange;
        this.onSortChange = onSortChange;
        this.currentFilter = 'all';
        this.currentSort = '';
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="filter-bar">
                <div class="filter-section">
                    <button class="filter-btn active" data-filter="all">全部</button>
                    <button class="filter-btn" data-filter="pending">未完成</button>
                    <button class="filter-btn" data-filter="completed">已完成</button>
                    <button class="filter-btn" data-filter="工作">工作</button>
                    <button class="filter-btn" data-filter="学习">学习</button>
                    <button class="filter-btn" data-filter="生活">生活</button>
                    <button class="filter-btn" data-filter="其他">其他</button>
                </div>
                <div class="sort-section">
                    <label for="sortSelect">排序方式：</label>
                    <select id="sortSelect">
                        <option value="">默认排序</option>
                        <option value="priority">按优先级</option>
                        <option value="due_date">按截止日期</option>
                        <option value="created_at">按创建日期</option>
                    </select>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.setActiveFilter(e.target);
                const filter = e.target.dataset.filter;
                this.currentFilter = filter;
                this.onFilterChange(filter);
            }
        });

        const sortSelect = this.container.querySelector('#sortSelect');
        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.onSortChange(e.target.value);
        });
    }

    setActiveFilter(activeBtn) {
        this.container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

window.FilterBar = FilterBar;