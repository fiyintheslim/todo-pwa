if("serviceWorker" in navigator){
    navigator.serviceWorker.register(new URL("sw.ts", import.meta.url), {type:"module"})
}