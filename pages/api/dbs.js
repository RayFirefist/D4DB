// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import httpCodes from '../../utils/api/statusCode';

const consts = require('../../consts.json')

export default async(req, res) => {

    if (req.method !== "POST") {

        res.statusCode = httpCodes.HTTP_METHOD_NOT_ALLOWED
        res.json({
            error: "Invalid method. Allowed to use only POST",
            status: httpCodes.HTTP_METHOD_NOT_ALLOWED
        })

    } else {

        let out = {}

        // list of dbs not defined
        if (req.body.dbs === undefined) {
            out = {
                error: "Missing parameter: 'dbs'",
                status: httpCodes.HTTP_BAD_REQUEST
            }
            res.statusCode = httpCodes.HTTP_BAD_REQUEST
        }
        // parameter is not a list as expected 
        else if (typeof req.body.dbs !== 'object' || req.body.dbs.forEach === undefined) {
            out = {
                error: "'dbs' parameter must be an array",
                status: httpCodes.HTTP_BAD_REQUEST
            }
            res.statusCode = httpCodes.HTTP_BAD_REQUEST
        }
        // list is empty
        else if (req.body.dbs.length === 0) {
            out = {
                error: "'dbs' parameter is empty",
                status: httpCodes.HTTP_BAD_REQUEST
            }
            res.statusCode = httpCodes.HTTP_BAD_REQUEST
        }
        // everything looks ok
        else {

            out = {
                result: {},
                errors: [],
                status: httpCodes.HTTP_OK
            }

            try {
                // downloading all requested databases
                for (let db in req.body.dbs) {
                    db = req.body.dbs[db]
                    let response = await fetch(consts.cdn + "Master/" + db + ".json")

                    // db not found or unreachable
                    if (response.status !== 200)
                        out.errors.push(db + " database is not found")

                    // db found?
                    else {
                        let respJson = await response.json()
                        out.result[db] = respJson
                    }

                }

                res.statusCode = httpCodes.HTTP_OK
            } catch (error) {
                // exception found
                console.error(error);
                res.statusCode = httpCodes.HTTP_INTERNAL_ERROR
                out = {
                    error: "Internal error",
                    status: httpCodes.HTTP_INTERNAL_ERROR
                }

                // show exception code if debug mode is on
                if (consts.debug_api)
                    out['debug'] = error.message
            }
        }

        res.json(out)
    }

}