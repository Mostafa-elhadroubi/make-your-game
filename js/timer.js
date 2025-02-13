// let minute = 0
// let second  = 1;
// export const timer = () => {
//     const clock = document.querySelector('.clock')
//     if (second == 60) {
//         minute += 1
//         second = 0
//         clock.innerHTML = `Timer: <strong>${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}</strong>`
//     } else {
//         clock.innerHTML = `Timer: ${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
//     }
//     second++
// }
// export let time;
// export const resetTime = () => {
//     time = setInterval(timer,1000)
// }