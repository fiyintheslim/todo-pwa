import {manifest, version} from "@parcel/service-worker"
//v1.0

const assets = manifest.filter((asset, i)=>manifest.indexOf(asset) === i)
self.addEventListener("install", (event:any)=>{
    console.log("Installing service worker", assets)
    event.waitUntil(
        caches.open(version)
        .then((cache)=>{
            return cache.addAll(assets)
        })
        .catch((err)=>{
            console.log("install error", err)
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
        
        const networkFetch = await fetch(e.request.url)
        const assets = await caches.open(version)
        await assets.put(e.request, networkFetch);
        if(cachedResponse){
            return cachedResponse
        }else{
            return networkFetch
        }

    }

    const cacheFirst = caches.match(event.request)
    .then((res)=>{
        if(res){
            return res;
        }else{
            return fetch(event.request)
        }
    })

    event.respondWith(handleResponse(event))
})

