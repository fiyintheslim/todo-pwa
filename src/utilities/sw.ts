import {manifest, version} from "@parcel/service-worker"
//v1.0

const assets = manifest.filter((res, i)=>manifest.indexOf(res) === i)
self.addEventListener("install", (event:any)=>{
    console.log("Installing service worker", manifest, assets)
    event.waitUntil(
        caches.open("assets")
        .then((cache)=>{
            return cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", (event:any)=>{
    console.log("intercepting event")

    event.respondWith(new Response("Response"))
})