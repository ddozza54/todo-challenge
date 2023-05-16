import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({ key: "todos", storage: localStorage });

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "ADD" = "ADD",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
  customCategory?: string;
}

export interface ICategory {
  category: string;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

const local = JSON.parse(localStorage.getItem("newCategories") as any);

export const customCategories = atom<ICategory[]>({
  key: "newCategory",
  default: local ? local : [],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category == category);
  },
});
