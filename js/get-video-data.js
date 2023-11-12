console.log('ok')
const video$ = document.querySelector('video')
const canvas$ = document.querySelector('canvas')
const ctx = canvas$.getContext('2d')
// console.log(video$)

// Размеры холста
const width = 320
const height = 480

//Параметры холста
canvas$.width = width
canvas$.height = height
const constraints = {
  audio: false,
  video: { width, height },
}

//Информация о ширине окна устройства
const userAgent = window.innerWidth
// console.log(userAgent)

//Список девайсов на устройстве
const devices = await navigator.mediaDevices.enumerateDevices()
// console.log(devices)

//Получение потока и пуш в элемент видео
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video$.srcObject = stream
  video$.onloadedmetadata = () => {
    video$.play()
    requestAnimationFrame(drawVideoFrame)
  }
})
.catch(console.error)

//Отрисовка видеопотока на холсте
function drawVideoFrame() {
  ctx.drawImage(video$, 0, 0, width, height)
  requestAnimationFrame(drawVideoFrame)
}