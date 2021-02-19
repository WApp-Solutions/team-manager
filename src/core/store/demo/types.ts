export const DemoKey = {
  ID: 'id',
  NAME: 'name',
} as const;

const DemoKeyOptional = {
  IS_LOADING: 'isLoading',
} as const;

export interface Demo {
  [DemoKey.ID]: string;
  [DemoKey.NAME]: string;
  [DemoKeyOptional.IS_LOADING]?: boolean;
}
