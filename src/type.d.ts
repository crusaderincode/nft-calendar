interface Event {
    id: number
    title: string
    name: string
    date: string
    website: string
    twitter: string
    discord: string
    description: string
    price: number
    currency: number
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