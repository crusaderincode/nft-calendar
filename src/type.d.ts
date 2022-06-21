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