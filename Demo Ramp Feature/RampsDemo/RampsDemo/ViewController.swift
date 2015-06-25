//
//  ViewController.swift
//  RampsDemo
//
//  Created by Panindra Tumkur Seetharamu on 6/23/15.
//  Copyright (c) 2015 Panindra Tumkur Seetharamu. All rights reserved.
//

import UIKit
import RampManagerDemo

class ViewController: UIViewController {

    @IBOutlet weak var usernameTxtfield: UITextField!
    @IBOutlet weak var passwordTxtfield: UITextField!
    @IBOutlet weak var defaultFeaturesTxtView: UITextView!

    @IBOutlet weak var loginBtn: UIButton!


    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "fillDefaultFeaturesTxtView:", name: "Default settings", object: nil)
        self.defaultFeaturesTxtView.text = self.defaultFeaturesTxtView.text + "\n"
        Util.sharedInstance.getDefaultSettings()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func onLogin(sender: AnyObject) {
        //println(passwordTxtfield.text);
        RampManager.sharedInstance.login(usernameTxtfield.text, password : passwordTxtfield.text, completionHandler: { (result, error) -> Void in
            let customerNo = JSON(result)["customerNo"]

            dispatch_async(dispatch_get_main_queue()) {
                var tableViewController:TableController = self.storyboard?.instantiateViewControllerWithIdentifier("tableView") as! TableController
                tableViewController.customerNo = customerNo.string!

                self.presentViewController(tableViewController, animated: true, completion: nil)
            };
        })

    }

    func fillDefaultFeaturesTxtView(notification: NSNotification) {
        var userInfo = notification.userInfo!
        var parsingError: NSError? = nil     
        var data: AnyObject? = userInfo
        data = data?.valueForKey("DefaultSettings")

        let path = NSBundle.mainBundle().pathForResource("rampEmbed", ofType: "json")
         NSKeyedArchiver.archiveRootObject(data!, toFile: path!)

        var settings = JSON(data!.valueForKey("features")!)

        
        for (key: String, subJson: JSON) in settings {
                dispatch_async(dispatch_get_main_queue()) {
                    self.defaultFeaturesTxtView.text = self.defaultFeaturesTxtView.text + "\n" + key + " : " + String(stringInterpolationSegment: settings[key])
                };

        }
    }
}

