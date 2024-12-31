package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/i-umairkhan/dhcp-flow/db"
)

// struct for config options
type ConfigOptions struct {
	Namespace string `json:"namespace"`
	Label     string `json:"label"`
}

// config options handler
func ConfigOptionsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// get config options
		var configOptions ConfigOptions
		err := db.DB.QueryRow("SELECT namespace, label FROM configOptions").Scan(&configOptions.Namespace, &configOptions.Label)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(configOptions)
	} else if r.Method == "POST" {
		// update config options
		var configOptions ConfigOptions
		err := json.NewDecoder(r.Body).Decode(&configOptions)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}
		_, err = db.DB.Exec("UPDATE configOptions SET namespace = $1, label = $2", &configOptions.Namespace, &configOptions.Label)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(configOptions)
	} else {
		w.WriteHeader(405)
		w.Write([]byte("Method not allowed"))
	}
}
