export type EcommerceDefinitionsTypes = {
    title: string
    phoneNumber: string
    salesType: string
    correctDelivery: string
    freightByDistance: string
    additionalDistances: additionalDistances[]

}

export const ecommerceDefinitionsDefaultValues: EcommerceDefinitionsTypes = {
    title: '',
    phoneNumber: '',
    salesType: '',
    correctDelivery: '',
    freightByDistance: '',
    additionalDistances: [{
        distance: '',
        value: ''
    }]
}


export type additionalDistances = {
    distance: string
    value: string
}