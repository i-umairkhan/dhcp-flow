package handlers

// imports

// structs
type KubeConfig struct { // struct for kubeconfig file
	Kubeconfig string `json:"kubeconfig"`
}

// func UpdateConfigOptions(w http.ResponseWriter, r *http.Request) {
// 	if r.Method == "POST" {
// 		var configOptions ConfigOptions
// 		err := json.NewDecoder(r.Body).Decode(&configOptions)
// 		if err != nil {
// 			w.WriteHeader(500)
// 			w.Write([]byte(err.Error()))
// 			return
// 		}
// 		_, err = config.DB.Exec("UPDATE config SET namespace = $1, label = $2", configOptions.Namespace, configOptions.Label)
// 		if err != nil {
// 			w.WriteHeader(500)
// 			w.Write([]byte(err.Error()))
// 			return
// 		}
// 		w.WriteHeader(200)
// 		json.NewEncoder(w).Encode(map[string]string{"namespace": string(configOptions.Namespace), "label": string(configOptions.Label)})
// 	} else {
// 		w.WriteHeader(405)
// 		w.Write([]byte("Method not allowed"))
// 	}
// }

// func SaveKubeConfig(w http.ResponseWriter, r *http.Request) {
// 	if r.Method == "POST" {
// 		var file File
// 		err := json.NewDecoder(r.Body).Decode(&file)
// 		if err != nil {
// 			w.WriteHeader(400)
// 			w.Write([]byte(err.Error()))
// 			return
// 		}
// 		err = os.WriteFile("config/kubeconfig.yaml", []byte(file.Kubeconfig), 0644)
// 		if err != nil {
// 			w.WriteHeader(500)
// 			w.Write([]byte(err.Error()))
// 			return
// 		}
// 		w.WriteHeader(200)
// 		w.Write([]byte("Kubeconfig successfully updated"))
// 	} else if r.Method == "GET" {
// 		kubeconfig, err := os.ReadFile("config/kubeconfig.yaml")
// 		if err != nil {
// 			w.WriteHeader(500)
// 			w.Write([]byte(err.Error()))
// 			return
// 		}
// 		w.WriteHeader(200)
// 		w.Header().Set("Content-Type", "application/json")
// 		json.NewEncoder(w).Encode(map[string]string{"kubeconfig": string(kubeconfig)})
// 	} else {
// 		w.WriteHeader(405)
// 		w.Write([]byte("Method not allowed"))
// 	}
// }
