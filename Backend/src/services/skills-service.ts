import skillModel, { Skill } from '../models/skill-model';
import HttpError from '../errors/http-error';
import ServerErrorError from '../errors/server-error';

class SkillService {
  private skill = skillModel;

  public getAllSkills = async () => {
    try {
      return await this.skill.find();
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };

  public createSkill = async (skillBody: Skill) => {
    if (!skillBody.alt) skillBody.alt = `${skillBody.name} logo`;

    try {
      const isUnique = await this.checkUnique(skillBody.name);
      if (isUnique instanceof HttpError) return isUnique;

      const skill = await this.skill.create(skillBody);
      return skill;
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };

  public modifySkill = async (id: string, skillBody: Skill) => {
    try {
      const isUnique = await this.checkUnique(skillBody.name);
      if (isUnique instanceof HttpError) return isUnique;

      return await this.skill.findOneAndUpdate({ _id: id }, skillBody);
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };

  public deleteSkill(id: string) {
    try {
      return this.skill.findByIdAndDelete(id);
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  }

  private checkUnique = async (name: string) => {
    try {
      const unique = await this.skill.findOne({ name });
      if (unique) {
        //todo throw error
      }
    } catch (error) {
      return new ServerErrorError('Something went wrong');
    }
  };
}

export default SkillService;