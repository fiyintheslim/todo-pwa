import {manifest, version} from "@parcel/service-worker"
//v1.0

const assets = manifest.filter((asset, i)=>manifest.indexOf(asset) === i)
self.addEventListener("install", (event:any)=>{
    console.log("Installing service worker")
    event.waitUntil(
        caches.open("assets")
        .then((cache)=>{
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", (event:any)=>{
    console.log("in each request", event.request)
    //stale revalidate method
    event.respondWith(
        caches.match(event.request)
        .then((resource) => {
            
            const fetchPromise = fetch(event.request)
            .then((fetched)=>{
                caches.open("assets")
                .then(cache=>{
                    cache.put(event.request, fetched.clone())
                    return fetched
                })
            })
            // if(!resource){
            //     return fetchPromise
            // }
            return  fetchPromise || resource
        })
    )
})

