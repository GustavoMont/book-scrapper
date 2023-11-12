export const handlePrice = (price: number | null) => {
  return (
    price?.toLocaleString("pt-BR", {
      currency: "BRL",
      style: "currency",
    }) ?? "Não encontrado"
  );
};
