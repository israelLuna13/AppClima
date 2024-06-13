export const formatTemperature = (temperature: number): number => {
    const celsius = (temperature - 32) * (5 / 9);
    // Redondeamos el valor a un decimal usando toFixed y luego lo convertimos de nuevo a número
    return parseFloat(celsius.toFixed(1));
}