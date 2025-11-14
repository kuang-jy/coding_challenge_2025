// 搜索栏组件
class SearchBar {
    constructor(container, onSearch) {
        this.container = container;
        this.onSearch = onSearch;
        this.searchTerm = '';
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="search-bar">
                <input type="text" id="searchInput" placeholder="搜索任务标题或描述..." value="${this.searchTerm}">
                <button type="button" id="clearSearch" class="clear-btn" ${this.searchTerm ? '' : 'style="display:none"'}>✕</button>
            </div>
        `;
    }

    bindEvents() {
        const searchInput = this.container.querySelector('#searchInput');
        const clearBtn = this.container.querySelector('#clearSearch');

        // 实时搜索（防抖）
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.searchTerm = e.target.value.trim();
                this.updateClearButton();
                this.onSearch(this.searchTerm);
            }, 300);
        });

        // 清除搜索
        clearBtn.addEventListener('click', () => {
            this.searchTerm = '';
            searchInput.value = '';
            this.updateClearButton();
            this.onSearch('');
        });

        // 回车搜索
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.searchTerm = e.target.value.trim();
                this.onSearch(this.searchTerm);
            }
        });
    }

    updateClearButton() {
        const clearBtn = this.container.querySelector('#clearSearch');
        clearBtn.style.display = this.searchTerm ? 'block' : 'none';
    }

    getSearchTerm() {
        return this.searchTerm;
    }
}

window.SearchBar = SearchBar;