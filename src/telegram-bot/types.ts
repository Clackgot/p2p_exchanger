import { Context, SessionFlavor } from 'grammy';
import { ScenesSessionData, ScenesFlavor } from 'grammy-scenes';

export type SessionData = ScenesSessionData & {
  // Your own global session interface, could be empty as well.
};

export type BotContext = Context & SessionFlavor<SessionData> & ScenesFlavor;
