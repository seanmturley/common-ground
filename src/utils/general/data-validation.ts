import { UUID } from "crypto";

export function isValidFormat(format: string) {
  const formats = ["historic_pauper", "historic_artisan"];

  return formats.includes(format);
}

export function isValidMatchType(match_type: string) {
  const matchTypes = ["Bo1", "Bo3"];

  return matchTypes.includes(match_type);
}

export function isValidUuid(uuid: UUID) {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return regex.test(uuid);
}
