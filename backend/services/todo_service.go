package services

import (
	"encoding/json"
	"io/ioutil"
	"sort"
	"time"
	"todolist/backend/models"
)

// TodoService 待办事项业务逻辑服务
type TodoService struct {
	todos    []models.Todo
	nextID   int
	dataFile string
}

// NewTodoService 创建新的服务实例
func NewTodoService(dataFile string) *TodoService {
	service := &TodoService{
		todos:    []models.Todo{},
		nextID:   1,
		dataFile: dataFile,
	}
	service.loadTodos()
	return service
}

// GetAll 获取所有待办事项
func (s *TodoService) GetAll() []models.Todo {
	return s.todos
}

// GetAllSorted 获取排序后的所有待办事项
func (s *TodoService) GetAllSorted(sortBy string) []models.Todo {
	todos := make([]models.Todo, len(s.todos))
	copy(todos, s.todos)
	
	switch sortBy {
	case "priority":
		s.sortByPriority(todos)
	case "due_date":
		s.sortByDueDate(todos)
	case "created_at":
		s.sortByCreatedAt(todos)
	default:
		return todos
	}
	
	return todos
}

// sortByPriority 按优先级排序
func (s *TodoService) sortByPriority(todos []models.Todo) {
	priorityOrder := map[string]int{"high": 1, "medium": 2, "low": 3}
	sort.Slice(todos, func(i, j int) bool {
		return priorityOrder[todos[i].Priority] < priorityOrder[todos[j].Priority]
	})
}

// sortByDueDate 按截止日期排序
func (s *TodoService) sortByDueDate(todos []models.Todo) {
	sort.Slice(todos, func(i, j int) bool {
		if todos[i].DueDate == nil && todos[j].DueDate == nil {
			return false
		}
		if todos[i].DueDate == nil {
			return false
		}
		if todos[j].DueDate == nil {
			return true
		}
		return todos[i].DueDate.Before(*todos[j].DueDate)
	})
}

// sortByCreatedAt 按创建日期排序
func (s *TodoService) sortByCreatedAt(todos []models.Todo) {
	sort.Slice(todos, func(i, j int) bool {
		return todos[i].CreatedAt.After(todos[j].CreatedAt)
	})
}

// Add 添加新的待办事项
func (s *TodoService) Add(title, description, category, priority string, dueDate *time.Time) *models.Todo {
	todo := models.NewTodo(title, description, category, priority, dueDate)
	todo.ID = s.nextID
	s.nextID++
	s.todos = append(s.todos, *todo)
	s.saveTodos()
	return todo
}

// Update 更新待办事项
func (s *TodoService) Update(id int, todo models.Todo) *models.Todo {
	for i, t := range s.todos {
		if t.ID == id {
			todo.ID = id
			s.todos[i] = todo
			s.saveTodos()
			return &s.todos[i]
		}
	}
	return nil
}

// Delete 删除待办事项
func (s *TodoService) Delete(id int) bool {
	for i, todo := range s.todos {
		if todo.ID == id {
			s.todos = append(s.todos[:i], s.todos[i+1:]...)
			s.saveTodos()
			return true
		}
	}
	return false
}

// loadTodos 从文件加载数据
func (s *TodoService) loadTodos() {
	data, err := ioutil.ReadFile(s.dataFile)
	if err != nil {
		return
	}
	json.Unmarshal(data, &s.todos)
	if len(s.todos) > 0 {
		s.nextID = s.todos[len(s.todos)-1].ID + 1
	}
}

// saveTodos 保存数据到文件
func (s *TodoService) saveTodos() {
	data, _ := json.MarshalIndent(s.todos, "", "  ")
	ioutil.WriteFile(s.dataFile, data, 0644)
}