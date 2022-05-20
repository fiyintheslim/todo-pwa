import {manifest, version} from "@parcel/service-worker"
//v1.0

const assets = manifest.filter((res, i)=>manifest.indexOf(res) === i)
self.addEventListener("install", (event:any)=>{
    console.log("Installing service worker", manifest, assets)
    event.waitUntil(
        caches.open("assets")
        .then((cache)=>{
            cache.addAll(assets)
        })
    )
})