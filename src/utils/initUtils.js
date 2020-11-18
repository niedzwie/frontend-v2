import get from "@/utils/getters";
import itemUtils from "@/views/Stats/itemUtils";
import stageUtils from "@/views/Stats/stageUtils";

export default {
    initData() {
        get.items.all().forEach(item => {
            itemUtils.getLowestSanityPerItem(item.itemId);
        });

        get.stages.all().forEach(stage => {
            stageUtils.getSanityValue(stage.stageId);
        });
    }
}