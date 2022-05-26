import {Todo} from "./types";

const version = 1;

export function openDB() {
    const db = window.indexedDB;
    const request = db.open("todoDB", version)
    request.onerror = (e:any) => {
        console.log("Error in indexedDB", e.target.error)
    }

    request.onsuccess = (e:any) => {
        console.log("Success in indexedDB", request.result)
        const db = request.result

        db.onversionchange = () =>{
            db.close();
            alert("Database is outdated, please reload page")
        }
    }

    request.onupgradeneeded = (e: any) => {
        const db = e.target?.result
        const objectStore = db.createObjectStore("list", { keyPath: "id" })

        objectStore.createIndex("title", "title", { unique: false })

    }

    
}

export function loadData (setData:Function) {
    const db = window.indexedDB;
    const request = db.open("todoDB", version)
    

    request.onerror = (e:any) => {
        console.log("error loading data", e.target.error)
    }

    request.onsuccess = (e:any)=>{
        
        const transaction = e.target.result.transaction("list", "readonly");

        const data = transaction.objectStore("list")

        const operation = data.getAll()
        operation.onerror = (e:any) => {
            console.log("Error loading data")
        }
        operation.onsuccess = (e:any) => {
            
            setData(e.target.result)
        }
        
    }
    
}

export function addData (data:Todo) {
    console.log("adding")
    const db = window.indexedDB;
    const request = db.open("todoDB", version);
    

    

    request.onerror =  (e:any) => {
        console.log("Error saving data", e.target.error)
    }

    request.onsuccess = (e:any) => {
        const transaction = request.result.transaction("list", "readwrite");

        const objectStore = transaction.objectStore("list");
        
        const operation = objectStore.add(data);

        operation.onerror = () => {
            console.log("Error in adding to list", )
        }

        operation.onsuccess = (e:any) => {
            
        }
        
    }
}

export function removeOne (id:string) {
    const db = window.indexedDB;
    const request = db.open("todoDB", version);

    request.onerror = (e:any) => {
        console.log("Error deleting one todo", e.target.error)
    }

    request.onsuccess = (e:any) => {
        const transaction = e.target.result.transaction("list", "readwrite");
        const store = transaction.objectStore("list");
        const remove = store.delete(id)

        remove.onerror = (e:any) => {
            console.log("Error deleting todo item", e.target.error)
        }

        remove.onsuccess = (e:any) => {
            
        }
    }
}

export function removeMany (ids:Todo[]) {
    const db = window.indexedDB;
    const request = db.open("todoDB", version);

    request.onerror = (e:any) => {
        console.log("Error while opening database for deleting many entries")
    }

    request.onsuccess = (e:any) => {
        const transaction = e.target.result.transaction("list", "readwrite");
        const storage = transaction.objectStore("list");
        ids.forEach(id=>{
            const del = storage.delete(id.id)
            del.onerror = (e:any) => {
                console.log("Error deleting many indexes")
            }

            del.onsuccess = () => {
             
            }

        })
    }
}