import { DeleteObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const bucket = process.env.DO_SPACES_BUCKET;
const baseUrl = process.env.DO_SPACES_BASE_URL;
const endpoint = process.env.DO_SPACES_ENDPOINT;
const region = process.env.DO_SPACES_REGION;
const key = process.env.DO_SPACES_KEY as string;
const secret = process.env.DO_SPACES_SECRET as string;

const s3 = new S3Client({
  endpoint: endpoint,
  region,
  credentials: {
    accessKeyId: key,
    secretAccessKey: secret
  }
});

export async function getImageUrls(accountId: number, dealId?: number): Promise<string[]> {
  const prefix = dealId ? `${accountId}/deals/${dealId}` : `${accountId}/shop`;
  const command = new ListObjectsCommand({ Bucket: bucket, Prefix: prefix });
  const response = await s3.send(command);
  return (
    response.Contents?.filter((object) => object.Size && object.Size > 0).map((object) => `${baseUrl}/${object.Key}`) ||
    []
  );
}

export async function savePicture(
  file: File,
  accountId: number,
  filename?: string,
  additionalPath?: string
): Promise<string> {
  const timestamp = new Date().getTime().toString();
  const fileExtension = file.name.split(".").pop();
  filename = (filename ? filename : timestamp) + "." + fileExtension;
  additionalPath = additionalPath ? `/${additionalPath}` : "";
  const key = `${accountId}${additionalPath}/${filename}`.replace("//", "/");
  const buffer = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: file.type,
    ACL: "public-read",
    Body: buffer
  });

  await s3.send(command);

  return `${baseUrl}/${key}`;
}

export async function savePictureBase64(
  base64: string,
  accountId: number,
  filename?: string,
  additionalPath?: string
): Promise<string> {
  const [fileType, data] = base64.replace("data:", "").replace("base64,", "").split(";");
  const timestamp = new Date().getTime().toString();
  const fileExtension = fileType.split("/")[1];
  filename = (filename ? filename : timestamp) + "." + fileExtension;
  additionalPath = additionalPath ? `/${additionalPath}` : "";
  const key = `${accountId}${additionalPath}/${filename}`.replace("//", "/");
  const buffer = Buffer.from(data, "base64");

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: fileType,
    ContentEncoding: "base64",
    ACL: "public-read",
    Body: buffer
  });

  await s3.send(command);

  return `${baseUrl}/${key}`;
}

export async function saveProfilePicture(base64: string, accountId: number): Promise<string> {
  await deleteFile(accountId + "/profile");
  const filename = `profile-${randomUUID()}`;
  return await savePictureBase64(base64, accountId, filename);
}

export async function saveDealImage(
  base64: string,
  filename: string,
  accountId: number,
  dealId: number
): Promise<string> {
  const additionalPath = `deals/${dealId}`;
  return await savePictureBase64(base64, accountId, filename, additionalPath);
}

export async function deletePicture(accountId: number, fileName: string) {
  const key = `${accountId}/${fileName}`;
  const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
  await s3.send(command);
}

export async function deleteFile(name: string) {
  const command = new ListObjectsCommand({ Bucket: bucket, Prefix: name });
  const response = await s3.send(command);

  for (const object of response.Contents || []) {
    const command = new DeleteObjectCommand({ Bucket: bucket, Key: object.Key });
    await s3.send(command);
  }
}

export async function getProfileImageURL(accountId: number, isDealer: boolean): Promise<string> {
  const prefix = `${accountId}/profile`;
  const command = new ListObjectsCommand({ Bucket: bucket, Prefix: prefix });
  const response = await s3.send(command);
  const profileImage = response.Contents?.at(0)?.Key;

  if (!profileImage) {
    return isDealer ? "/images/anonym-profile-dealer.png" : "/images/anonym-profile.png";
  }

  return `${baseUrl}/${profileImage}`;
}
