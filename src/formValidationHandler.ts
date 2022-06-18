

interface FormValidator {
    setErr: any,
    name: string,
    image: string,
    supply: string,
    price: string,
    twitter: string,
    discord: string,
    email: string,
    website: string,
    description: string,
}

const formValidationHandler = ({
                                setErr,
                                name,
                                supply,
                                price,
                                image,
                                twitter,
                                discord,
                                email,
                                website,
                                description }: FormValidator): void => {


    if (name.length < 1 || name.length > 32) {
        setErr((error: object) => ({
            ...error, name: true
        }))}

    if (Number(price) < 0) {
        setErr((error: object) => ({
            ...error, price: true
        }))}

    if (Number(supply) < 0) {
        setErr((error: object) => ({
            ...error, supply: true
        }))}

    if (description.length < 1 || description.length > 750) {
        setErr((error: object) => ({
            ...error, description: true
        }))}

    if (!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(website) && website.length > 0) {
        setErr((error: object) => ({
            ...error, website: true
        }))}

    if (!/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi.test(discord) && discord.length > 0) {
        setErr((error: object) => ({
            ...error, discord: true
        }))}

    if (!/^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i.test(twitter)) {
        setErr((error: object) => ({
            ...error, twitter: true
        }))}

    if (!/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(image)) {
        setErr((error: object) => ({
            ...error, image: true
        }))}

    if (!/\S+@\S+\.\S+/gi.test(email)) {
        setErr((error: object) => ({
            ...error, email: true
        }))}

    setErr((error: object) => ({
        ...error, checked: true
    }))

        }

export default formValidationHandler