interface IEvent {
    id: string
    listed?: boolean
    name?: string
    email?: string
    date?: Date
    website?: string
    twitter?: string
    discord?: string
    description?: string
    price?: number
    supply?: number
    currency?: string
}

type EventsState = {
    events: IEvent[]
}

type SelectorState = {
    event: { events: IEvent[] }
}

type EventsAction = {
    type: string
    payload: IEvent
}