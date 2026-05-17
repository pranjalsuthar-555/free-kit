export function loadKitty(size) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = '/kitty.png'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < data.data.length; i += 4) {
        if (data.data[i] < 30 &&
            data.data[i + 1] < 30 &&
            data.data[i + 2] < 30) {
          data.data[i + 3] = 0
        }
      }
      ctx.putImageData(data, 0, 0)
      const out = document.createElement('canvas')
      out.width = size
      out.height = size
      out.getContext('2d').drawImage(canvas, 0, 0, size, size)
      resolve(out)
    }
  })
}
