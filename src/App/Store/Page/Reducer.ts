import { IPageEntity } from "Core/Entity";
import { PageAction } from ".";

export const Reducer = (
  prevState: IPageEntity[] | undefined,
  action: PageAction
) => {
  const result: IPageEntity[] = [...(prevState || [])];
  const index = result.findIndex((item) => item.id === action.payload.id);

  switch (action.type) {
    case "ADD":
      result.push(action.payload);
      break;

    case "REMOVE":
      if (index < 0) return prevState;
      result.splice(index, 1);
      break;

    case "UPSERT":
      result[index] = action.payload;
      break;

    default:
      break;
  }

  return result;
};
