const debounce = (fn, delay) => {
    let time = null
    return () => {
        clearTimeout(time)
        time = setTimeout(() => {
            fn()
        }, delay)
    }
}
addEventListener('resize', debounce(() => {
    window.location.reload()
}, 100))
