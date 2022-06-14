interface Event {
    id: number
    title: string
}

type EventsState = {
    events: Event[]
}

type SelectorState = {
    event: { events: Event[] }
}

type EventsAction = {
    type: string
    payload: Event
}