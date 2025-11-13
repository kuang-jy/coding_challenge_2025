package models

import "time"

// Todo 待办事项数据模型
type Todo struct {
	ID          int        `json:"id"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	Completed   bool       `json:"completed"`
	Category    string     `json:"category"`
	Priority    string     `json:"priority"`    // 优先级：high, medium, low
	DueDate     *time.Time `json:"due_date"`    // 截止日期（可选）
	CreatedAt   time.Time  `json:"created_at"`
}

// NewTodo 创建新的待办事项
func NewTodo(title, description, category, priority string, dueDate *time.Time) *Todo {
	return &Todo{
		Title:       title,
		Description: description,
		Category:    category,
		Priority:    priority,
		DueDate:     dueDate,
		Completed:   false,
		CreatedAt:   time.Now(),
	}
}

// Toggle 切换完成状态
func (t *Todo) Toggle() {
	t.Completed = !t.Completed
}