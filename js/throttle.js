export const throttle = (fn, delay) => {
    let time = null
    return () => {
        if(time) return
        time = setTimeout(() => {
            fn()
            time = null
        }, delay)
    }
}
export const throttleFunction = () => {
    window.addEventListener('resize', throttle(() => {
        window.location.reload()
    
    }, 100))
}