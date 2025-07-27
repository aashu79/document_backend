import * as resignationLetter from "./resignation-letter";

export const documentTemplateModules = {
  "resignation-letter": resignationLetter,
};

export type DocumentModule = typeof resignationLetter;
