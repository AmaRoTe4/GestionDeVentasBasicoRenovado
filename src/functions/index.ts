export const fechaActual = ():string => {
  let fechaActual = new Date();

  let dia = fechaActual.getDate();
  let mes = fechaActual.getMonth() + 1;
  let año = fechaActual.getFullYear();
  let horas = fechaActual.getHours();
  let minutos = fechaActual.getMinutes();

  return (
    dia.toString().padStart(2, "0") +
    "/" +
    mes.toString().padStart(2, "0") +
    "/" +
    año +
    " " +
    horas.toString().padStart(2, "0") +
    ":" +
    minutos.toString().padStart(2, "0")
  );
};
