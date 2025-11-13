// API 服务模块 - 负责与后端通信
class ApiService {
    constructor(baseUrl = '/api') {
        this.baseUrl = baseUrl;
    }

    // 通用 API 调用方法
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response.status === 204 ? null : await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // 获取所有待办事项
    async getTodos() {
        return this.request('/todos');
    }

    // 创建新待办事项
    async createTodo(todo) {
        return this.request('/todos', {
            method: 'POST',
            body: JSON.stringify(todo)
        });
    }

    // 更新待办事项
    async updateTodo(id, todo) {
        return this.request(`/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(todo)
        });
    }

    // 删除待办事项
    async deleteTodo(id) {
        return this.request(`/todos/${id}`, {
            method: 'DELETE'
        });
    }
}

// 导出单例实例
const apiService = new ApiService();
window.apiService = apiService;