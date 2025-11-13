package services

import (
	"encoding/json"
	"io/ioutil"
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

// Add 添加新的待办事项
func (s *TodoService) Add(title, description, category string) *models.Todo {
	todo := models.NewTodo(title, description, category)
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