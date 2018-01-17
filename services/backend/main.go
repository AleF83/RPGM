package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) { io.WriteString(rw, "Hello, World!") })
	http.HandleFunc("/health", func(rw http.ResponseWriter, r *http.Request) { io.WriteString(rw, "I'm healthy") })
	err := http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), nil)
	log.Fatal(err)
}
