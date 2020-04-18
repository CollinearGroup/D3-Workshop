export type Datum = {
    name: string
    count: number
}
export type Margin = {
    top: number
    right: number
    bottom: number
    left: number
}

export type BoundingRect = {
    width: number
    height: number
}

export type Props = {
    data: Datum[]
}
export interface State {
    margin?: Margin
    marginRadius?: number
}

export interface RedrawOnResizeState extends State {
    boundingRect: BoundingRect
    loaded: boolean
}
