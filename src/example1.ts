import { some, none, ap, Option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

type ShopItem = {
  price: Option<number>; //this type will either be a Some<number> or None
};

const getPrice = (item1: ShopItem, item2: ShopItem): Option<number> =>
  pipe(
    some((a: number) => (b: number) => a + b),
    ap(item1.price),
    ap(item2.price)
  );

console.log(getPrice({ price: some(2) }, { price: none }));
