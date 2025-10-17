export enum CallbackType {
    DELETE = 'DELETE',
    ERROR = 'ERROR'
}
  
export type CallbackEvent<T = unknown> = {
    type: CallbackType;
    payload?: T;
    err?: unknown
};
  
export type CallbackHandler<T = unknown> = (event: CallbackEvent<T>) => void;
  