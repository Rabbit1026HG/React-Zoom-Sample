import { atom, createStore } from "jotai";

const selectedPieces = atom([]);
const panstate = atom(false);
const store = createStore();
const selectedNum = atom(0);
const currentState = atom({
  scale: 1,
  x: 0,
  y: 0,
});
const initialTransform = atom({ x1: 0, y1: 0, x2: 0, y2: 0 });
export {
  selectedPieces,
  panstate,
  store,
  selectedNum,
  initialTransform,
  currentState,
};
