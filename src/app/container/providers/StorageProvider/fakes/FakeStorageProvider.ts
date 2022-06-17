import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private fakeStorage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.fakeStorage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.fakeStorage.findIndex(
      (storageFile) => storageFile === file
    );

    this.fakeStorage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
