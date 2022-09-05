import errorFactory from "./error";

export default function notFound(entity: string) {
  return errorFactory("not_found", `Could not find ${entity}`);
}
