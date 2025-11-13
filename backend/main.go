package main

import (
	"fmt"
	"log"
	"net/http"
	"todolist/backend/handlers"
	"todolist/backend/services"
)

func main() {
	// 初始化服务
	todoService := services.NewTodoService("todos.json")
	todoHandler := handlers.NewTodoHandler(todoService)

	// 静态文件服务
	http.Handle("/", http.FileServer(http.Dir("./frontend/")))

	// API 路由
	http.HandleFunc("/api/todos", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			todoHandler.GetTodos(w, r)
		case "POST":
			todoHandler.CreateTodo(w, r)
		case "OPTIONS":
			todoHandler.GetTodos(w, r)
		}
	})

	http.HandleFunc("/api/todos/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "PUT":
			todoHandler.UpdateTodo(w, r)
		case "DELETE":
			todoHandler.DeleteTodo(w, r)
		case "OPTIONS":
			todoHandler.UpdateTodo(w, r)
		}
	})

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}