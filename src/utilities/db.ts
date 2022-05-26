export function openDB() {
    const db = window.indexedDB;

    const request = db.open("todoDB", 1)

    request.onerror = (e) => {
        console.log("Error in indexedDB", e.target)
    }

    request.onsuccess = (e:any) => {
        console.log("Success in indexedDB", e.target)
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

    return request
}

export function loadData (db: IDBOpenDBRequest) {
    const request = db.result;
    const transaction = request.transaction("list", "readonly");

    const data = transaction.objectStore("list")
}