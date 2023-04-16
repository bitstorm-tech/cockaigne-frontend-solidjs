export async function sleep(time = 2000) {
  await new Promise((resolve) => setTimeout(resolve, time));
}
