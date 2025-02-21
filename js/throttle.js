const throttle = (fn, delay) => {
    let time = null
    return () => {
        if (time) return
        time = setTimeout(() => {
            fn()
            time = null
        }, delay)
    }
}
addEventListener('resize', throttle(() => {
    window.location.reload()
}, 100))
