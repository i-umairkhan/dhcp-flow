package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"

	"github.com/i-umairkhan/dhcp-flow/db"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

// struct for kea-dhcp.conf file
type Keadhcp4ConfFile struct {
	Keadhcp4Conf string `json:"kea-dhcp4.conf"`
}

// configmap handler
func ConfigMapHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// get configmap
		var configOptions ConfigOptions
		// query db for config options
		err := db.DB.QueryRow("SELECT namespace, label FROM configOptions").Scan(&configOptions.Namespace, &configOptions.Label)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		// read kubeconfig
		currentDir, _ := os.Getwd()
		kubeConfigPath := filepath.Join(currentDir, "kubeConfig.yaml")
		config, err := clientcmd.BuildConfigFromFlags("", kubeConfigPath)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		// create clientset
		client := kubernetes.NewForConfigOrDie(config)
		// get configmaps from k8s with namespace and label
		configMaps, err := client.CoreV1().ConfigMaps(configOptions.Namespace).List(context.Background(), metav1.ListOptions{
			LabelSelector: configOptions.Label,
		})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		// send response
		// sending only first config map data that has kea-dhcp4.conf
		var keadhcp4Conf Keadhcp4ConfFile
		keadhcp4Conf.Keadhcp4Conf = configMaps.Items[0].Data["kea-dhcp4.conf"]
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(keadhcp4Conf)

	} else if r.Method == "POST" {
		// update configmap data
		var keadhcp4Conf Keadhcp4ConfFile
		err := json.NewDecoder(r.Body).Decode(&keadhcp4Conf)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		// query db for config options
		var configOptions ConfigOptions
		err = db.DB.QueryRow("SELECT namespace, label FROM configOptions").Scan(&configOptions.Namespace, &configOptions.Label)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		// read kubeconfig
		currentDir, _ := os.Getwd()
		kubeConfigPath := filepath.Join(currentDir, "kubeConfig.yaml")
		config, err := clientcmd.BuildConfigFromFlags("", kubeConfigPath)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		// create clientset
		client := kubernetes.NewForConfigOrDie(config)
		// get configmaps from k8s with namespace and label
		configMaps, err := client.CoreV1().ConfigMaps(configOptions.Namespace).List(context.Background(), metav1.ListOptions{
			LabelSelector: configOptions.Label,
		})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		// update configmap data with new data
		// updating only first config map data that has kea-dhcp4.conf with new kea-dhcp4.conf
		configMaps.Items[0].Data["kea-dhcp4.conf"] = keadhcp4Conf.Keadhcp4Conf
		updatedConfigMap, err := client.CoreV1().ConfigMaps(configOptions.Namespace).Update(context.Background(), &configMaps.Items[0], metav1.UpdateOptions{})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		// send updated kea-dhcp4.conf
		keadhcp4Conf.Keadhcp4Conf = updatedConfigMap.Data["kea-dhcp4.conf"]
		// send response
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(keadhcp4Conf)
	}
}
