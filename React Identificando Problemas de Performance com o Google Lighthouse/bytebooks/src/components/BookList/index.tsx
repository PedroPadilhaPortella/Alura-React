import { Book } from "../../store/reducers/books";
import BookItem from "../BookItem";

const BookList = ({ items }: { items: Book[] }) => {
  return (
    <>
      {items.map((item) => (
        <BookItem key={item.id} book={item} />
      ))}
    </>
  );
}


export default BookList;