import {manifest, version} from "@parcel/service-worker"
//v1.0

const assets = manifest.filter((asset, i)=>manifest.indexOf(asset) === i)
self.addEventListener("install", (event:any)=>{
    console.log("Installing service worker", assets)
    event.waitUntil(
        caches.open("assets")
        .then((cache)=>{
            return cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", (event:any)=>{
    console.log("in each request", event.request)
    //stale revalidate method
    // event.respondWith(
    //     caches.match(event.request)
    //     .then((resource) => {
            
    //         const fetchPromise = fetch(event.request)
    //         .then((fetched)=>{
    //             console.log("fetxhed", fetched)
    //             caches.open("assets")
    //             .then(cache=>{
    //                 cache.put(event.request, fetched.clone())
    //                 return fetched || resource
    //             })
    //         })
           
            
    //     })
    // )
    //using async and await 
    async function handleResponse (e:any){
        const cachedResponse = await caches.match(e.request)
        
        const networkFetch = await fetch(e.request)
        const assets = await caches.open("assets")

        await assets.put(e.request, networkFetch.clone());

        return cachedResponse || networkFetch

    }

    event.respondWith(handleResponse(event))
})

