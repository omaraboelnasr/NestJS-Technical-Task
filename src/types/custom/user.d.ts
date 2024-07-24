export interface AppRequest extends Request {
  user?: UserDocument | null;
}
