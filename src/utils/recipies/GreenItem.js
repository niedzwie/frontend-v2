import get from "@/utils/getters";
import {
    deviceOffset,
    ketonOffset,
    orirockOffset,
    orironOffset,
    polyesterOffset,
    sugarOffset
} from "@/utils/recipies/ItemOffsets";

class GreenItem {
    itemOffset;

    constructor(itemOffset) {
        this.itemOffset = itemOffset;
    }

    getSanityValue() {
        const lowestFarmingSanity = Number(get.items.lowestStageSanityByItemId(30002 + this.itemOffset));
        const craftingSanity = Number(get.items.lowestStageSanityByItemId(30001 + this.itemOffset)) * 3;
        return Math.min(lowestFarmingSanity, craftingSanity);
    }
}

const itemsDb = {
    // Orirock Cube
    30012: new GreenItem(orirockOffset),
    // Sugar
    30022: new GreenItem(sugarOffset),
    // Polyester
    30032: new GreenItem(polyesterOffset),
    // Oriron
    30042: new GreenItem(orironOffset),
    // Polyketon
    30052: new GreenItem(ketonOffset),
    // Device
    30062: new GreenItem(deviceOffset),
}

export default {
    getSanityFor(itemId) {
        const itemRecipe = itemsDb[itemId];
        if (itemRecipe) {
            return itemRecipe.getSanityValue();
        } else {
            return null;
        }
    }
}