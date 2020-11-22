import get from "@/utils/getters";

export default {
    initData() {
        get.items.all().forEach(item => {
            get.items.lowestSanityByItemId(item.itemId);
        });

        get.stages.all().forEach(stage => {
            get.stages.sanityValueById(stage.stageId);
        });
    }
}