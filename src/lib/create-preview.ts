export const createPreview = (url: string, ratio: number) =>
  new Promise<string>((resolve, reject) => {
    const video = document.createElement("video");
    video.setAttribute("src", url);
    video.load();

    video.addEventListener("loadedmetadata", () => {
      setTimeout(() => {
        video.currentTime = video.duration * ratio;
      }, 200);

      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        ctx?.canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            reject("Blob is null");
          }
          video.remove();
          canvas.remove();
        }, "image/webp");
      });
    });
  });
