//
//  ExternalService.swift
//  PenguinWidgetExtension
//
//  Created by Galvin Gao on 2020/12/27.
//

import Foundation
import Alamofire

struct StatsResponse: Decodable {
    let stats: [StatsResponseStat]
}

struct StatsResponseStat: Decodable {
    let stage: StatsResponseStatStage
    let item: StatsResponseStatItem
    let quantity: Int
    let times: Int
    let recentTimes: Int
}

struct StatsResponseStatStage: Decodable {
    let zoneId: String
    let stageId: String
    let code_i18n: [String: String]
}

struct StatsResponseStatItem: Decodable {
    let itemId: String
    let name_i18n: [String: String]
}

func getStats(for server: Servers, completion: @escaping (SiteStats?) -> ())  {
    AF.request("https://widget.penguin-stats.io/api/stats/" + server.string(), requestModifier: {
        $0.timeoutInterval = TimeInterval(25.0) // system give us 30s. make some room
    }).response {resp in
        guard let data = resp.data else {
            completion(nil)
            return
        }
        
        let stats: StatsResponse = try! JSONDecoder().decode(StatsResponse.self, from: data)
        
        var stages: [StageStats] = [];
        
        for stat in stats.stats {
            let item = ItemStats.init(id: stat.item.itemId,
                                      name: Localizer.localized(from: stat.item.name_i18n) ?? "unknown",
                                      times: stat.times, quantity: stat.quantity)
            
            let stage = StageStats.init(stageId: stat.stage.stageId,
                                        zoneId: stat.stage.zoneId,
                                        stageCode: Localizer.localized(from: stat.stage.code_i18n) ?? "unknown",
                                        items: [item],
                                        recentTimes: stat.recentTimes)
            stages.append(stage)
        }
        
        let siteStats = SiteStats.init(stages: stages, server: server)
        
        completion(siteStats)
    }
}
