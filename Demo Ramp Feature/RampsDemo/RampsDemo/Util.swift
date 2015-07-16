//
//  Util.swift
//  RampsDemo
//
//  Created by Panindra Tumkur Seetharamu on 6/23/15.
//  Copyright (c) 2015 Panindra Tumkur Seetharamu. All rights reserved.
//

import Foundation
import RampManagerDemo

let fileName = "rampCache.json"

public class Util :NSObject {
    public static let sharedInstance = Util()
    var session: NSURLSession?

    func getDefaultSettings() {
        RampManager.sharedInstance.getDefaultRampSettings({ (result, error) -> Void in
            //println(result[0]["features"])
            NSNotificationCenter.defaultCenter().postNotificationName("Default settings", object: nil, userInfo: ["DefaultSettings": result[0]])
        })
    }

    func getUserSettings(customerNo: String, completionHandler: (result: JSON, error: NSError?) -> Void) {
        var paths = NSSearchPathForDirectoriesInDomains(.CachesDirectory, .UserDomainMask, true) as! [String]
        let filePath = (paths[0].stringByAppendingPathComponent(fileName))

        RampManager.sharedInstance.getRampSettings(customerNo, completionHandler: { (result, error) -> Void in
            var jsonResult = JSON(result!)
            
            NSKeyedArchiver.archiveRootObject(result!, toFile: filePath)
            completionHandler(result: jsonResult[0]["features"], error: nil)
        })
    }

    func isCacheFileExists() ->Bool {
        var paths = NSSearchPathForDirectoriesInDomains(.CachesDirectory, .UserDomainMask, true) as! [String]
        let filePath = (paths[0].stringByAppendingPathComponent(fileName))
        return NSFileManager.defaultManager().fileExistsAtPath(filePath)
    }

    func getCachedRampDataIfNotExpired() -> JSON? {
        var paths = NSSearchPathForDirectoriesInDomains(.CachesDirectory, .UserDomainMask, true) as! [String]
        let filePath = (paths[0].stringByAppendingPathComponent(fileName))

        //println(paths[0])
        var isExpired:Bool = true
        let rampDict: AnyObject? = NSKeyedUnarchiver.unarchiveObjectWithFile(filePath)
        let seconds = Int(NSDate().timeIntervalSince1970 * 1000);
        var data = JSON(rampDict!)[0]

        let exp_date =  data["features"]["Exp_date"].int

        if( ((exp_date! - seconds)) > 0.0) {
            isExpired = false
        }
        else {
            return nil
        }

        return data["features"]
    }

    func loadDefaultSettingsFromEmbeddedFile() -> JSON {
        let path = NSBundle.mainBundle().pathForResource("rampEmbed", ofType: "json")
        let jsonResult = JSON(NSKeyedUnarchiver.unarchiveObjectWithFile(path!)!)

        let features = jsonResult["features"]
        //println(features)

        return features
    }


    deinit {
        NSNotificationCenter.defaultCenter().removeObserver(self, name: "Default settings", object: nil)
    }
}