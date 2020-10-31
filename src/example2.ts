import { log } from "fp-ts/lib/Console";
import { getMonoid, IO, io } from "fp-ts/lib/IO";
import { fold, Monoid, monoidSum } from "fp-ts/lib/Monoid";
import { randomInt } from "fp-ts/lib/Random";

type Die = IO<number>;

const monoidDie: Monoid<Die> = getMonoid(monoidSum);

/** returns the sum of the roll of the dice */
const roll: (dice: Array<Die>) => IO<number> = fold(monoidDie);

const D4: Die = randomInt(1, 4);
const D10: Die = randomInt(1, 10);
const D20: Die = randomInt(1, 20);

const dice = [D4, D10, D20];

io.chain(roll(dice), (result) => log(`Result is: ${result}`))();
