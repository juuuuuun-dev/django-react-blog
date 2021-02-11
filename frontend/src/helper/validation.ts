import { ValidationMatch } from '../types/validation';

export const validateSlug: ValidationMatch = {
  pattern: "^[a-z0-9_-]*$",
  message: "The slug must contain only lowercase letters, numbers, and hyphens/underscores.",
}