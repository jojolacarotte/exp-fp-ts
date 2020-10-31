import { some, none, ap, Option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { log } from "fp-ts/lib/Console";
import { getMonoid, IO, io } from "fp-ts/lib/IO";
import { fold, Monoid, monoidSum } from "fp-ts/lib/Monoid";
import { randomInt } from "fp-ts/lib/Random";

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

type Die = IO<number>;

const monoidDie: Monoid<Die> = getMonoid(monoidSum);

/** returns the sum of the roll of the dice */
const roll: (dice: Array<Die>) => IO<number> = fold(monoidDie);

const D4: Die = randomInt(1, 4);
const D10: Die = randomInt(1, 10);
const D20: Die = randomInt(1, 20);

const dice = [D4, D10, D20];

io.chain(roll(dice), (result) => log(`Result is: ${result}`))();
