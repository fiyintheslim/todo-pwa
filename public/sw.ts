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
        .then(res=>console.log("Installed successfully"))
        .catch((err)=>{
            console.log("install error", err)
        })
    )
})

self.addEventListener("fetch", (event:any)=>{
    
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
        // const cachedResponse = await assets.match(e.request)
        const assets = await caches.open("assets");
        await assets.put(e.request, networkFetch.clone())
        console.log("saving", networkFetch)
        return cachedResponse || networkFetch
    }

    const cacheFirst = caches.match(event.request)
    .then((res)=>{
        if(res){
            return res;
        }else{
            return fetch(event.request)
        }
    })

    const fetchFirst = fetch(event.request)
    .then(res=>{
        caches.open("assets")
        .then(cache=>{
            cache.put(event.request, res.clone())
        })
        .then(cached=>{
            return res
        })
        
    })
    .catch((err)=>{
        
        const cached = caches.match(event.request);
        console.log("Error loading data", cached)
        return caches.match(event.request)
    })

    event.respondWith(
        caches.match(event.request)
        .then(cache=>{
            const networkResponse = fetch(event.request)
            .then(res=>{
                caches.open("assets").then(open=>{
                    open.put(event.request, res.clone())
                })
            })
            return cache || networkResponse
        })
        
        )
})

// handleResponse(event)
//         .catch((err)=>{
//             caches.match(event.request)
//             .then((match)=>{
//                 console.log("Error loading data", err, match)
//                 return match
//             })
//         })


