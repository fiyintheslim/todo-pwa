//v1.0

const assets = ["/"]
self.addEventListener("install", (event:any)=>{
    console.log("Installing service worker")
    event.waitUntil(
        caches.open("assets")
        .then((cache)=>{
            cache.addAll(assets)
        })
    )
})