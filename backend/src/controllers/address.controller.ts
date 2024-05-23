import { Request, Response } from "express";
import AddressRepository from "../repositories/address.repository";

export default class AddressController {
    async getUserAddress(req: Request, res: Response) {
        const userId = req.body.authUser.userId
        const address = await AddressRepository.one(userId)
        res.status(200).send({ message: "Success12", address })
    }
    async getCities(req: Request, res: Response) {
        const id = undefined

        const fs = require('fs')
        const file = await fs.promises.readFile('./public/address.json', 'utf8', (err: any, data: any) => {
            if (err) return false
            return true
        });

        const fileJson = JSON.parse(file)

        const cities: any[] = [];

        fileJson.map((k: any) => {
            k.sub.map((l: any) => {
                cities.push(l.name)
            })
        })

        res.status(200).send({ message: "Success", cities })
    }
    async getDistrict(req: Request, res: Response) {
        const city = (req.params.city)

        const fs = require('fs')
        const file = await fs.promises.readFile('./public/address.json', 'utf8', (err: any, data: any) => {
            if (err) return false
            return true
        });

        const fileJson = JSON.parse(file)

        const districts: any[] = [];

        fileJson.map((k: any) => {
            k.sub.map((l: any) => {
                if (city === l.name) {
                    l.sub.map((t: any) => {
                        districts.push(t.name)
                    })
                }
            })
        })

        res.status(200).send({ message: "Success", districts })
    }
    async getTown(req: Request, res: Response) {
        const city = (req.params.city)
        const district = (req.params.district)

        const fs = require('fs')
        const file = await fs.promises.readFile('./public/address.json', 'utf8', (err: any, data: any) => {
            if (err) return false
            return true
        });

        const fileJson = JSON.parse(file)

        let towns: any[] = [];

        fileJson.map((k: any) => {
            k.sub.map((l: any) => {
                if (city === l.name) {
                    l.sub.map((t: any) => {
                        if (district === t.name) {
                            towns = t.sub
                        }
                    })
                }
            })
        })

        res.status(200).send({ message: "Success", district, towns })
    }
    async setUserAddress(req: Request, res: Response) {
        req.body.userId = req.body.authUser.userId
        req.body.confirm = true

        const insert = await AddressRepository.insert(req.body)

        res.status(200).send({ message: "Success", body: req.body })
    }
    async updateUserAddress(req: Request, res: Response) {
        req.body.userId = req.body.authUser.userId
        req.body.confirm = true

        const id = req.params.id

        const insert = await AddressRepository.update(req.body)

        res.status(200).send({ message: "Success", body: req.body })
    }
}