import { useSyncExternalStore } from "react";

export interface IConfirmDialogOptions {
  title: string;
  description?: string;
}

type TConfirmDialogResult = boolean;

interface IConfirmDialogState extends IConfirmDialogOptions {
  resolve: (result: TConfirmDialogResult) => void;
}

let dialogState: IConfirmDialogState | null = null;

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const setDialogState = (next: IConfirmDialogState | null) => {
  dialogState = next;
  listeners.forEach((listener) => listener());
};

const getSnapshot = () => dialogState;

export const showConfirmDialog = (
  options: IConfirmDialogOptions,
): Promise<TConfirmDialogResult> =>
  new Promise<TConfirmDialogResult>((resolve) => {
    setDialogState({ ...options, resolve });
  });

export const resolveConfirmDialog = (result: TConfirmDialogResult) => {
  const state = dialogState;

  setDialogState(null);

  if (state) {
    state.resolve(result);
  }
};

export const useConfirmDialog = (): IConfirmDialogState | null =>
  useSyncExternalStore(subscribe, getSnapshot);
