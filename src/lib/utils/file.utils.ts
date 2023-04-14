export async function fileToBase64(file: File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const result = reader.result;

      if (!result) {
        return reject();
      }

      resolve(result);
    };
    reader.readAsDataURL(file);
  });
}
