import axios from "axios";
import Cookies from "js-cookie";
import { IShop,
    IShopCreatePayload,
    IShopUpdatePayload,
 } from "../../../Models/Shop";

export default async function handler(req, res) {
    if (req.me)
