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
    banner?: string
    verified?: number
}

interface ITicket {
    id: string
    email?: string
    ticket?: string
}

interface IPromo {
    id: string
    image?: string
    url?: string
}

interface INews {
    id: string
    image?: string
    url?: string
    header?: string
    text?: string
    date?: Date | string
}

type TicketState = {
    tickets: ITicket[]
}

type PromoState = {
    promos: IPromo[]
}

type NewsState = {
    news: INews[]
}

type TicketsAction = {
    type: string
    payload: ITicket
}

type PromosAction = {
    type: string
    payload: IPromo
}

type NewsAction = {
    type: string
    payload: INews
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

type SelectorPromoState = {
    promo: { promos: IPromo[]}
}

type SelectorNewsState = {
    new: { news: IPromo[]}
}

type EventsAction = {
    type: string
    payload: IEvent
}