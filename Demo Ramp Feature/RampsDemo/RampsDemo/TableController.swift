//
//  ViewController.swift
//  Ramping-Xcode6
//
//  Created by Panindra Tumkur Seetharamu on 6/16/15.
//  xCopyright (c) 2015 Panindra Tumkur Seetharamu. All rights reserved.
//

import UIKit


class TableController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    @IBOutlet weak var myTableView: UITableView!
    var featureEnabledArr : [String] = []
    var customerNo:String?

    override func viewDidLoad() {
        super.viewDidLoad()
        self.myTableView.contentInset = UIEdgeInsetsMake(20, 0, 0, 0);

        var isCacheFileExist = Util.sharedInstance.isCacheFileExists()
        var isExpired:Bool = true
        var result:JSON?

        if(isCacheFileExist) {
            result = Util.sharedInstance.getCachedRampDataIfNotExpired()
            if(result != nil) {
                isExpired = false
            }
        }
        else {
            result = Util.sharedInstance.loadDefaultSettingsFromEmbeddedFile()
        }

        if(isExpired) {
            Util.sharedInstance.getUserSettings(customerNo!, completionHandler: { (result, error) -> Void in         
                self.featureEnabledArr = []
                self.fillFeatureArray(result)

                dispatch_async(dispatch_get_main_queue()) {
                    self.myTableView.reloadData()
                };
            })
        }
        if(result != nil) {
            fillFeatureArray(result!)
            myTableView.reloadData()
        }
    }

    func fillFeatureArray(result: JSON) {
        for (key: String, subJson: JSON) in result {
            if result[key] == true {
                self.featureEnabledArr.append(key)
            }
        }
    }


    func filltableData(jsonResult : JSON) {
        for (key: String, subJson: JSON) in jsonResult {
            if jsonResult[key] == true {
                self.featureEnabledArr.append(key)
            }
        }

        dispatch_async(dispatch_get_main_queue()) {
            self.myTableView.reloadData()
        };

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("tableViewCell") as! UITableViewCell
        cell.textLabel?.text = self.featureEnabledArr[indexPath.row]
        return cell
    }

    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {

    }

    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.featureEnabledArr.count
    }
}

