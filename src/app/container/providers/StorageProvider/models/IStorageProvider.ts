export default interface IStorageProvider {
  saveFile(file: string): Promise<string> | string;
  deleteFile(file: string): Promise<void> | void;
}
