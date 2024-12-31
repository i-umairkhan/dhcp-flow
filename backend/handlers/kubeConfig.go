package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
)

// kubeconfig handler
func KubeConfigHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		// upload kubeconfig
		r.Body = http.MaxBytesReader(w, r.Body, 10<<20)
		uploadedfile, _, err := r.FormFile("kubeConfig")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		defer uploadedfile.Close()
		createdFile, err := os.Create("kubeConfig.yaml")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		defer createdFile.Close()
		_, err = io.Copy(createdFile, uploadedfile)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		w.WriteHeader(200)
		w.Write([]byte("Kubeconfig uploaded"))
	} else if r.Method == "GET" {
		// get kubeconfig
		kubeconfig, err := os.ReadFile("kubeConfig.yaml")
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			return
		}
		w.WriteHeader(200)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"kubeConfig": string(kubeconfig)})
	} else if r.Method == "DELETE" {
		err := os.Remove("kubeConfig.yaml")
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			return
		}
		w.WriteHeader(200)
		json.NewEncoder(w).Encode("kubeconfig deleted")

	} else {
		w.WriteHeader(405)
		w.Write([]byte("Method not allowed"))
	}
}
