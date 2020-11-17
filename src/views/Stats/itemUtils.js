import get from "@/utils/getters";

export default {
    getLowestSanityPerItem(itemId) {
        if(typeof this.getLowestSanityPerItem.cache === "undefined") {
            this.getLowestSanityPerItem.cache = {};
        }

        if(!this.getLowestSanityPerItem.cache[itemId]) {
            const item = get.statistics
                .byItemId(`${itemId}`);
            this.getLowestSanityPerItem.cache[itemId] = item
                .filter(el => el.stage.stageType !== "ACTIVITY")
                .map(stage => stage.apPPR)
                .filter(sanityPerItem => sanityPerItem !== "Infinity")
                .reduce((previousSanityPerItem, currentSanityPerItem) => {
                    if(previousSanityPerItem) {
                        if(Number(previousSanityPerItem) < Number(currentSanityPerItem)) {
                            return previousSanityPerItem;
                        } else {
                            return currentSanityPerItem;
                        }
                    } else {
                        return currentSanityPerItem;
                    }
                }, null);

        }

        return this.getLowestSanityPerItem.cache[itemId];
    }
}