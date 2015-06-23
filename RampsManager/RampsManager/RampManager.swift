//
//  RampManager.swift
//  Ramping-Xcode6
//
//  Created by Panindra Tumkur Seetharamu on 6/16/15.
//  Copyright (c) 2015 Panindra Tumkur Seetharamu. All rights reserved.
//

import Foundation

public class RampManager  {
    public static let sharedInstance = RampManager()
    var session: NSURLSession?
    var rampOn = false

    public func getRampSettings(completionHandler: (result: AnyObject!, error: NSError?) -> Void) {
        session = NSURLSession.sharedSession()

        let urlString =  "http://127.0.0.1:3000/"
        let url = NSURL(string: urlString)!
        let request = NSURLRequest(URL: url)

        // 2. Make the request
        let task = session!.dataTaskWithRequest(request) {data, response, downloadError in
            if let error = downloadError {
                println("Download Error")
            } else {
                var parsingError: NSError? = nil
                let parsedResult: AnyObject? = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.AllowFragments, error: &parsingError)
                completionHandler(result: parsedResult, error: nil)
            }
        }

        // 3. Start the request
        //println("Before Exceution ")
        task.resume()
        //println("Excecuted before")
    }

    public func isRampOn() -> Bool {
        return rampOn
    }
}