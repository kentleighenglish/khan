export type Modifier = string;

export interface ModifierObject {
  [key: string]: boolean | string | (() => boolean | string);
}

export type Modifiers = Modifier | Modifier[] | ModifierObject;
