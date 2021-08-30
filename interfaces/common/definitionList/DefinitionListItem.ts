import { DefinitionTermKey } from '.'

export interface DefinitionListItem<
  T extends DefinitionTermKey = DefinitionTermKey
> {
  term: string | number
  key: keyof T
  el: React.ReactNode
}
