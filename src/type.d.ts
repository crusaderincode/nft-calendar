interface IEvent {
    id: string
    listed?: boolean
    name?: string
    email?: string
    date?: Date | string
    website?: string
    twitter?: string
    twitterMembers?: number
    discordMembers?: number
    promo?: number
    txPromo?: string
    image?: string
    currencyPromo?: string
    discord?: string
    description?: string
    price?: number
    supply?: number
    currency?: string
}

interface ITicket {
    id: string
    email?: string
    ticket?: string
}

type TicketState = {
    tickets: ITicket[]
}

type TicketsAction = {
    type: string
    payload: ITicket
}

type EventsState = {
    events: IEvent[]
    unlisted: IEvent[]
     past: IEvent[]
}

type SelectorState = {
    event: { events: IEvent[], unlisted: IEvent[], past: IEvent[] }
}

type SelectorTicketsState = {
    contact: { tickets: ITicket[] }
}

type EventsAction = {
    type: string
    payload: IEvent
}