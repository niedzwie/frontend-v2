import get from "@/utils/getters";

export default {
    getSanityValue(stageId) {

        if(typeof this.getSanityValue.cache === "undefined") {
            this.getSanityValue.cache = {};
        }

        if(!this.getSanityValue.cache[stageId]) {
            const stageStats = get.statistics.byStageId(stageId);
            const stageCost = get.stages.byStageId(stageId).apCost;
            const items = stageStats
                .filter(x => {
                    return x.item.itemType !== "ACTIVITY_ITEM" && x.item.itemType !== "FURN" && !["3003", "3112", "3113", "3114"].includes(x.item.itemId);
                })
                .map(x => {
                    const itemId = x.item.itemId;
                    return {
                        itemId,
                        sanityValue: get.items.lowestSanityByItemId(itemId)
                    }
                    // const lowestSanity = 0;//recipieDatabase.getSanityValue(x.item.itemId);
                    // return Number(lowestSanity) * x.item.percentage
                })
                .reduce((itemRegister, item) => {
                    itemRegister[item.itemId] = item;
                    return itemRegister;
                    // return agg + value;
                }, {});

            this.getSanityValue.cache[stageId] = (stageStats
                .map(item => {
                    const itemFromRegistry = items[item.itemId];
                    if (itemFromRegistry) {
                        const lowestSanity = itemFromRegistry.sanityValue;
                        return lowestSanity * item.percentage;
                    } else {
                        return 0;
                    }
                })
                .reduce((agg, value) => {
                    return agg + value;
                }, 0) / stageCost).toFixed(2);
        }

        return this.getSanityValue.cache[stageId];
    }
}