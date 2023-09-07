import path from 'path';

export default function getFilePath(filePath) {
  return path.join(process.cwd(), filePath);
}
