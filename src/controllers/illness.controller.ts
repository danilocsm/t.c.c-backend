import { IllnessCreateData } from "../repositories/illness.repository";
import { IllnessRepositoryImpl } from "../services/illness.service";

export class IllnessController {
  constructor(private illnessService: IllnessRepositoryImpl) {}

  async createIllness(newIllness: IllnessCreateData) {
    const illnessCreated = await this.illnessService.create(newIllness);
    return illnessCreated;
  }

  async getUniqueIllness(illnessId: string) {
    const illnessRecovered = await this.illnessService.getById(illnessId);
    return illnessRecovered;
  }

  async getAllIllnesses() {
    const allIllnesses = await this.illnessService.getAll();
    return allIllnesses;
  }

  async updateIllness(illnessId: string, newData: IllnessCreateData) {
    const updatedIllness = await this.illnessService.update(illnessId, newData);
    return updatedIllness;
  }

  async deleteIllness(illnessId: string) {
    await this.illnessService.delete(illnessId);
  }

  async addActivityToIllness(illnessId: string, activityId: string) {
      await this.illnessService.addActivity(illnessId, activityId);
  }
}
