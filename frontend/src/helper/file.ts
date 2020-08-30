export const getBase64 = (img: Blob, callback: any) => {
  const image = new Image();
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    if (typeof reader.result == "string") {
      image.src = reader.result
    }
    image.addEventListener('load', () => {
      callback(reader.result, image)
    })
  });

  reader.readAsDataURL(img);
}