import { UserRole } from 'src/models/user.model';
import { BotScenes } from '../constants';

const scenesMap = {
  [UserRole.admin]: BotScenes.admin,
  [UserRole.merchant]: BotScenes.merchant,
  [UserRole.trader]: BotScenes.trader,
  [UserRole.guest]: BotScenes.guest,
};

export const getSceneByUserRole = (role: UserRole): BotScenes =>
  scenesMap[role] || BotScenes.guest;
