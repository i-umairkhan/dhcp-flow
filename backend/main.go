package main

import (
	"net/http"

	"github.com/i-umairkhan/dhcp-flow/db"
	"github.com/i-umairkhan/dhcp-flow/handlers"
	"github.com/rs/cors"
)

func main() {
	// initializing db
	db.InitDB()
	defer db.DB.Close()

	// initializing router
	mux := http.NewServeMux()

	// routes
	mux.HandleFunc("/configOptions", handlers.ConfigOptionsHandler)
	mux.HandleFunc("/kubeConfig", handlers.KubeConfigHandler)

	// cors handler
	c := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "DELETE"},
	})
	handler := c.Handler(mux)

	// starting server
	http.ListenAndServe(":8080", handler)
}
