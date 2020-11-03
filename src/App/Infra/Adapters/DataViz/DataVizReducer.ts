import { nsEntity } from "Core/Entity";
import { nsDataViz } from ".";
import { DataVizState } from "./DataVizStore";

const initiaState: DataVizState = { page: [], section: [], widget: [] };

/** A Améliorer afin de faire un vrai clone */
function clone(state: DataVizState): DataVizState {
  return {
    page: [...state.page],
    section: [...state.section],
    widget: [...state.widget],
  };
}

function getIndexOf(array: nsEntity.IEntity[], id?: nsEntity.Guid) {
  if (!id) return -1;
  return array.findIndex((i) => i.id === id);
}
export function DataVizReducer(
  state = initiaState,
  action:
    | nsDataViz.PageActions
    | nsDataViz.SectionActions
    | nsDataViz.WidgetActions
) {
  const _state = clone(state);

  switch (action.type) {
    case "queryAll":
      _state[action.target] = action.payload as any;
      break;

    case "querySingle":
      const index = getIndexOf(_state[action.target], action.payload.id);
      if (index >= 0) {
        _state[action.target][index] = action.payload;
      } else {
        _state[action.target].push(action.payload as any);
      }
      break;

    case "commandInsert":
      _state[action.target].push(action.payload as any);
      break;
    case "commandUpdate":
      {
        const index = getIndexOf(_state[action.target], action.payload.id);
        if (index >= 0) {
          _state[action.target][index] = action.payload;
        }
      }
      break;
    case "commandRemove":
      {
        const index = getIndexOf(_state[action.target], action.payload.id);
        if (index >= 0) {
          _state[action.target].splice(index, 1);
        }
      }
      break;
  }

  return _state;
}
