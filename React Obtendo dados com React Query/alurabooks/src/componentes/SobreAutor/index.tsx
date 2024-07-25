import { useQuery } from "@tanstack/react-query"
import { getAuthor } from "../../http"
import BlocoSobre from "../BlocoSobre"

interface SobreAutorProps {
  autorId: number
}

const SobreAutor = ({ autorId }: SobreAutorProps) => {

  const { data: autor } = useQuery({
    queryKey: ['author', autorId],
    queryFn: () => getAuthor(autorId)
  });

  return (
    <BlocoSobre titulo="Sobre o Autor" corpo={autor?.sobre} />
  );
}

export default SobreAutor;