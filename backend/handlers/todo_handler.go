package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"
	"todolist/backend/models"
	"todolist/backend/services"
	"todolist/backend/utils"
)

// TodoHandler HTTP 请求处理器
type TodoHandler struct {
	service *services.TodoService
}

// NewTodoHandler 创建新的处理器
func NewTodoHandler(service *services.TodoService) *TodoHandler {
	return &TodoHandler{service: service}
}

// GetTodos 获取所有待办事项
func (h *TodoHandler) GetTodos(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	w.Header().Set("Content-Type", "application/json")
	
	sortBy := r.URL.Query().Get("sort")
	if sortBy != "" {
		json.NewEncoder(w).Encode(h.service.GetAllSorted(sortBy))
	} else {
		json.NewEncoder(w).Encode(h.service.GetAll())
	}
}

// CreateTodo 创建新待办事项
func (h *TodoHandler) CreateTodo(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == "OPTIONS" {
		return
	}

	var req struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Category    string `json:"category"`
		Priority    string `json:"priority"`
		DueDate     string `json:"due_date"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	var dueDate *time.Time
	if req.DueDate != "" {
		if parsed, err := time.Parse("2006-01-02", req.DueDate); err == nil {
			dueDate = &parsed
		}
	}

	if req.Priority == "" {
		req.Priority = "medium"
	}

	todo := h.service.Add(req.Title, req.Description, req.Category, req.Priority, dueDate)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todo)
}

// UpdateTodo 更新待办事项
func (h *TodoHandler) UpdateTodo(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == "OPTIONS" {
		return
	}

	id, err := strconv.Atoi(r.URL.Path[len("/api/todos/"):])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	var todo models.Todo
	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	updated := h.service.Update(id, todo)
	if updated == nil {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updated)
}

// DeleteTodo 删除待办事项
func (h *TodoHandler) DeleteTodo(w http.ResponseWriter, r *http.Request) {
	utils.EnableCORS(w)
	if r.Method == "OPTIONS" {
		return
	}

	id, err := strconv.Atoi(r.URL.Path[len("/api/todos/"):])
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	if h.service.Delete(id) {
		w.WriteHeader(http.StatusNoContent)
	} else {
		http.NotFound(w, r)
	}
}