import { BubbleSort } from "../sortFunctions/BubbleSort";
// import { CocktailSort } from "../sortFunctions/CocktailSort";
import { HeapSort } from "../sortFunctions/HeapSort.js";
import { InsertionSort } from "../sortFunctions/InsertionSort";
import { MergeSort } from "../sortFunctions/MergeSort";
import { QuickSort } from "../sortFunctions/QuickSort";
import { SelectionSort } from "../sortFunctions/SelectionSort";
// import { ShellSort } from "../sortFunctions/ShellSort";
import { getScreenWidth } from "./helper";

// colors setting
export const comparisionColor = "lightblue";
export const swapColor = "yellow";
export const sortedColor = "springgreen";
export const pivotColor = "sandybrown";

// time setting
export let swapTime = 1000;
export let compareTime = 500;

// init array
export let sortingArray = initArrayForScreenSize();

export const sortingAlgorithms = [
  { component: BubbleSort, title: "Bubble", name: "BubbleSort" },
  { component: SelectionSort, title: "Selection", name: "SelectionSort" },
  { component: InsertionSort, title: "Insertion", name: "InsertionSort" },
  { component: HeapSort, title: "Heap", name: "HeapSort" },
  { component: MergeSort, title: "Merge", name: "MergeSort" },
  { component: QuickSort, title: "Quick", name: "QuickSort" },
  // { component: ShellSort, title: "Shell", name: "ShellSort" },
  // { component: CocktailSort, title: "Cocktail", name: "CocktailSort" },
];

function initArrayForScreenSize() {
  const screenSize = getScreenWidth();
  if (screenSize < 460) return [4, 3, 2, 1];
  else if (screenSize < 720) return [8, 7, 6, 5, 4, 3, 2, 1];
  return [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
}
