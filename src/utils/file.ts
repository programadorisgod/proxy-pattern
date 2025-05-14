import { existsSync } from "node:fs";
import path from "node:path";

export class FileManager {
  public static fileExists(filename: string): boolean {
    const filePath = path.join(process.cwd(), "videos", filename);
    console.log(filePath, "FILE");

    const fileExists = existsSync(filePath);

    if (!fileExists) {
      return false;
    }

    return true;
  }
}
