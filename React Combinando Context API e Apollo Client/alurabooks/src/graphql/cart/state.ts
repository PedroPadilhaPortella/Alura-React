import { makeVar } from "@apollo/client";
import { ICarrinho } from "../../interfaces/ICarrinho";

export const cartVar = makeVar<ICarrinho>({ itens: [], total: 0 });