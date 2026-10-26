export function sumar (a, b){
    return a + b;
}

export function restar (a, b){
    return a - b;
}

export function promedio(a){
    let suma = 0;
    for (let i = 0; i < a.length; i++){
        suma += a[i];
    }
    return suma / a.length;
}