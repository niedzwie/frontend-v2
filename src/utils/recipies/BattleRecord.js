import get from "@/utils/getters";

class BattleRecord {
    baseValue = 2000;

    constructor(offset, multiplier) {
        this.offset = offset;
        this.multiplier = multiplier;
    }

    getSanityValue() {
        const itemId = this.calculateItemId();
        const lowestSanityCurrent = Number(get.items.lowestStageSanityByItemId(itemId));

        if (itemId > this.baseValue + 1) {
            const craftingSanity = this.getCraftingSanity();
            return Math.min(lowestSanityCurrent, craftingSanity);
        } else {
            return lowestSanityCurrent;
        }

    }

    getCraftingSanity() {
        return itemsDb[this.calculateItemId() - 1].getSanityValue() * this.multiplier;
    }

    calculateItemId() {
        return this.baseValue + this.offset;
    }
}

const itemsDb = {
    2001: new BattleRecord(1),
    2002: new BattleRecord(2, 2),
    2003: new BattleRecord(3, 2.5),
    2004: new BattleRecord(4, 2),
}

export default {
    getSanityFor(itemId) {
        const itemRecipe = itemsDb[itemId];
        if (itemRecipe) {
            return itemRecipe.getSanityValue();
        } else {
            return null;
        }
    },
    getCraftingSanityFor(itemId) {
        const itemRecipe = itemsDb[itemId];
        if (itemRecipe) {
            return itemRecipe.getCraftingSanity();
        } else {
            return null;
        }
    }
}