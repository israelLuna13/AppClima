export const formatTemperature = (temperature:number) : number => {
    return parseInt ((temperature - 32).toString())*(5/9) 
}