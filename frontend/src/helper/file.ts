
export const getBase64 = (img: any, callback?: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    console.log("collback")
    console.log(reader.result)
    callback(reader.result)
  });
  console.log("getBase64")

  reader.readAsDataURL(img);
}