export const salesTypeOptions = [
    "Somente Presencial",
    "Somente Delivery / Ecommerce",
    "Ambos"
].map(option => ({ value: option, label: option }));

export const correctDeliveryOptions = [
    "Sim, quero que cuide de TODAS as entregas",
    "Não, eu faço TODAS as entregas",
].map(option => ({ value: option, label: option }));

export const freightByDistance = [
    "Sim",
    "Não, tenho outra forma de definir os fretes",
].map(option => ({ value: option, label: option }));

export const distanceDelivery = [
    "A partir de 1km",
    "A partir de 5km",
    "A partir de 10km",
    "A partir de 15km",
    "A partir de 20km",
    "A partir de 50km",
    "A partir de 100km",
].map(option => ({ value: option, label: option }));