// 过滤器组件
class FilterBar {
    constructor(container, onFilterChange) {
        this.container = container;
        this.onFilterChange = onFilterChange;
        this.currentFilter = 'all';
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="filter-bar">
                <button class="filter-btn active" data-filter="all">全部</button>
                <button class="filter-btn" data-filter="pending">未完成</button>
                <button class="filter-btn" data-filter="completed">已完成</button>
                <button class="filter-btn" data-filter="工作">工作</button>
                <button class="filter-btn" data-filter="学习">学习</button>
                <button class="filter-btn" data-filter="生活">生活</button>
                <button class="filter-btn" data-filter="其他">其他</button>
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
    }

    setActiveFilter(activeBtn) {
        this.container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
}

window.FilterBar = FilterBar;